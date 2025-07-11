import { component$ } from "@qwik.dev/core";
import type { IconProps } from "./iconProps";

export default component$<IconProps>(({ width, height }) => (
  <svg
    width={width ?? 20}
    height={height ?? 20}
    viewBox="0 0 20 20"
    class="stroke-black dark:stroke-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m13.18 10.5-1 .87a.5.5 0 0 0 .66.76l2-1.75a.5.5 0 0 0 0-.76l-2-1.75a.5.5 0 1 0-.66.76l1 .87H9.5a.5.5 0 0 0 0 1h3.68ZM2 14c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8Zm2 1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3v10H4Zm4 0V5h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8Z" />
  </svg>
));
