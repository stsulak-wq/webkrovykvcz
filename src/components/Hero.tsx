import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-krovy.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector("#sluzby");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-wood-dark/90 via-wood-dark/70 to-wood-dark/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 py-32 md:py-40">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
            Tesařské práce a krovy
            <span className="block text-wood-light">tradice i moderní přístup</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
            Každý projekt je jedinečný. Nabízíme tradiční pohledové konstrukce 
            s důrazem na detail i moderní řešení s efektivitou a rychlostí výstavby.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToContact}
              className="group"
            >
              Nezávazná poptávka
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              onClick={scrollToServices}
            >
              Naše služby
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
