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
import balkon11 from "@/assets/balkony/balkon-11.jpg";
import balkon12 from "@/assets/balkony/balkon-12.jpg";
import balkon13 from "@/assets/balkony/balkon-13.jpg";
import balkon14 from "@/assets/balkony/balkon-14.jpg";
import balkon15 from "@/assets/balkony/balkon-15.jpg";
import balkon16 from "@/assets/balkony/balkon-16.jpg";
import balkon17 from "@/assets/balkony/balkon-17.jpg";
import balkon18 from "@/assets/balkony/balkon-18.jpg";
import balkon19 from "@/assets/balkony/balkon-19.jpg";
import balkon20 from "@/assets/balkony/balkon-20.jpg";
import balkon21 from "@/assets/balkony/balkon-21.jpg";
import balkon22 from "@/assets/balkony/balkon-22.jpg";
import balkon23 from "@/assets/balkony/balkon-23.jpg";
import balkon24 from "@/assets/balkony/balkon-24.jpg";
import balkon25 from "@/assets/balkony/balkon-25.jpg";
import balkon26 from "@/assets/balkony/balkon-26.jpg";
import balkon27 from "@/assets/balkony/balkon-27.jpg";
import balkon28 from "@/assets/balkony/balkon-28.jpg";

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
  { src: balkon11, alt: "Dřevěný balkón - realizace 11" },
  { src: balkon12, alt: "Dřevěný balkón - realizace 12" },
  { src: balkon13, alt: "Dřevěný balkón - realizace 13" },
  { src: balkon14, alt: "Dřevěný balkón - realizace 14" },
  { src: balkon15, alt: "Dřevěný balkón - realizace 15" },
  { src: balkon16, alt: "Dřevěný balkón - realizace 16" },
  { src: balkon17, alt: "Dřevěný balkón - realizace 17" },
  { src: balkon18, alt: "Dřevěný balkón - realizace 18" },
  { src: balkon19, alt: "Dřevěný balkón - realizace 19" },
  { src: balkon20, alt: "Dřevěný balkón - realizace 20" },
  { src: balkon21, alt: "Dřevěný balkón - realizace 21" },
  { src: balkon22, alt: "Dřevěný balkón - realizace 22" },
  { src: balkon23, alt: "Dřevěný balkón - realizace 23" },
  { src: balkon24, alt: "Dřevěný balkón - realizace 24" },
  { src: balkon25, alt: "Dřevěný balkón - realizace 25" },
  { src: balkon26, alt: "Dřevěný balkón - realizace 26" },
  { src: balkon27, alt: "Dřevěný balkón - realizace 27" },
  { src: balkon28, alt: "Dřevěný balkón - realizace 28" },
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
