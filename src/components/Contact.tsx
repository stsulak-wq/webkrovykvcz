import { useState, useRef } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, Upload, X, FileText, Image, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Jméno musí mít alespoň 2 znaky." })
    .max(100, { message: "Jméno může mít maximálně 100 znaků." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "E-mail je povinný." })
    .email({ message: "Zadejte platnou e-mailovou adresu (např. jan@email.cz)." })
    .max(255, { message: "E-mail může mít maximálně 255 znaků." }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Telefon může mít maximálně 30 znaků." })
    .refine(
      (val) => val === "" || /^[+\d\s()-]{9,}$/.test(val),
      { message: "Zadejte platné telefonní číslo (min. 9 číslic)." }
    ),
  message: z
    .string()
    .trim()
    .min(10, { message: "Zpráva musí mít alespoň 10 znaků." })
    .max(2000, { message: "Zpráva může mít maximálně 2000 znaků." }),
});

type FormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => {
        const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
        if (!isValidType) {
          toast.error(`Soubor "${file.name}" není podporovaný. Povolené formáty: obrázky, PDF.`);
        }
        if (!isValidSize) {
          toast.error(`Soubor "${file.name}" je příliš velký. Max. velikost: 10 MB.`);
        }
        return isValidType && isValidSize;
      });
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error when user starts editing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldSchema = contactSchema.shape[name as keyof typeof contactSchema.shape];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({ ...prev, [name]: result.error.issues[0].message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Zkontrolujte prosím vyplněné údaje.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Step 1: Save to database FIRST so nothing is lost even if FormSubmit fails
    let submissionId: string | null = null;
    try {
      const { data: inserted, error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || null,
          message: result.data.message,
          files_count: files.length,
          files_info: files.length > 0 ? files.map((f) => ({ name: f.name, size: f.size, type: f.type })) : null,
          delivery_status: "pending",
          user_agent: navigator.userAgent.slice(0, 500),
        })
        .select("id")
        .single();
      if (dbError) console.error("DB insert error:", dbError);
      else submissionId = inserted?.id ?? null;
    } catch (err) {
      console.error("DB insert exception:", err);
    }

    // Step 2: Enqueue notification e-mail to owner + confirmation to sender
    const filesInfo = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
    const submittedAt = new Date().toLocaleString("cs-CZ");
    try {
      const notifyPromise = supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: submissionId ? `contact-notify-${submissionId}` : undefined,
          templateData: {
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone || "",
            message: result.data.message,
            filesCount: files.length,
            filesInfo,
            submittedAt,
          },
        },
      });

      const confirmPromise = supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: result.data.email,
          idempotencyKey: submissionId ? `contact-confirm-${submissionId}` : undefined,
          templateData: {
            name: result.data.name,
            message: result.data.message,
          },
        },
      });

      const [notifyRes, confirmRes] = await Promise.all([notifyPromise, confirmPromise]);
      if (notifyRes.error) throw notifyRes.error;
      if (confirmRes.error) console.warn("Confirmation email error:", confirmRes.error);

      if (submissionId) {
        await supabase
          .from("contact_submissions")
          .update({ delivery_status: "queued" })
          .eq("id", submissionId);
      }

      toast.success("Zpráva byla odeslána! Brzy se vám ozveme.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFiles([]);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error, "Submission ID:", submissionId);
      if (submissionId) {
        await supabase
          .from("contact_submissions")
          .update({
            delivery_status: "failed",
            delivery_error: error instanceof Error ? error.message : String(error),
          })
          .eq("id", submissionId);
        toast.error("Zprávu jsme uložili, ale e-mail se nepodařilo odeslat. Ozveme se vám co nejdřív.");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFiles([]);
        setIsSubmitted(true);
      } else {
        toast.error("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Kontaktujte nás
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Máte dotaz nebo zájem o naše služby? Neváhejte nás kontaktovat.
            Rádi vám připravíme nezávaznou nabídku.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Telefon
                </h3>
                <a
                  href="tel:+420725716937"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +420 725 716 937
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  E-mail
                </h3>
                <a
                  href="mailto:info@krovykv.cz"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@krovykv.cz
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Adresa
                </h3>
                <p className="text-muted-foreground">
                  Hornická 26
                  <br />
                  360 01, Karlovy Vary
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2547.8!2d12.8697!3d50.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a07f9!2sHornick%C3%A1%2026%2C%20360%2001%20Karlovy%20Vary!5e0!3m2!1scs!2scz!4v1707000000000!5m2!1scs!2scz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - Hornická 26, Karlovy Vary"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6 md:p-8 rounded-lg border border-border">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
              Pošlete nám zprávu
            </h3>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-serif font-semibold text-foreground mb-3">
                  Děkujeme za vaši zprávu!
                </h4>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Zpráva byla úspěšně odeslána na <strong>info@krovykv.cz</strong>. Ozveme se vám co nejdříve, obvykle do 24 hodin.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Odeslat další zprávu
                </Button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Jméno a příjmení *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Jan Novák"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  E-mail *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="jan@email.cz"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Telefon
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+420 123 456 789"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`w-full ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Zpráva *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Popište váš projekt nebo dotaz..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : "message-hint"}
                  className={`w-full resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.message ? (
                  <p id="message-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                ) : (
                  <p id="message-hint" className="mt-1.5 text-xs text-muted-foreground">
                    {formData.message.trim().length}/2000 znaků (min. 10)
                  </p>
                )}
              </div>


              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Přílohy (stavební dokumentace, foto)
                </label>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Klikněte pro nahrání souborů
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Podporované formáty: obrázky, PDF (max. 10 MB na soubor)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                      >
                        {file.type.startsWith('image/') ? (
                          <Image className="w-5 h-5 text-primary" />
                        ) : (
                          <FileText className="w-5 h-5 text-primary" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Odesílám..."
                ) : (
                  <>
                    Odeslat zprávu
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
