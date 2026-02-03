import { Check, Award, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-carpenter.jpg";
import founderImage from "@/assets/stefan-sulak.png";
const features = [
  "Více než 4 generace tesařského řemesla",
  "Individuální přístup ke každému projektu",
  "Moderní technologie i tradiční postupy",
  "Flexibilita – rychlost nebo detail, podle vašich potřeb",
];

const About = () => {
  return (
    <section id="o-nas" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            O naší firmě
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tesařina je naše rodinné řemeslo, které předáváme z generace na generaci.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img
                src={aboutImage}
                alt="Tesař při práci"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div className="animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
              Řemeslo předávané z generace na generaci
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Naše rodina se tesařskému řemeslu věnuje již <strong>4 generace</strong>. 
              Znalosti a dovednosti byly vždy předávány z otce na syna – od základů 
              práce se dřevem až po složité krovové konstrukce.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Po revoluci v roce 1989 začal můj otec podnikat jako OSVČ a postupně 
              vybudoval základy dnešní firmy. Dnes pokračujeme jako <strong>krovykv.cz s.r.o.</strong> 
              s využitím moderních technologií a tradičních tesařských postupů.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Chápeme, že každý projekt je jiný. Někdy je potřeba rychlost a jednoduchost, 
              jindy zase precizní pohledová konstrukce s důrazem na každý detail. 
              Nabízíme obojí – moderní efektivitu i tradiční řemeslnou péči.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Founder section */}
        <div className="bg-secondary rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <img
                  src={founderImage}
                  alt="Ing. Štefan Sulák"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                Ing. Štefan Sulák
              </h3>
              <p className="text-primary font-semibold mb-4">Jednatel a tesař</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                „Tesařina není jen práce – je to způsob života, který mi předali 
                můj otec a dědeček. Se dřevem pracuji již od svých 14 let a každý den 
                vstávám s vědomím, že pokračuji v tradici naší rodiny. 
                Mým posláním je vytvářet konstrukce, které budou sloužit dalším generacím."
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Certifikovaný tesař</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center md:text-left md:col-span-2 md:ml-auto">
            <Button
              size="lg"
              className="group"
              onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
            >
              Kontaktovat nás
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
