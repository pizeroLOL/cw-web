import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { asideRender, type AsideDetailProps } from "~/components/aside/detail";
import type { AsideAProps } from "~/components/aside/a";
import ALogo from "~/components/aLogo";
import PanelLeftExpand from "~/components/fluentIcon/PanelLeftExpand";
import PanelRightExpand from "~/components/fluentIcon/PanelRightExpand";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const asideLinkData: (AsideDetailProps | AsideAProps)[] = [
    {
      name: "使用文档",
      items: [
        {
          name: "item",
          href: "/start/",
          type: "AsideA",
        },
      ],
      type: "AsideDetail",
    },
    {
      name: "开发文档",
      items: [],
      type: "AsideDetail",
    },
    {
      name: "社区",
      items: [],
      type: "AsideDetail",
    },
    {
      name: "下载",
      href: "/downloads/",
      type: "AsideA",
    },
    {
      name: "插件中心",
      href: "/pp/",
      type: "AsideA",
    },
  ];
  const asideDom = asideLinkData.map((i, k) => asideRender(i, k));
  return (
    <>
      <input type="checkbox" class="peer/aside hidden" id="showAside" />
      <aside class="fixed -left-80 z-50 flex h-dvh w-80 flex-col gap-1 border-r-2 border-gray-400 dark:border-gray-600 bg-gray-100 px-2 transition-[left] peer-checked/aside:left-0 md:left-0 dark:bg-gray-900 ">
        <section class="mb-8 flex h-12 items-center gap-8 px-2">
          <label for="showAside md:hidden">
            <PanelRightExpand />
          </label>
          <a href="/" class="flex gap-2">
            <ALogo />
          </a>
        </section>
        <section class="flex flex-col gap-2">{asideDom}</section>
      </aside>
      <div class="ml-auto md:ml-80">
        <header class="sticky top-0 h-12 bg-white md:hidden dark:bg-black">
          <div class="flex h-12 items-center gap-8 px-4">
            <label for="showAside">
              <PanelLeftExpand width={20} height={20} />
            </label>
            <a href="/" class="flex gap-2">
              <ALogo />
            </a>
          </div>
        </header>
        <Slot />
        <footer class=""> </footer>
      </div>
    </>
  );
});
