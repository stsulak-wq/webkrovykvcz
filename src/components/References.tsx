import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import refPergola from "@/assets/ref-pergola.jpg";
import refKrov from "@/assets/ref-krov.jpg";
import refPristresek from "@/assets/ref-pristresek.jpg";

const projects = [
  {
    image: refKrov,
    title: "Krov bytového domu Otovice",
    location: "Karlovy Vary",
    description: "Kompletní realizace krovu pro celý objekt.",
    isGallery: true,
  },
  {
    image: refPergola,
    title: "Zahradní pergola",
    location: "Mariánské Lázně",
    description: "Elegantní dřevěná pergola s posezením pro celou rodinu.",
  },
  {
    image: refPristresek,
    title: "Přístřešek pro auto",
    location: "Sokolov",
    description: "Moderní dřevěný přístřešek s kvalitní povrchovou úpravou.",
  },
];

const References = () => {
  return (
    <section id="reference" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Naše reference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Podívejte se na ukázky našich realizovaných projektů. 
            Každá zakázka je pro nás jedinečná.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-lg overflow-hidden border border-border card-hover"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-accent font-medium mb-1">
                  {project.location}
                </p>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Chcete podobnou realizaci? Rádi vám připravíme nabídku.
          </p>
          <Button
            size="lg"
            className="group"
            onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
          >
            Nezávazná poptávka
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default References;
