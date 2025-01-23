import {
  $,
  component$,
  // Resource,
  useSignal,
} from "@builder.io/qwik";
import ClientLoader from "~/components/ClientLoader";

interface PluginItem {
  name: string;
  description: string;
  version: string;
  plugin_ver: number;
  author: string;
  url: string;
  branch: string;
  update_date: string;
  tag: string;
}

type Plugins = {
  [key: string]: PluginItem;
};

async function fetchPlugins() {
  const srcUrl =
    "https://raw.githubusercontent.com/Class-Widgets/plugin-plaza/refs/heads/main/Plugins/plugin_list.json";
  const src = await fetch(srcUrl);
  const rawOutput = await src.json();
  return rawOutput as Plugins;
}

function filterPlugins(plugins: Plugins, text: string, tags: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(plugins).filter(([_, v]) =>
    v.name.includes(text) && tags.length == 0
      ? true
      : v.tag
          .split("|")
          .map((it) => it.trim())
          .some((it) => tags.some((tag) => it == tag)),
  );
}

const formatPlugins = ([k, v]: [string, PluginItem]) => (
  <a
    href={v.url}
    key={k}
    class="flex flex-col gap-2 break-words rounded-xl border-4 border-gray-200 bg-gray-100 p-4 px-4 hover:border-cyan-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-cyan-900"
  >
    <h2 class="text-xl">{v.name}</h2>
    <div class="flex gap-4 text-gray-500">
      <div class="text-black dark:text-white">{v.author}</div>
      <div>{v.version}</div>
      <div>{v.update_date}</div>
    </div>
    <div class="text-gray-500">{v.description}</div>
  </a>
);

const loading = (
  <section class="flex h-40 items-center justify-center gap-4">
    <div class="loader"></div>
    <div>加载中</div>
  </section>
);

export default component$(() => {
  const searchText = useSignal("");
  const loader = $((cleanup: (arg0: () => void) => void) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return fetchPlugins();
  });
  const processData = $((plugins: Plugins) =>
    filterPlugins(plugins, searchText.value, []).map(formatPlugins),
  );
  const data = (
    <ClientLoader
      loader$={loader}
      loading={loading}
      ok$={(o: Plugins) => (
        <section class="grid grid-cols-auto-300 gap-4 p-4">
          {processData(o)}
        </section>
      )}
      err$={(e: Error) => (
        <section class="flex h-40 items-center justify-center">
          查找插件错误：{`${e}`}
        </section>
      )}
    />
  );
  return (
    <main>
      <section class="flex h-64 flex-col items-center justify-center gap-4 bg-gray-100 p-4 dark:bg-gray-900">
        <h1 class="text-3xl">插件广场</h1>
        {/* <div>
          <input
            type="text"
            onInput$={(e) =>
              searchText.value == (e.target as HTMLInputElement).value
            }
            placeholder="输入以搜索插件"
            class="rounded-xl p-2"
          />
        </div> */}
      </section>
      {data}
    </main>
  );
});
