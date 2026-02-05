import { useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Balkony gallery images
import balkon1 from "@/assets/balkony/balkon-1.jpg";
import balkon2 from "@/assets/balkony/balkon-2.jpg";
import balkon3 from "@/assets/balkony/balkon-3.jpg";
import balkon4 from "@/assets/balkony/balkon-4.jpg";
import balkon5 from "@/assets/balkony/balkon-5.jpg";
import balkon6 from "@/assets/balkony/balkon-6.jpg";
import balkon7 from "@/assets/balkony/balkon-7.jpg";
import balkon8 from "@/assets/balkony/balkon-8.jpg";
import balkon9 from "@/assets/balkony/balkon-9.jpg";
import balkon10 from "@/assets/balkony/balkon-10.jpg";
// Otovice gallery images
import otovice1 from "@/assets/otovice/otovice-1.jpg";
import otovice2 from "@/assets/otovice/otovice-2.jpg";
import otovice3 from "@/assets/otovice/otovice-3.jpg";
import otovice4 from "@/assets/otovice/otovice-4.jpg";
import otovice5 from "@/assets/otovice/otovice-5.jpg";
import otovice6 from "@/assets/otovice/otovice-6.jpg";

// Olšová Vrata gallery images
import olsovaVrata1 from "@/assets/olsova-vrata/olsova-vrata-1.jpg";
import olsovaVrata2 from "@/assets/olsova-vrata/olsova-vrata-2.jpg";
import olsovaVrata3 from "@/assets/olsova-vrata/olsova-vrata-3.jpg";
import olsovaVrata4 from "@/assets/olsova-vrata/olsova-vrata-4.jpg";
import olsovaVrata5 from "@/assets/olsova-vrata/olsova-vrata-5.jpg";

// Hájek Pergola gallery images
import pergola1 from "@/assets/hajek-pergola/pergola-1.jpg";
import pergola2 from "@/assets/hajek-pergola/pergola-2.jpg";
import pergola3 from "@/assets/hajek-pergola/pergola-3.jpg";
import pergola4 from "@/assets/hajek-pergola/pergola-4.jpg";
import pergola5 from "@/assets/hajek-pergola/pergola-5.jpg";
import pergola6 from "@/assets/hajek-pergola/pergola-6.jpg";
import pergola7 from "@/assets/hajek-pergola/pergola-7.jpg";

const otoviceImages = [
  { src: otovice1, alt: "Krov bytového domu Otovice - pohled 1" },
  { src: otovice2, alt: "Krov bytového domu Otovice - pohled 2" },
  { src: otovice3, alt: "Krov bytového domu Otovice - pohled 3" },
  { src: otovice4, alt: "Krov bytového domu Otovice - pohled 4" },
  { src: otovice5, alt: "Krov bytového domu Otovice - pohled 5" },
  { src: otovice6, alt: "Krov bytového domu Otovice - pohled 6" },
];

const olsovaVrataImages = [
  { src: olsovaVrata1, alt: "Krov pro RD Olšová Vrata - pohled 1" },
  { src: olsovaVrata2, alt: "Krov pro RD Olšová Vrata - pohled 2" },
  { src: olsovaVrata3, alt: "Krov pro RD Olšová Vrata - pohled 3" },
  { src: olsovaVrata4, alt: "Krov pro RD Olšová Vrata - pohled 4" },
  { src: olsovaVrata5, alt: "Krov pro RD Olšová Vrata - pohled 5" },
];

const hajekPergolaImages = [
  { src: pergola1, alt: "Pergola Hájek - pohled 1" },
  { src: pergola2, alt: "Pergola Hájek - detail konstrukce" },
  { src: pergola3, alt: "Pergola Hájek - pohled 3" },
  { src: pergola4, alt: "Pergola Hájek - pohled 4" },
  { src: pergola5, alt: "Pergola Hájek - pohled 5" },
  { src: pergola6, alt: "Pergola Hájek - příprava trámů" },
  { src: pergola7, alt: "Pergola Hájek - trámy" },
];

const balkonyImages = [
  { src: balkon1, alt: "Dřevěné balkony Gelsenkirchen - pohled 1" },
  { src: balkon2, alt: "Dřevěné balkony Gelsenkirchen - pohled 2" },
  { src: balkon3, alt: "Dřevěné balkony Gelsenkirchen - pohled 3" },
  { src: balkon4, alt: "Dřevěné balkony Gelsenkirchen - pohled 4" },
  { src: balkon5, alt: "Dřevěné balkony Gelsenkirchen - pohled 5" },
  { src: balkon6, alt: "Dřevěné balkony Gelsenkirchen - pohled 6" },
  { src: balkon7, alt: "Dřevěné balkony Gelsenkirchen - pohled 7" },
  { src: balkon8, alt: "Dřevěné balkony Gelsenkirchen - pohled 8" },
  { src: balkon9, alt: "Dřevěné balkony Gelsenkirchen - pohled 9" },
  { src: balkon10, alt: "Dřevěné balkony Gelsenkirchen - pohled 10" },
];

const projects = [
  {
    image: otovice2,
    title: "Krov bytového domu Otovice",
    location: "Karlovy Vary",
    description: "Kompletní realizace krovu pro celý objekt.",
    isGallery: true,
    galleryImages: otoviceImages,
  },
  {
    image: olsovaVrata3,
    title: "Krov pro RD",
    location: "Olšová Vrata",
    description: "Realizace krovu pro rodinný dům.",
    isGallery: true,
    galleryImages: olsovaVrataImages,
  },
  {
    image: pergola1,
    title: "Pergola",
    location: "Hájek u Karlových Varů",
    description: "Částečně viditelné prvky a konstrukční část připravená na obložení.",
    isGallery: true,
    galleryImages: hajekPergolaImages,
  },
  {
    image: balkon1,
    title: "Výroba a montáž balkonů",
    location: "Gelsenkirchen, Porýní - Německo",
    description: "Balkonový komplex do vnitrobloku pro bytový dům.",
    isGallery: true,
    galleryImages: balkonyImages,
  },
];

const References = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="reference" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Naše reference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Podívejte se na ukázky našich realizovaných projektů. 
            Každá zakázka je pro nás jedinečná.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-card rounded-lg overflow-hidden border border-border card-hover ${
                project.isGallery ? "cursor-pointer" : ""
              }`}
              onClick={() => project.isGallery && setSelectedProject(project)}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.isGallery && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white font-medium">
                      <Images className="w-5 h-5" />
                      <span>Zobrazit galerii</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm text-accent font-medium mb-1">
                  {project.location}
                </p>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
                {project.isGallery && (
                  <p className="text-sm text-primary mt-2 flex items-center gap-1">
                    <Images className="w-4 h-4" />
                    {project.galleryImages?.length} fotografií
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-5xl p-0 bg-card border-border">
            <div className="p-6 pb-0">
              <h3 className="text-2xl font-serif font-bold text-foreground">
                {selectedProject?.title}
              </h3>
              <p className="text-muted-foreground">{selectedProject?.location}</p>
            </div>
            <div className="p-6">
              <div className="px-12">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {selectedProject?.galleryImages?.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2"
                      >
                        <div
                          className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image.src);
                          }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Full image Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Detail"
                className="w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Chcete podobnou realizaci? Rádi vám připravíme nabídku.
          </p>
          <Button
            size="lg"
            className="group"
            onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
          >
            Nezávazná poptávka
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default References;
