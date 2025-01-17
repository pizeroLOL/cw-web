import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";

type Plugins = {
  [key: string]: {
    name: string;
    description: string;
    version: string;
    plugin_ver: number;
    author: string;
    url: string;
    branch: string;
    update_date: string;
    tag: string;
  };
};

async function fetchPlugins() {
  const srcUrl =
    "https://bgithub.xyz/Class-Widgets/plugin-plaza/raw/refs/heads/main/Plugins/plugin_list.json";
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

export default component$(() => {
  const searchText = useSignal("");
  const data = useResource$(({ track, cleanup }) => {
    track(() => searchText);
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return fetchPlugins();
  });
  const processData = $((plugins: Plugins) =>
    filterPlugins(plugins, searchText.value, []).map(([k, v]) => (
      <a
        href={v.url}
        key={k}
        class="flex flex-col gap-2 break-words rounded-xl border-2 border-gray-200 bg-gray-100 p-4 px-4 hover:bg-cyan-900 dark:border-gray-800 dark:bg-gray-900"
      >
        <h2 class="text-xl">{v.name}</h2>
        <div class="flex gap-4 text-gray-500">
          <div class="text-black dark:text-white">{v.author}</div>
          <div>{v.version}</div>
          <div>{v.update_date}</div>
        </div>
        <div class="text-gray-500">{v.description}</div>
      </a>
    )),
  );
  return (
    <main>
      <section class="flex h-64 flex-col items-center justify-center gap-4 bg-gray-900 p-4">
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
      <Resource
        value={data}
        onPending={() => (
          <section class="flex h-40 items-center justify-center gap-4">
            <div class="loader"></div>
            <div>加载中</div>
          </section>
        )}
        onResolved={(o) => (
          <section class="grid grid-cols-auto-300 gap-4 p-4">
            {processData(o)}
          </section>
        )}
        onRejected={(e) => (
          <section class="flex h-40 items-center justify-center">
            查找插件错误：{`${e}`}
          </section>
        )}
      ></Resource>
    </main>
  );
});
