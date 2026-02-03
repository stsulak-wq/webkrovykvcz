import { Zap, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Approach = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Dva přístupy, jeden cíl
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Každý projekt si žádá jiný přístup. Společně najdeme řešení, 
            které nejlépe odpovídá vašim potřebám a rozpočtu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Modern Approach */}
          <div className="bg-card p-8 md:p-10 rounded-xl border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                Moderní přístup
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Když je prioritou <strong>rychlost a efektivita</strong>. 
                Využíváme moderní technologie a osvědčené postupy pro rychlou 
                a spolehlivou realizaci.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Rychlá výstavba s minimální dobou realizace
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Jednoduchá a přehledná konstrukce
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Efektivní využití materiálu
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Optimalizace nákladů
                </li>
              </ul>
            </div>
          </div>

          {/* Traditional Approach */}
          <div className="bg-card p-8 md:p-10 rounded-xl border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                Tradiční řemeslo
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Když záleží na <strong>každém detailu</strong>. 
                Pohledové konstrukce s pečlivým zpracováním a důrazem 
                na estetiku tradičního tesařství.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Precizní pohledové spoje a detaily
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Tradiční tesařské techniky
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Důraz na estetickou hodnotu
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Konstrukce jako umělecké dílo
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 bg-secondary rounded-xl p-8">
          <p className="text-lg text-foreground mb-2">
            <strong>Nevíte, který přístup je pro vás?</strong>
          </p>
          <p className="text-muted-foreground mb-6">
            Rádi vám poradíme a navrhneme optimální řešení pro váš projekt.
          </p>
          <Button
            size="lg"
            className="group"
            onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
          >
            Konzultace zdarma
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Approach;
