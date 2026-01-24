import { KeyTextField } from "@prismicio/client";

export default function PageSectionSubtitle({
  subtitle,
  bgColor,
  className,
}: {
  subtitle: KeyTextField;
  bgColor: string;
  className?: string;
}) {
  return (
    <h3
      className={`text-xl xl:text-3xl font-bold ${bgColor && bgColor === "dark" ? "text-white" : "text-foreground"} font-michroma lg:text-2xl ${className}`}
    >
      {subtitle}
    </h3>
  );
}
