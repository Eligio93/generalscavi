"use client";
import { FC } from "react";
import { isFilled } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/app/components/Wrapper";
import SectionHeader from "@/app/components/SectionHeader";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PrismicNextImage } from "@prismicio/next";
import { Badge } from "@/components/ui/badge";
import { CircleChevronLeft, CircleChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

/**
 * Props for `ImportantProjects`.
 */
export type ImportantProjectsProps =
  SliceComponentProps<Content.ImportantProjectsSlice>;

/**
 * Component for "ImportantProjects" Slices.
 */
const ImportantProjects: FC<ImportantProjectsProps> = ({ slice }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay()]
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <SectionHeader
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
          bgColor={slice.primary.backgroundcolor}
        />
        <div className="flex flex-col gap-5">
          <div className="flex justify-end gap-4">
            <button onClick={() => emblaApi?.scrollPrev()}>
              <CircleChevronLeft className="size-8" />
            </button>
            <button onClick={() => emblaApi?.scrollNext()}>
              <CircleChevronRight className="size-8" />
            </button>
          </div>
          <div className="embla overflow-hidden" ref={emblaRef}>
            {/**CAROUSEL CONTROLS */}

            <div className="embla__container flex ">
              {slice.primary.projects.map((item) => {
                if (!isFilled.contentRelationship(item.project)) {
                  return null;
                }
                const project = item.project;
                return (
                  <div
                    key={project.id}
                    className="embla__slide flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 mr-10 shadow-lg"
                  >
                    <div>
                      <PrismicNextImage
                        field={project.data?.image}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-3 px-2 py-4 bg-white rounded-b-lg">
                      <div className="flex justify-between items-center ">
                        {isFilled.contentRelationship(
                          project.data?.service[0]?.service
                        ) && (
                          <Badge variant="default">
                            {project.data?.service[0]?.service.data?.title}
                          </Badge>
                        )}
                        <div className="flex gap-1 items-center">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            {project.data?.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="uppercase font-bold font-michroma">
                          {project.data?.title}
                        </h3>
                        <p className="line-clamp-5">
                          {project.data?.description}
                        </p>
                      </div>
                      <Link
                        href={`/progetti/${project.uid}`}
                        className="bg-primary text-white py-2 px-3 rounded-lg uppercase font-bold text-sm text-center hover:bg-accent-foreground hover:text-primary transition-all"
                      >
                        Vedi Progetto
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ImportantProjects;
