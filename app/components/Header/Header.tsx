import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Wrapper from "../Wrapper";

export default async function Header() {
  const client = createClient();
  const header = await client.getSingle("header");
  console.log(header.data);

  return (
    <div className="border h-20 ">
      <Wrapper className="flex items-center justify-between p-2 h-full">
        <PrismicNextImage field={header.data.logo} className="h-full w-auto" />
        <nav>
          <ul className="flex gap-5">
            {header.data.menuitems.map((item) => (
              <li key={item.key}>
                <PrismicNextLink field={item} />
              </li>
            ))}
          </ul>
        </nav>
      </Wrapper>
    </div>
  );
}
