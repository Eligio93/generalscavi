import {
  isFilled,
  ImageField,
  ContentRelationshipField,
  KeyTextField,
  GroupField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  uid?: string;
  data?: {
    image: ImageField;
    title: KeyTextField;
    description: KeyTextField;
    city: KeyTextField;
    service: GroupField<{
      service: ContentRelationshipField<"service"> & {
        data?: {
          title: KeyTextField;
        };
      };
    }>;
  };
};

export default function ProjectCard({
  project,
}: {
  project: ProjectCardProps;
}) {
  return (
    <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 mr-10 shadow-lg">
      <div>
        <PrismicNextImage
          field={project.data?.image}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col gap-3 px-2 py-4 bg-white rounded-b-lg">
        <div className="flex justify-between items-center ">
          {isFilled.contentRelationship(project.data?.service[0]?.service) && (
            <Badge variant="default">
              {project.data?.service[0]?.service.data?.title}
            </Badge>
          )}
          <div className="flex gap-1 items-center">
            <MapPin className="w-3 h-3 text-gray-500" />
            <p className="text-sm text-gray-500">{project.data?.city}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="uppercase font-bold font-michroma">
            {project.data?.title}
          </h3>
          <p className="line-clamp-5">{project.data?.description}</p>
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
}
