import { component$, Slot, useSignal } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import panelLeftExpand from "@fluentui/svg-icons/icons/panel_left_expand_20_regular.svg";
import {
  asideRender,
  type AsideDetailProps,
} from "~/components/aside/detail";
import type { AsideAProps } from "~/components/aside/a";
import Aside from "~/components/aside";
import ALogo from "~/components/aLogo";

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
  const asideLinkData: (AsideAProps | AsideDetailProps)[] = [
    {
      name: "使用文档",
      items: [{ name: "item", href: "/start/", type: "AsideA" }],
      type: "AsideDetail",
    },
    { name: "开发文档", items: [], type: "AsideDetail" },
    { name: "社区", items: [], type: "AsideDetail" },
  ];
  const asideDom = asideLinkData.map((i, k) => asideRender(i, k));
  return (
    <>
      <Aside
        isShowAside={showAside.value}
        onClickCloseButton$={() => (showAside.value = !showAside.value)}
      >
        {asideDom}{" "}
      </Aside>
      <header>
        <div class="flex h-12 items-center gap-4 px-4">
          <button onClick$={() => (showAside.value = !showAside.value)}>
            <img src={panelLeftExpand} width={20} height={20} alt="展开菜单" />
          </button>
          <a href="/" class="flex gap-2">
            <ALogo />
          </a>
        </div>
      </header>
      <main class="bg-pink-400">apee</main>
      <footer class="bg-blue-400">a</footer>
    </>
  );
});
