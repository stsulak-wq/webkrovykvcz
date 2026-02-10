import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoKv from "@/assets/logo-kv.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: "#sluzby", label: "Služby", type: "scroll" },
    { href: "/drevene-balkony", label: "Dřevěné balkony", type: "route" },
    { href: "/tesarska-konzultace", label: "Konzultace", type: "route" },
    { href: "#o-nas", label: "O nás", type: "scroll" },
    { href: "#reference", label: "Reference", type: "scroll" },
    { href: "#kontakt", label: "Kontakt", type: "scroll" },
  ];

  const handleNavClick = (link: { href: string; label: string; type: string }) => {
    if (link.type === "route") {
      navigate(link.href);
    } else {
      // If not on home page, navigate there first
      if (location.pathname !== "/") {
        navigate("/" + link.href);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-2">
            <img src={logoKv} alt="krovykv.cz logo" className="h-10 md:h-12 w-auto" />
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary">
              krovykv.cz
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`transition-colors font-medium ${
                  link.type === "route" && location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+420725716937" className="flex items-center gap-2 text-primary font-semibold">
              <Phone className="w-4 h-4" />
              +420 725 716 937
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col py-4 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link)}
                  className={`py-3 text-left transition-colors font-medium ${
                    link.type === "route" && location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+420725716937"
                className="flex items-center gap-2 py-3 text-primary font-semibold"
              >
                <Phone className="w-4 h-4" />
                +420 725 716 937
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
