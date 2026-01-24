import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<
  Content.HeroSlice,
  { isHomePage: boolean }
>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice, context }) => {
  const isHomePage = context?.isHomePage ?? false;
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
      <div className="h-full w-full relative flex justify-center items-center p-3">
        <PrismicNextImage
          field={slice.primary.backgroundimage}
          className="absolute w-full h-full object-cover"
        />
        <div
          className={`mx-auto bg-foreground/20 min-h-56 z-20 flex flex-col gap-5 xl:gap-8 items-center justify-center p-2 md:p-3  lg:p-5 xl:p-10  ${isHomePage ? "backdrop-blur-xl rounded-lg" : "absolute w-full h-full bg-foreground/70"}`}
        >
          {slice.primary.logo && (
            <PrismicNextImage
              field={slice.primary.logo}
              className="xl:h-25 h-15 md:h-20 w-auto"
            />
          )}
          <div className="text-center flex flex-col gap-3">
            <h1 className="xl:text-6xl text-3xl md:text-4xl lg:text-5xl font-bold font-michroma text-background">
              {slice.primary.title}
            </h1>
            <p className="xl:text-2xl  lg:text-xl font-bold  text-background">
              {slice.primary.subtitle}
            </p>
          </div>

          <div className="flex gap-2 lg:gap-5">
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
