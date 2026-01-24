import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  MobileNavProvider,
  MobileMenuTrigger,
  MobileMenuDrawer,
} from "./MobileNav";

export default async function Header() {
  const client = createClient();
  const header = await client.getSingle("header");

  return (
    <MobileNavProvider>
      <div className="h-15 lg:h-20 z-50 mt-2 fixed top-0 left-0 right-0 px-1">
        <div className="flex items-center justify-between px-5 py-2 h-full bg-background/50 rounded-lg backdrop-blur-md max-w-7xl mx-auto">
          <PrismicNextImage
            field={header.data.logo}
            className="h-full w-auto"
          />
          <nav>
            <ul className="lg:flex gap-5 hidden">
              {header.data.menuitems.map((item) => (
                <li key={item.key}>
                  <PrismicNextLink
                    field={item}
                    className="font-michroma hover:text-primary transition-all duration-100"
                  />
                </li>
              ))}
            </ul>
          </nav>
          <MobileMenuTrigger />
        </div>
      </div>
      <MobileMenuDrawer menuItems={[...header.data.menuitems]} />
    </MobileNavProvider>
  );
}
