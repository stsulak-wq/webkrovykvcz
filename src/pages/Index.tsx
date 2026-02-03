import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import WhatIsKrov from "@/components/WhatIsKrov";
import About from "@/components/About";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Approach />
        <WhatIsKrov />
        <About />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
