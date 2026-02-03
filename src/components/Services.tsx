import { Home, Hammer, TreePine, DoorOpen, ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Krovy a dřevěné konstrukce",
    description:
      "Návrh a realizace tradičních i moderních krovových konstrukcí. Používáme kvalitní materiály a osvědčené technologie.",
  },
  {
    icon: TreePine,
    title: "Pergoly a přístřešky",
    description:
      "Elegantní dřevěné pergoly, altány a přístřešky, které zkrášlí vaši zahradu a poskytnou stín.",
  },
  {
    icon: DoorOpen,
    title: "Dřevěné balkony",
    description:
      "Kvalitní dřevěné balkony a balkónové konstrukce. Funkční a estetické řešení pro váš domov s důrazem na dlouhou životnost.",
  },
  {
    icon: ClipboardCheck,
    title: "Tesařská konzultace",
    description:
      "Odborná konzultace a prohlídka stávajícího krovu. Zhodnocení stavu, návrh řešení a odhad nákladů na opravu.",
    link: "/tesarska-konzultace",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="sluzby" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Naše služby
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ke každému projektu přistupujeme individuálně. Ať už hledáte rychlé 
            a efektivní řešení nebo tradiční pohledovou konstrukci s důrazem na detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-card p-6 md:p-8 rounded-lg border border-border card-hover ${
                service.link ? "cursor-pointer" : ""
              }`}
              onClick={() => service.link && navigate(service.link)}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              {service.link && (
                <div className="mt-4 flex items-center text-primary font-medium">
                  Více informací
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="group"
            onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
          >
            Poptat služby
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
