const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-dark text-primary-foreground py-8">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold">KrovyKV</span>
          </div>

          <p className="text-primary-foreground/70 text-sm text-center">
            © {currentYear} KrovyKV. Všechna práva vyhrazena.
          </p>

          <div className="flex items-center gap-6">
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
              href="#kontakt"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
            >
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
