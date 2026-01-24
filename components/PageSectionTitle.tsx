import { KeyTextField } from "@prismicio/client";

export default function PageSectionTitle({
  title,
}: {
  title: KeyTextField;
}) {
  return (
    <div className="flex items-center w-full">
      <div className="md:w-24 w-10 border-t border-primary"></div>
      <span className="pl-4 text-primary font-bold text-sm md:text-lg uppercase">
        {title}
      </span>
    </div>
  );
}
