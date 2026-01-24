import { KeyTextField } from "@prismicio/client";
import PageSectionSubtitle from "./PageSectionSubtitle";
import PageSectionTitle from "./PageSectionTitle";

type SectionHeaderProps = {
  title?: KeyTextField;
  subtitle?: KeyTextField;
  bgColor?: string;
};
export default function SectionHeader({
  title,
  subtitle,
  bgColor = "light",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-5 ">
      {title && <PageSectionTitle title={title} />}
      {subtitle && (
        <PageSectionSubtitle subtitle={subtitle} bgColor={bgColor} />
      )}
    </div>
  );
}
