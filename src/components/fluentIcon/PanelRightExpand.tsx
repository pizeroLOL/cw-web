import { component$ } from "@qwik.dev/core";
import type { IconProps } from "./iconProps";

export default component$<IconProps>(({ width, height }) => (
  <svg
    width={width ?? 20}
    height={height ?? 20}
    class="stroke-black dark:stroke-white"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m6.82 10.5 1 .87a.5.5 0 0 1-.66.76l-2-1.75a.5.5 0 0 1 0-.76l2-1.75a.5.5 0 0 1 .66.76l-1 .87h3.68a.5.5 0 0 1 0 1H6.82ZM18 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v8Zm-2 1a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3v10h3Zm-4 0V5H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8Z" />
  </svg>
));
