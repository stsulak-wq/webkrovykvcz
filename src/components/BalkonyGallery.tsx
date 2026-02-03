import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

const images = [
  { src: balkon1, alt: "Dřevěný balkón - realizace 1" },
  { src: balkon2, alt: "Dřevěný balkón - realizace 2" },
  { src: balkon3, alt: "Dřevěný balkón - realizace 3" },
  { src: balkon4, alt: "Dřevěný balkón - realizace 4" },
  { src: balkon5, alt: "Dřevěný balkón - realizace 5" },
  { src: balkon6, alt: "Dřevěný balkón - realizace 6" },
  { src: balkon7, alt: "Dřevěný balkón - realizace 7" },
  { src: balkon8, alt: "Dřevěný balkón - realizace 8" },
  { src: balkon9, alt: "Dřevěný balkón - realizace 9" },
  { src: balkon10, alt: "Dřevěný balkón - realizace 10" },
];

const BalkonyGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Naše realizace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prohlédněte si ukázky našich dřevěných balkónů a balkónových konstrukcí.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => setSelectedImage(image.src)}
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

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Dřevěný balkón detail"
                className="w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BalkonyGallery;
