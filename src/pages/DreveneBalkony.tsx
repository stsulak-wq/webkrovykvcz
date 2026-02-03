import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalkonyGallery from "@/components/BalkonyGallery";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Ruler, Hammer, Paintbrush, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "1. Konzultace a zaměření",
    description: "Navštívíme vás, proměříme prostor a probereme vaše představy. Zhodnotíme technické možnosti a navrhneme optimální řešení.",
  },
  {
    icon: Ruler,
    title: "2. Návrh a projektová dokumentace",
    description: "Připravíme detailní návrh včetně technické dokumentace. Zohledníme statiku budovy, orientaci ke světovým stranám i vaše estetické preference.",
  },
  {
    icon: Hammer,
    title: "3. Výroba a montáž",
    description: "V naší dílně vyrobíme všechny komponenty přesně na míru. Montáž provádíme šetrně s minimálním zásahem do vašeho bydlení.",
  },
  {
    icon: Paintbrush,
    title: "4. Povrchová úprava a dokončení",
    description: "Aplikujeme kvalitní lazury a nátěry pro dlouhou životnost. Předáme vám hotový balkón připravený k okamžitému užívání.",
  },
];

const benefits = [
  "Přírodní materiál s výbornou tepelnou izolací",
  "Estetický vzhled a útulná atmosféra",
  "Dlouhá životnost při správné údržbě",
  "Ekologické a udržitelné řešení",
  "Možnost individuálního designu na míru",
  "Zvýšení hodnoty nemovitosti",
];

const DreveneBalkony = () => {
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
                Dřevěné balkony
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Kvalitní dřevěné balkony a balkónové konstrukce na míru. 
                Spojujeme tradiční tesařské řemeslo s moderními požadavky na bydlení.
              </p>
              <Button size="xl" className="group" onClick={scrollToContact}>
                Nezávazná poptávka
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* What is Balkon */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                  Co je dřevěný balkón?
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Dřevěný balkón je venkovní konstrukce vyčnívající z fasády budovy, 
                  která rozšiřuje obytný prostor o příjemné místo na čerstvém vzduchu. 
                  Dřevo jako materiál dodává balkónu přirozenou krásu a teplo.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Dřevěné balkony kombinují přírodní estetiku s funkčností moderního bydlení. 
                  Vytváří útulný venkovní prostor pro relaxaci, snídani nebo posezení s rodinou.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nabízíme kompletní servis od návrhu přes výrobu až po montáž. 
                  Každý náš balkón je vyroben přesně na míru vašemu domu a vašim potřebám.
                </p>
              </div>
              <div className="bg-secondary rounded-xl p-8">
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Výhody dřevěných balkónů
                </h3>
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
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <BalkonyGallery />

        {/* Process Section */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Jak probíhá realizace?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Od prvního kontaktu po předání hotového balkónu vás provedeme celým procesem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-card p-6 md:p-8 rounded-lg border border-border"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-center">
                Materiály a zpracování
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Smrkové dřevo</h3>
                  <p className="text-muted-foreground text-sm">
                    Nejpoužívanější materiál s výborným poměrem ceny a kvality. 
                    Snadno se opracovává a přijímá povrchové úpravy.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Modřínové dřevo</h3>
                  <p className="text-muted-foreground text-sm">
                    Prémiová varianta s přirozenou odolností proti povětrnostním vlivům. 
                    Krásná přirozená barva a vysoká trvanlivost.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Dubové dřevo</h3>
                  <p className="text-muted-foreground text-sm">
                    Exkluzivní volba pro náročné zákazníky. 
                    Výjimečná tvrdost, trvanlivost a estetická hodnota.
                  </p>
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
                Máte zájem o dřevěný balkón?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Kontaktujte nás pro nezávaznou konzultaci. Rádi vás navštívíme, 
                proměříme prostor a připravíme návrh přesně na míru vašim potřebám.
              </p>
              <Button 
                variant="heroOutline" 
                size="xl" 
                className="group"
                onClick={scrollToContact}
              >
                Kontaktovat nás
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

export default DreveneBalkony;
