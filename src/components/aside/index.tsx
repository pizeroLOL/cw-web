import { Slot, component$ } from "@builder.io/qwik";
import ALogo from "../aLogo";
import PanelRightExpand from "../fluentIcon/PanelRightExpand";

export interface AsideProps {
  isShowAside: boolean;
  onClickCloseButton$: () => {};
}

export default component$<AsideProps>((input) => (
  <aside
    class="fixed z-50 flex h-dvh w-80 flex-col gap-1 bg-gray-100 px-2 transition-[left] dark:bg-gray-900 "
    style={{ left: input.isShowAside ? "0" : "-80rem" }}
  >
    <section class="mb-8 flex h-12 items-center gap-8 px-2">
      <button onClick$={input.onClickCloseButton$}>
        <PanelRightExpand />
      </button>
      <a href="/" class="flex gap-2">
        <ALogo />
      </a>
    </section>
    <section class="flex flex-col gap-2">
      <Slot></Slot>
    </section>
  </aside>
));
