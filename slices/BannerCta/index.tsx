import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/components/Wrapper";
import PageSectionTitle from "@/components/PageSectionTitle";
import PageSectionSubtitle from "@/components/PageSectionSubtitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Props for `BannerCta`.
 */
export type BannerCtaProps = SliceComponentProps<Content.BannerCtaSlice>;

/**
 * Component for "BannerCta" Slices.
 */
const BannerCta: FC<BannerCtaProps> = ({ slice }) => {
  const backgroundClass =
    slice.primary.backgroundColor === "dark" ? "dark-bg" : "light-bg";
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={backgroundClass}
    >
      <Wrapper>
        <div className="flex items-center justify-center w-full flex-col gap-5">
          {slice.primary.title && (
            <PageSectionTitle title={slice.primary.title} />
          )}
          {slice.primary.subtitle && (
            <PageSectionSubtitle
              subtitle={slice.primary.subtitle}
              bgColor={slice.primary.backgroundColor}
              className="text-center"
            />
          )}
          <Button variant="default" size={"lg"} className="mt-5">
            <Link href="/contatti" className="text-lg">
              Contattaci Ora
            </Link>
          </Button>
        </div>
      </Wrapper>
    </section>
  );
};

export default BannerCta;
