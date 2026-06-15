import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/components/Wrapper";
import { PrismicNextImage } from "@prismicio/next";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * Props for `AllServices`.
 */
export type AllServicesProps = SliceComponentProps<Content.AllServicesSlice>;

/**
 * Component for "AllServices" Slices.
 */
const AllServices: FC<AllServicesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.services.map((serviceItem, index) => {
        if (!isFilled.contentRelationship(serviceItem.service)) {
          return null;
        }

        const service = serviceItem.service.data;
        return (
          <div
            key={serviceItem.service.id}
            className={`${index % 2 === 0 ? "light-bg" : "dark-bg"}`}
          >
            <Wrapper>
              <div className="flex flex-col md:flex-row gap-5">
                <div
                  className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"} relative h-64 rounded-lg overflow-hidden w-full max-w-[500px] mx-auto shadow-2xl`}
                >
                  <PrismicNextImage
                    field={service?.image}
                    fill
                    fallbackAlt=""
                    className="object-cover"
                  />
                </div>
                <div
                  className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"} flex flex-col gap-2`}
                >
                  <p
                    className={`${index % 2 === 0 ? "text-foreground" : "text-primary"} font-michroma font-bold uppercase text-center md:text-left`}
                  >
                    {service?.title}
                  </p>
                  <RichTextRenderer richText={service?.description} />{" "}
                </div>
              </div>
            </Wrapper>
          </div>
        );
      })}
    </section>
  );
};

export default AllServices;
