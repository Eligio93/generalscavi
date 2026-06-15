import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/components/Wrapper";
import SectionHeader from "@/components/SectionHeader";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `CertificationsBanner`.
 */
export type CertificationsBannerProps =
  SliceComponentProps<Content.CertificationsBannerSlice>;

/**
 * Component for "CertificationsBanner" Slices.
 */
const CertificationsBanner: FC<CertificationsBannerProps> = ({ slice }) => {
  const backgroundClass =
    slice.primary.backgroundcolor === "dark" ? "dark-bg" : "light-bg";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={backgroundClass}
    >
      <Wrapper>
        <SectionHeader
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
          bgColor={slice.primary.backgroundcolor}
        />
        <div className="flex justify-evenly flex-wrap gap-10">
          {slice.primary.certifications.map((certification, index) => {
            return (
              <PrismicNextImage
                key={index}
                field={certification.image}
                fallbackAlt=""
                className="h-40 w-auto"
              />
            );
          })}
        </div>
      </Wrapper>
    </section>
  );
};

export default CertificationsBanner;
