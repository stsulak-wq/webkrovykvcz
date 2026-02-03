import { Home, Hammer, TreePine, DoorOpen } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Krovy a střešní konstrukce",
    description:
      "Návrh a realizace tradičních i moderních krovových konstrukcí. Používáme kvalitní materiály a osvědčené technologie.",
  },
  {
    icon: Hammer,
    title: "Tesařské práce",
    description:
      "Kompletní tesařské služby od návrhu po realizaci. Dřevěné konstrukce na míru podle vašich požadavků.",
  },
  {
    icon: TreePine,
    title: "Pergoly a přístřešky",
    description:
      "Elegantní dřevěné pergoly, altány a přístřešky, které zkrášlí vaši zahradu a poskytnou stín.",
  },
  {
    icon: DoorOpen,
    title: "Dřevěné lodžie",
    description:
      "Kvalitní dřevěné lodžie a balkónové konstrukce. Funkční a estetické řešení pro váš domov s důrazem na dlouhou životnost.",
  },
];

const Services = () => {
  return (
    <section id="sluzby" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Naše služby
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nabízíme širokou škálu tesařských a stavebních prací s důrazem na kvalitu a spokojenost zákazníka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-6 md:p-8 rounded-lg border border-border card-hover"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
