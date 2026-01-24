"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { PrismicImage } from "@prismicio/react";
import { ImageField } from "@prismicio/client";

type ThumbProps = {
  selected: boolean;
  image: ImageField;
  onClick: () => void;
};

export const Thumb: React.FC<ThumbProps> = ({ selected, image, onClick }) => {
  return (
    <div className="flex-[0_0_25%] min-w-0 pl-3 sm:flex-[0_0_15%]">
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "rounded-lg  cursor-pointer p-0 m-0",
          "flex items-center justify-center aspect-square w-full",
          " touch-manipulation",
          selected ? "border border-foreground rounded-lg" : ""
        )}
      >
        <PrismicImage
          field={image}
          className="w-full h-full object-cover rounded-lg"
        />
      </button>
    </div>
  );
};

export default function PhotoGallery({ slides }: { slides: ImageField[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="max-w-3xl xl:max-w-full mx-auto min-w-0 w-full overflow-hidden">
      {/* Main Carousel */}
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y -ml-4">
          {slides.map((image, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 pl-4 translate-x-0"
            >
              <div className="rounded-lg flex items-center justify-center h-76 xl:h-[500px] select-none">
                <PrismicImage
                  field={image}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbs Carousel */}
      <div className="mt-3">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex flex-row -ml-3">
            {slides.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
