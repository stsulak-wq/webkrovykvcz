import logoKv from "@/assets/logo-kv.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-dark text-primary-foreground py-12">
      <div className="container-custom px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoKv} alt="krovykv.cz logo" className="h-14 w-auto rounded-lg" />
              <span className="text-2xl font-serif font-bold">krovykv.cz</span>
            </div>
            <div className="text-primary-foreground/70 text-sm space-y-1">
              <p className="font-semibold text-primary-foreground">Údaje z obchodního rejstříku:</p>
              <p>krovykv.cz s.r.o.</p>
              <p>IČO: 14262622</p>
              <p>DIČ: CZ14262622</p>
              <p>Sídlo: Bezručova 1374/31, 360 01 Karlovy Vary</p>
              <p>Spisová značka: C 42197/KSPL</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Rychlé odkazy</h4>
            <div className="flex flex-col gap-2">
              <a
                href="#sluzby"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
              >
                Služby
              </a>
              <a
                href="#o-nas"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
              >
                O nás
              </a>
              <a
                href="#reference"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
              >
                Reference
              </a>
              <a
                href="#kontakt"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
              >
                Kontakt
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="text-primary-foreground/70 text-sm space-y-2">
              <p>
                <a href="tel:+420725716937" className="hover:text-primary-foreground transition-colors">
                  +420 725 716 937
                </a>
              </p>
              <p>Bezručova 1374/31</p>
              <p>360 01 Karlovy Vary</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6">
          <p className="text-primary-foreground/70 text-sm text-center">
            © {currentYear} krovykv.cz s.r.o. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
