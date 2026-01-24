import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/components/Wrapper";
import { PrismicNextLink } from "@prismicio/next";
import RichTextRenderer from "@/components/RichTextRenderer";
import SectionHeader from "@/components/SectionHeader";

/**
 * Props for `ServiceBanner`.
 */
export type ServiceBannerProps =
  SliceComponentProps<Content.ServiceBannerSlice>;

/**
 * Component for "ServiceBanner" Slices.
 */
const ServiceBanner: FC<ServiceBannerProps> = ({ slice }) => {
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
        {slice.primary.services.length > 0 && (
          <div className="flex flex-wrap  md:justify-center gap-10 xl:gap-15">
            {slice.primary.services.map((serviceWrapper) => {
              const service = serviceWrapper.service;
              if (!isFilled.contentRelationship(service)) {
                return null;
              }
              return (
                <div
                  key={service.id}
                  className="relative flex flex-col items-center gap-2 h-[500px] w-full md:max-w-80 xl:max-w-96 border rounded-lg overflow-hidden group "
                >
                  <PrismicImage
                    field={service.data?.image}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute left-0 bottom-0 w-full bg-black/40 backdrop-blur-md transition-all duration-300 ease-in-out rounded-t-lg">
                    <p className="text-center text-2xl font-bold text-secondary py-2">
                      {service.data?.title}
                    </p>
                    <div className="lg:max-h-0  overflow-hidden lg:opacity-0 group-hover:max-h-[400px] group-hover:opacity-100 transition-all duration-700 ease-in-out text-secondary">
                      <div className="p-4 pt-0 flex flex-col gap-4 text-lg">
                        <RichTextRenderer
                          richText={service.data?.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default ServiceBanner;
