import { Info, CheckCircle, ArrowDown, Wind, Snowflake } from "lucide-react";

const krovTypes = [
  {
    title: "Krokvové krovy",
    description: "Jednodušší konstrukce bez vazného trámu. Zpevnění krokví zajišťuje hambálek. Vhodné pro menší rozpětí střech.",
  },
  {
    title: "Vázané krovy",
    description: "Klasické krovy s vazným trámem jako hlavním nosníkem. Trámy jsou do sebe zasazovány do předem vytvořených zářezů.",
  },
  {
    title: "Hambálkové krovy",
    description: "Liší se od vázaných krovů přeponou – hambálkem mezi krokvemi, který zajišťuje zpevnění a pochozí prostor pod ním.",
  },
];

const krovParts = [
  {
    name: "Vazný trám",
    description: "Hlavní nosník krovu, na kterém spočívají všechny ostatní prvky. Vodorovný prvek využívaný zejména u vázaných krovů.",
  },
  {
    name: "Krokev",
    description: "Šikmý prvek krovu (střechy), na který se montují latě pro střešní krytinu.",
  },
  {
    name: "Hambálek",
    description: "Vodorovný trám spojující dvě protilehlé krokve ve výšce 200 cm a více, aby se pod ním dalo projít.",
  },
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
            Co to je krov?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Krov je nosná konstrukce střechy, která slouží k rovnoměrnému rozprostření 
            zatížení krytiny, sněhu či povětrnostních podmínek do svislých nosných stěn stavby.
            Jedná se o základy půdního obytného prostoru, tradičně sestrojené ze dřeva.
          </p>
        </div>

        {/* Types of roofs */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
            Typy krovů, které vyrábíme a montujeme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {krovTypes.map((type, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {type.title}
                </h4>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">
            Klasické vázané, hambálkové i krokvové krovy umožňují maximální využití 
            půdního prostoru pro podkroví a mají vyšší estetickou hodnotu než vazníky. 
            Jsou tak vhodné zejména pro rodinné domy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left column - Parts */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
              Základní části krovu
            </h3>
            <div className="space-y-4">
              {krovParts.map((part, index) => (
                <div
                  key={index}
                  className="bg-card p-5 rounded-lg border border-border"
                >
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {part.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">{part.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Slope info */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
              Šikmost střechy – co je dobré vědět
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Při výběru druhu krovu je třeba brát v potaz mnoho faktorů: půdorys stavby, 
              tvar a sklon střechy, velikost a rozpětí, využití půdního prostoru a lokalitu 
              spojenou s povětrnostními podmínkami.
            </p>
            
            <div className="space-y-4">
              <div className="bg-card p-5 rounded-lg border border-border flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Zatížení sněhem</h4>
                  <p className="text-muted-foreground text-sm">
                    Při strmějším sklonu střechy klesá zatížení sněhem. 
                    Při šikmosti 60° a více se sníh na střeše neudrží.
                  </p>
                </div>
              </div>
              
              <div className="bg-card p-5 rounded-lg border border-border flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Zatížení větrem</h4>
                  <p className="text-muted-foreground text-sm">
                    Při strmějším sklonu střechy stoupá zatížení větrem. 
                    Čím vyšší šikmost, tím vyšší plocha vystavená větru.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-foreground mb-2">
                💡 Tip od odborníků
              </h4>
              <p className="text-muted-foreground text-sm">
                Pokud si přejete mít půdu obyvatelnou či pochozí, doporučujeme 
                <strong> hambálkové krovy</strong> místo vázaných krovů. Hambálek zajišťuje 
                zpevnění celého krovu a zároveň vytváří pochozí prostor pod ním.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-card rounded-xl p-8 border border-border">
          <p className="text-lg text-foreground mb-2">
            Krovy pro vás vyrábíme již po <strong>čtyři generace</strong>.
          </p>
          <p className="text-muted-foreground mb-6">
            Naše krovy disponují výjimečnou nosností, pevností a hlavně životností. 
            Vše provedeno tradičně a precizně.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Nezávazná poptávka
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatIsKrov;
