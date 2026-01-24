import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function RichTextRenderer({
  richText,
  className,
}: {
  richText: RichTextField | null | undefined;
  className?: string;
}) {
  return (
    <PrismicRichText
      field={richText}
      components={{
        paragraph: ({ children }) => (
          <p className={`${className}`}>{children}</p>
        ),
        list: ({ children }) => (
          <ul className="pl-5 list-disc mt-2">{children}</ul>
        ),
        oList: ({ children }) => (
          <ol className="pl-5 list-decimal">{children}</ol>
        ),
        listItem: ({ children }) => <li className="pl-5">{children}</li>,
      }}
    />
  );
}
