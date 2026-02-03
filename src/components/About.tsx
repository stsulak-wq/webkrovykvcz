import { Check, Award, Clock } from "lucide-react";
import aboutImage from "@/assets/about-carpenter.jpg";
import founderImage from "@/assets/stefan-sulak.png";
const features = [
  "Více než 4 generace tesařského řemesla",
  "Rodinná tradice a poctivá práce",
  "Kvalitní materiály a tradiční postupy",
  "Individuální přístup ke každému projektu",
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
            Tesařina je naše rodinné řemeslo, které předáváme z generace na generaci již více než 100 let.
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
              Rodinná tradice od roku 1920
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Naše rodina se tesařskému řemeslu věnuje již více než <strong>4 generace</strong>. 
              Začínali jsme jako malá rodinná dílna a dnes jsme hrdí na to, že můžeme 
              pokračovat v tradici našich předků s využitím moderních technologií.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Věříme, že kvalitní tesařská práce vyžaduje nejen zkušenosti, ale především 
              lásku k řemeslu a respekt k materiálu. Každý krov, každá konstrukce 
              je pro nás výzvou a příležitostí dokázat, že tradiční řemeslo má stále své místo.
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
              <p className="text-primary font-semibold mb-4">Majitel a hlavní tesař</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                „Tesařina není jen práce – je to způsob života, který mi předali 
                můj otec a dědeček. Každý den vstávám s vědomím, že pokračuji 
                v tradici, která v naší rodině žije již čtyři generace. 
                Mým posláním je vytvářet konstrukce, které budou sloužit dalším generacím."
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Certifikovaný tesař</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">20+ let praxe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
