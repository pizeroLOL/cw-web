import { component$ } from "@builder.io/qwik";

export interface BoxProps {
  type: "img";
  title: string;
  time: string;
  data: string;
}

export default component$<{ it: BoxProps }>(({ it }) => (
  <section class="bg-gary-100 my-4 flex break-inside-avoid-column flex-col flex-nowrap gap-2 rounded-md pb-4 *:w-full first:mt-0 dark:bg-gray-900">
    {/*eslint-disable-next-line qwik/jsx-img*/}
    <img src={it.data} width={256} class="rounded-t-md" />
    <div class="px-4 text-xl">{it.title}</div>
    <div class="px-4 text-gray-500">{it.time}</div>
  </section>
));
