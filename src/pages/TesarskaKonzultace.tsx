import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Search, Droplets, FileText, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";

const consultationTypes = [
  {
    icon: Search,
    title: "Prohlídka a zhodnocení krovu",
    description: "Vizuální prohlídka stávající konstrukce, zjištění stavu trámů a návrh případné opravy z pohledu tesaře.",
  },
  {
    icon: FileText,
    title: "Zápis z prohlídky",
    description: "Písemný zápis z prohlídky s popisem zjištěného stavu, fotodokumentací a doporučením dalšího postupu.",
  },
  {
    icon: Ruler,
    title: "Cenová nabídka na opravu",
    description: "Na základě prohlídky připravíme orientační cenovou nabídku na tesařské práce potřebné k opravě.",
  },
];

const diagnostikaFeatures = [
  {
    icon: Search,
    title: "Vizuální prohlídka",
    description: "Odhalení viditelných vad – shnilé trámy, praskliny, deformace, napadení dřevokazným hmyzem.",
  },
  {
    icon: Droplets,
    title: "Měření vlhkosti dřeva",
    description: "Pomocí vlhkoměru zjistíme aktuální stav vlhkosti a riziko dalšího poškození.",
  },
  {
    icon: Ruler,
    title: "Návrh rozsahu opravy",
    description: "Určíme, které prvky je třeba vyměnit nebo opravit, a navrhneme postup realizace.",
  },
  {
    icon: FileText,
    title: "Zaměření skutečného stavu",
    description: "Pokud k domu chybí plány, zaměříme rozměry konstrukce pro účely plánované opravy.",
  },
];

const benefits = [
  "Pohled zkušeného tesaře na váš krov",
  "Zjištění skutečného stavu před rekonstrukcí",
  "Orientační odhad nákladů na opravu",
  "Písemný zápis z prohlídky s fotodokumentací",
  "Srozumitelné vysvětlení bez zbytečného žargonu",
];

const TesarskaKonzultace = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate("/#kontakt");
    setTimeout(() => {
      const element = document.querySelector("#kontakt");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-secondary to-background">
          <div className="container-custom px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                Tesařská konzultace
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Potřebujete zhodnotit stav krovu před rekonstrukcí? Jako tesaři vám můžeme 
                poskytnout řemeslný pohled na vaši střešní konstrukci a navrhnout opravu.
              </p>
              <Button size="xl" className="group" onClick={scrollToContact}>
                Domluvit konzultaci
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* What we offer */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Co vám jako tesaři můžeme nabídnout?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                V rámci tesařské živnosti provádíme prohlídky krovů pro účely opravy nebo plánované rekonstrukce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {consultationTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-card p-6 md:p-8 rounded-lg border border-border"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <type.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diagnostika krovů - detailed section */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  Jak prohlídka probíhá?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Přijedeme na stavbu, prohlédneme krov a zjistíme, které trámy jsou poškozené, 
                  shnilé nebo napadené tesaříkem. Na základě prohlídky navrhneme rozsah opravy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {diagnostikaFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-lg border border-border flex gap-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-secondary rounded-xl p-8">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                  Co získáte?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Po prohlídce obdržíte <strong>zápis z prohlídky</strong> s popisem zjištěného stavu, 
                  fotodokumentací a návrhem rozsahu opravy včetně orientační cenové nabídky na tesařské práce.
                </p>
                <div className="bg-card rounded-lg p-6 border border-border">
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Důležité:</strong> Jedná se o řemeslné zhodnocení v rámci tesařské živnosti – 
                    odborný názor tesaře na stav konstrukce. Pro účely stavebního řízení nebo bankovních 
                    institucí může být vyžadován statický posudek od autorizovaného inženýra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-secondary">
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                  Proč využít naše konzultace?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Ne každý potřebuje kompletní realizaci. Někdy stačí odborná rada, 
                  která vám ušetří čas, peníze a starosti. Naše zkušenosti z desítek 
                  projektů jsou k dispozici i vám.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-xl p-8 border border-border">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                  Jak to funguje?
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Kontaktujte nás</h4>
                      <p className="text-muted-foreground text-sm">Popište nám váš projekt nebo dotaz.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Domluvíme termín</h4>
                      <p className="text-muted-foreground text-sm">Osobně, telefonicky nebo online – jak vám vyhovuje.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Získáte odpovědi</h4>
                      <p className="text-muted-foreground text-sm">Odborné rady a doporučení pro váš projekt.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container-custom px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
                Máte dotaz k vašemu projektu?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Neváhejte se na nás obrátit. Rádi vám poradíme a pomůžeme 
                najít nejlepší řešení pro váš projekt.
              </p>
              <Button 
                variant="heroOutline" 
                size="xl" 
                className="group"
                onClick={scrollToContact}
              >
                Domluvit konzultaci
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TesarskaKonzultace;
