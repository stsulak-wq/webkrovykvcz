import { Check } from "lucide-react";
import aboutImage from "@/assets/about-carpenter.jpg";

const features = [
  "Více než 20 let zkušeností",
  "Kvalitní materiály a zpracování",
  "Individuální přístup ke každému projektu",
  "Garance spokojenosti",
];

const About = () => {
  return (
    <section id="o-nas" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              O naší firmě
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Jsme rodinná firma s dlouholetou tradicí v oblasti tesařských prací 
              a stavby krovů. Naše práce je pro nás posláním a každý projekt 
              realizujeme s maximálním nasazením a důrazem na kvalitu.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Specializujeme se na tradiční tesařské řemeslo, které kombinujeme 
              s moderními technologiemi a materiály. Díky tomu dokážeme splnit 
              i ty nejnáročnější požadavky našich zákazníků.
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
      </div>
    </section>
  );
};

export default About;
