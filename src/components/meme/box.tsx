import { component$ } from "@qwik.dev/core";

export interface BoxProps {
  type: "img";
  title: string;
  time: string;
  data: string;
}

export default component$<{ it: BoxProps }>(({ it }) => (
  <section class="bg-f-light-neutral-background2 dark:bg-f-dark-neutral-background2 my-4 flex break-inside-avoid-column flex-col flex-nowrap gap-2 overflow-hidden rounded-md pb-4 first:mt-0">
    {/* eslint-disable-next-line qwik/jsx-img */}
    <img src={it.data} width={256} class="w-full" />
    <div class="flex flex-col gap-2 px-4">
      <div class="text-f-base500">{it.title}</div>
      <div class="font-f-semibold flex gap-2">
        <div>hello</div>
        <div class="text-f-light-neutral-foreground3 dark:text-f-dark-neutral-foreground3">
          {it.time}
        </div>
      </div>
    </div>
  </section>
));
