import { Info, CheckCircle } from "lucide-react";

const krovTypes = [
  {
    title: "Vaznicový krov",
    description: "Tradiční typ krovu vhodný pro většinu rodinných domů. Skládá se z vaznic, krokví a kleštin.",
  },
  {
    title: "Hambalkový krov",
    description: "Jednodušší konstrukce pro menší rozpětí. Krokve jsou spojeny hambalkem, který přenáší zatížení.",
  },
  {
    title: "Vazníkový krov",
    description: "Moderní řešení z prefabrikovaných prvků. Rychlá montáž a vysoká únosnost.",
  },
];

const benefits = [
  "Ochrana domu před povětrnostními vlivy",
  "Dlouhá životnost při správné údržbě",
  "Možnost využití podkrovního prostoru",
  "Estetický vzhled celé stavby",
];

const WhatIsKrov = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Info className="w-5 h-5" />
            <span className="font-medium">Vzdělávací sekce</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Co je to krov?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Krov je nosná konstrukce střechy, která přenáší zatížení střešní krytiny, 
            sněhu a větru do nosných stěn budovy. Je základem každé kvalitní střechy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Types */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
              Základní typy krovů
            </h3>
            <div className="space-y-6">
              {krovTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border"
                >
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    {type.title}
                  </h4>
                  <p className="text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Benefits and info */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
              Proč je kvalitní krov důležitý?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Krov je jednou z nejdůležitějších částí domu. Správně navržený 
              a provedený krov zajistí dlouhodobou ochranu celé stavby a vytvoří 
              prostor pro případné využití podkroví.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">
                💡 Víte, že...
              </h4>
              <p className="text-muted-foreground text-sm">
                Kvalitní dřevěný krov může při správné údržbě sloužit i více než 
                100 let? V Česku najdeme historické krovy, které stojí již několik staletí. 
                Klíčem je výběr správného dřeva a pravidelná kontrola stavu konstrukce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsKrov;
