import { Slot, component$ } from "@builder.io/qwik";
import panelRightExpand from "@fluentui/svg-icons/icons/panel_right_expand_20_regular.svg";
import ALogo from "../aLogo";

export interface AsideProps {
  isShowAside: boolean;
  onClickCloseButton$: () => {};
}

export default component$<AsideProps>((input) => (
  <aside
    class="fixed flex h-dvh w-80 flex-col gap-1 bg-gray-200 px-2"
    style={{ left: input.isShowAside ? "0" : "-80rem" }}
  >
    <section class="flex h-12 items-center gap-4 mb-4 px-2">
      <button onClick$={input.onClickCloseButton$}>
        <img src={panelRightExpand} width={20} height={20} alt="展开菜单" />
      </button>
      <a href="/" class="flex gap-2">
        <ALogo />
      </a>
    </section>
    <Slot></Slot>
  </aside>
));
