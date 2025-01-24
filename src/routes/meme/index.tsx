import { component$ } from "@builder.io/qwik";
import rawData from "./data.json";
import type { BoxProps } from "~/components/meme/box";
import Box from "~/components/meme/box";

export default component$(() => {
  const store = rawData as BoxProps[];
  return (
    <main>
      <section class="p-16">
        <h1 class="text-center text-3xl">梗图中心</h1>
      </section>
      <section class="columns-3xs p-4">
        {store.map((it, id) => (
          <Box it={it} key={id}></Box>
        ))}
      </section>
    </main>
  );
});
