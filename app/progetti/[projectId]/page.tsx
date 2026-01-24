import { createClient } from "@/prismicio";
import Wrapper from "@/components/Wrapper";
import { PrismicImage } from "@prismicio/react";
import { Calendar, Construction, HardHat, MapPin } from "lucide-react";
import { isFilled } from "@prismicio/client";
import PageSectionTitle from "@/components/PageSectionTitle";
import PhotoGallery from "@/components/PhotoGallery/PhotoGallery";
import RichTextRenderer from "@/components/RichTextRenderer";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const client = createClient();
  const { projectId } = await params;
  const project = await client.getByUID("project", projectId);
  return (
    <Wrapper className="mt-10">
      <div className="lg:relative flex flex-col gap-10 lg:block">
        <PrismicImage
          field={project.data.image}
          className="h-[250px] lg:h-[500px] w-full object-cover rounded-lg"
        />
        <div className="lg:absolute bottom-5 h-[300px] w-[400px] bg-foreground z-10 rounded-r-lg shadow-2xl p-3 text-white lg:flex flex-col gap-5 hidden">
          <p className="text-center text-primary font-bold font-michroma uppercase">
            {project.data.title}
          </p>
          <p>{project.data.description}</p>
        </div>
        <div className="flex flex-col gap-5 lg:hidden">
          <p className="text-center text-primary font-bold font-michroma uppercase ">
            {project.data.title}
          </p>
          <p>{project.data.description}</p>
        </div>
      </div>
      {project.data.copy && <RichTextRenderer richText={project.data.copy} />}
      <div className="bg-foreground flex flex-wrap text-white rounded-lg p-2 font-michroma gap-5 justify-evenly">
        {project.data.address && (
          <div className="flex flex-col items-center gap-1">
            <p>{project.data.address}</p>
            <Construction className="size-7 stroke-1" />
          </div>
        )}
        {project.data.city && (
          <div className="flex flex-col items-center gap-1">
            <p>{`${project.data.city} (${project.data.province})`}</p>
            <MapPin className="size-7 stroke-1" />
          </div>
        )}
        {project.data.year && (
          <div className="flex flex-col items-center gap-1">
            <p>{project.data.year}</p>
            <Calendar className="size-7 stroke-1" />
          </div>
        )}

        {isFilled.contentRelationship(project.data.service[0]?.service) && (
          <div className="flex flex-col items-center gap-1">
            <p>{project.data.service[0].service.data?.title}</p>
            <HardHat className="size-7 stroke-1" />
          </div>
        )}
      </div>
      {isFilled.linkToMedia(project.data.video) && (
        <div className="flex flex-col gap-10">
          <PageSectionTitle title="Video del progetto" />
          <video
            src={project.data.video.url}
            className="w-full h-[300px] lg:h-[500px] object-cover rounded-lg"
            controls
          />
        </div>
      )}
      {isFilled.image(project.data.gallery[0]?.picture) && (
        <div className="flex flex-col gap-10">
          <PageSectionTitle title="Photo Gallery" />
          <PhotoGallery
            slides={project.data.gallery.map(
              (galleryItem) => galleryItem.picture
            )}
          />
        </div>
      )}
    </Wrapper>
  );
}
