import { component$ } from "@builder.io/qwik";
import type { AsideAProps } from "./a";
import AsideA from "./a";
import menuSrc from "@fluentui/svg-icons/icons/chevron_down_16_filled.svg";

export interface AsideDetailProps {
  name: string;
  items: (AsideDetailProps | AsideAProps)[];
  type: "AsideDetail";
}

const AsideDetail = component$<AsideDetailProps>((input) => (
  <details>
    <summary class="flex list-none gap-2 rounded-lg p-2 hover:bg-cyan-200 hover:dark:bg-cyan-800">
      <img src={menuSrc} width={16} height={16} /> <span>{input.name}</span>
    </summary>
    <div class="ml-6">
      {input.items.map((input, key) => asideRender(input, key))}
    </div>
  </details>
));

export default AsideDetail;

export function asideRender(
  input: AsideDetailProps | AsideAProps,
  key?: number,
) {
  return input.type == "AsideA" ? (
    <AsideA
      href={input.href}
      name={input.name}
      type={"AsideA"}
      key={key ?? 0}
    ></AsideA>
  ) : (
    <AsideDetail
      name={input.name}
      items={input.items}
      type={"AsideDetail"}
      key={key ?? 0}
    ></AsideDetail>
  );
}
