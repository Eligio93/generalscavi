import { createClient } from "@/prismicio";
import Wrapper from "../Wrapper";
import { PrismicImage } from "@prismicio/react";
import { asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { Mail, Phone } from "lucide-react";
import { socialIcons } from "@/lib/icons";

export default async function Footer() {
  const client = createClient();
  const footer = await client.getSingle("footer");
  const bgImageUrl = footer.data.backgroundimage.url;
  return (
    <>
      <div
        className="relative min-h-[250px] z-50 bg-foreground/90 bg-blend-multiply bg-cover bg-center "
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      >
        <Wrapper>
          <div className="flex flex-col md:flex-row gap-10  text-white">
            <div className="flex flex-col gap-3 md:max-w-[200px] lg:max-w-[350px]">
              <PrismicImage
                field={footer.data.logo}
                className="max-h-20 w-auto object-contain "
              />
              <p className="text-sm text-center">
                {footer.data.companydescription}
              </p>
            </div>
            <div className="flex flex-wrap md:justify-evenly gap-10  w-full">
              <div className="flex flex-col gap-2">
                <span className="font-michroma">Navigazione</span>
                {footer.data.navigazione.map((navigazioneItem) => (
                  <PrismicNextLink
                    key={navigazioneItem.key}
                    field={navigazioneItem}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="font-michroma">Contatti</span>
                {footer.data.contatti[0]?.mail && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${footer.data.contatti[0]?.mail}`}>
                      {footer.data.contatti[0]?.mail}
                    </a>
                  </div>
                )}
                {footer.data.contatti[0]?.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <a href={`mailto:${footer.data.contatti[0]?.phone}`}>
                      {footer.data.contatti[0]?.phone}
                    </a>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="font-michroma">Seguici</span>
                <div className="flex gap-3">
                  {footer.data.social.map((social) => {
                    const Icon =
                      socialIcons[social.text as keyof typeof socialIcons];
                    return (
                      <a
                        key={social.key}
                        href={asLink(social) ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Icon && <Icon className="w-6 h-6" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
