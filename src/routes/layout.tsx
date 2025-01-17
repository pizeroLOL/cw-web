import { component$, Slot, useSignal } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { asideRender, type AsideDetailProps } from "~/components/aside/detail";
import type { AsideAProps } from "~/components/aside/a";
import Aside from "~/components/aside";
import ALogo from "~/components/aLogo";
import PanelLeftExpand from "~/components/fluentIcon/PanelLeftExpand";

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
  const showAside = useSignal(false);
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
      <Aside
        isShowAside={showAside.value}
        onClickCloseButton$={() => (showAside.value = !showAside.value)}
      >
        {asideDom}
      </Aside>
      <header class="sticky top-0 h-12 bg-white dark:bg-black">
        <div class="flex h-12 items-center gap-8 px-4">
          <button onClick$={() => (showAside.value = !showAside.value)}>
            <PanelLeftExpand width={20} height={20} />
          </button>
          <a href="/" class="flex gap-2">
            <ALogo />
          </a>
        </div>
      </header>
      <Slot />
      <footer class=""> </footer>
    </>
  );
});
