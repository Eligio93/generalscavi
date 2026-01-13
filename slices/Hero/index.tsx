import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/app/components/ui/button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const heroSizeMap = {
    small: "h-[450px]",
    medium: "h-[600px]",
    screen: "h-screen",
  } as const;

  const heroSize = heroSizeMap[slice.primary.size] ?? "h-screen";
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={heroSize}
    >
      <div className="h-full w-full relative flex justify-center items-center">
        <PrismicNextImage
          field={slice.primary.backgroundimage}
          className="absolute w-full h-full object-cover"
        />
        <div className="mx-auto  bg-radial from-foreground to-transparent to-70% w-full text-background min-h-56 z-20 flex flex-col gap-8 items-center justify-center">
          <div className="text-center flex flex-col gap-3">
            <h1 className="xl:text-7xl text-4xl md:text-5xl lg:text-6xl font-bold">
              {slice.primary.title}
            </h1>
            <p className="xl:text-3xl  text-2xl font-bold">
              {slice.primary.subtitle}
            </p>
          </div>

          <div className="flex gap-5">
            {slice.primary.ctas.map((cta) => (
              <Button
                key={cta.key}
                variant={cta.variant}
                className="xl:text-xl lg:text-lg lg:py-5 lg:px-6 xl:py-6 xl:px-8"
              >
                <PrismicNextLink field={cta} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
