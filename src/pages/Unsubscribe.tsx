import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
    fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          setState("invalid");
          return;
        }
        if (data.already_unsubscribed) {
          setEmail(data.email || "");
          setState("already");
        } else if (data.valid) {
          setEmail(data.email || "");
          setState("valid");
        } else {
          setState("invalid");
        }
      })
      .catch(() => setState("invalid"));
  }, [token]);

  const confirm = async () => {
    setSubmitting(true);
    const { error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setSubmitting(false);
    if (error) setState("error");
    else setState("success");
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 text-center">
        {state === "loading" && (
          <>
            <Loader2 className="w-10 h-10 mx-auto mb-4 text-muted-foreground animate-spin" />
            <p className="text-muted-foreground">Ověřuji odkaz…</p>
          </>
        )}

        {state === "valid" && (
          <>
            <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">
              Odhlásit z odběru
            </h1>
            <p className="text-muted-foreground mb-6">
              Opravdu chcete odhlásit adresu <strong>{email}</strong> ze zasílání e‑mailů z krovykv.cz?
            </p>
            <Button onClick={confirm} disabled={submitting}>
              {submitting ? "Odhlašuji…" : "Potvrdit odhlášení"}
            </Button>
          </>
        )}

        {state === "already" && (
          <>
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Již odhlášeno
            </h1>
            <p className="text-muted-foreground">
              Adresa {email && <strong>{email}</strong>} je již odhlášena z odběru.
            </p>
          </>
        )}

        {state === "success" && (
          <>
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Odhlášení proběhlo
            </h1>
            <p className="text-muted-foreground">
              Adresa byla úspěšně odhlášena. Už vám nebudeme nic posílat.
            </p>
          </>
        )}

        {(state === "invalid" || state === "error") && (
          <>
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Odkaz je neplatný
            </h1>
            <p className="text-muted-foreground mb-6">
              Odkaz pro odhlášení vypršel nebo je poškozený. Kontaktujte nás prosím přímo.
            </p>
          </>
        )}

        <div className="mt-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary underline">
            ← Zpět na krovykv.cz
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Unsubscribe;
