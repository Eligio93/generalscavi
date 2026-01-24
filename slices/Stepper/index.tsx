import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";
import SectionHeader from "@/components/SectionHeader";
import Wrapper from "@/components/Wrapper";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * Props for `Stepper`.
 */
export type StepperProps = SliceComponentProps<Content.StepperSlice>;

/**
 * Component for "Stepper" Slices.
 */
const Stepper: FC<StepperProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper>
        <SectionHeader
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
        />
        {slice.primary.step.length > 0 && (
          <ol className="flex flex-col gap-10">
            {slice.primary.step.map((step) => (
              <li key={step.title}>
                <div className="flex flex-col gap-5 md:flex-row">
                  <PrismicImage
                    field={step.image}
                    className="h-[200px] xl:h-[250px] w-full md:max-w-[300px] xl:max-w-[400px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="uppercase font-michroma text-primary font-extrabold">
                      {step.date} - {step.title}
                    </p>

                    <RichTextRenderer richText={step.description} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Wrapper>
    </section>
  );
};

export default Stepper;
