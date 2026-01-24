import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/prismicio";
import Wrapper from "@/components/Wrapper";
import PageSectionTitle from "@/components/PageSectionTitle";
import ProjectCard from "@/components/ProjectCard";

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

/**
 * Component for "Projects" Slices.
 */
const Projects: FC<ProjectsProps> = async ({ slice }) => {
  const client = createClient();
  const services = (await client.getAllByType("service")).map(
    (service) => service.data.title,
  );
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <Tabs defaultValue="all" className="bg-transparent rounded-lg border-0">
          <TabsList className="bg-transparent gap-2 flex-wrap h-auto ">
            <TabsTrigger
              value="all"
              className=" text-white border border-white bg-foreground"
            >
              Tutti
            </TabsTrigger>
            {services.map((service) => (
              <TabsTrigger
                key={service}
                value={service as string}
                className="text-white border border-white bg-foreground"
              >
                {service}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="all"
            className="bg-transparent flex flex-col gap-5"
          >
            <PageSectionTitle title="Tutti i progetti" />
            <div className="flex flex-wrap gap-y-5">
              {slice.primary.projects.map((project) => {
                if (!isFilled.contentRelationship(project.project)) {
                  return null;
                }
                return (
                  <ProjectCard
                    key={project.project.uid}
                    project={project.project}
                  />
                );
              })}
            </div>
          </TabsContent>
          {services.map((service) => (
            <TabsContent
              key={service}
              value={service as string}
              className="bg-transparent flex flex-col gap-5"
            >
              <PageSectionTitle title={service} />
              <div className="flex flex-wrap gap-y-5">
                {slice.primary.projects.map((project) => {
                  if (!isFilled.contentRelationship(project.project)) {
                    return null;
                  }
                  if (
                    !isFilled.contentRelationship(
                      project.project.data?.service[0]?.service,
                    )
                  ) {
                    return null;
                  }
                  // Filtra solo i progetti che hanno questo servizio
                  if (
                    project.project.data?.service[0]?.service.data?.title !==
                    service
                  ) {
                    return null;
                  }
                  return (
                    <ProjectCard
                      key={project.project.uid}
                      project={project.project}
                    />
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Wrapper>
    </section>
  );
};

export default Projects;
