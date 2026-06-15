"use client";
import { FC } from "react";
import { isFilled } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Wrapper from "@/components/Wrapper";
import SectionHeader from "@/components/SectionHeader";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

import ProjectCard from "@/components/ProjectCard";

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
    [Autoplay()],
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
          {/**CAROUSEL CONTROLS */}
          <div className="flex justify-end gap-4">
            <button onClick={() => emblaApi?.scrollPrev()}>
              <CircleChevronLeft className="size-8" />
            </button>
            <button onClick={() => emblaApi?.scrollNext()}>
              <CircleChevronRight className="size-8" />
            </button>
          </div>
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex ">
              {slice.primary.projects.map((item) => {
                if (!isFilled.contentRelationship(item.project)) {
                  return null;
                }
                const project = item.project;
                return <ProjectCard key={project.id} project={project} />;
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ImportantProjects;
