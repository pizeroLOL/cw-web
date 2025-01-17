import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";

async function genRelease(isRelease: boolean) {
  const srcUrl =
    "https://api.github.com/repos/class-widgets/class-widgets/releases";
  const src = await fetch(srcUrl);
  const input = await src.json();
  const strunctInput = input as {
    html_url: string;
    author: { login: string; html_url: string; avatar_url: string };
    name: string;
    prerelease: boolean;
    created_at: string;
    assets: { name: string; browser_download_url: string }[];
    body: string;
    discussion_url: string;
  }[];
  return strunctInput
    .filter((it) => it.prerelease == !isRelease)
    .map((it, index) => (
      <section
        key={index}
        class="flex flex-col gap-4 rounded-lg border-2 border-gray-500 p-4 "
      >
        <h2 class="text-3xl">{it.name}</h2>
        <div class="flex items-center gap-4 align-middle text-gray-500">
          <a
            href={it.author.html_url}
            class="flex items-center gap-2 align-middle hover:text-cyan-500"
          >
            <img
              src={it.author.avatar_url}
              alt={`${it.author.login} 的头像`}
              width={32}
              height={32}
              class="rounded-full"
            />
            <span>{it.author.login}</span>
          </a>
          <time dateTime={it.created_at}>
            {new Date(it.created_at).toString()}
          </time>
        </div>
        <pre class="border-y-2 border-gray-500 py-2">
          <code>{it.body}</code>
        </pre>
        <div class="flex gap-4">
          {it.assets.map((assets, index) => (
            <a
              href={assets.browser_download_url}
              key={index}
              class="block rounded-md bg-gray-200 p-2 hover:bg-cyan-200 hover:text-cyan-800 dark:bg-gray-800 hover:dark:bg-cyan-800 hover:dark:text-cyan-200"
            >
              {assets.name}
            </a>
          ))}
        </div>
        <div class="flex gap-4 hover:*:text-cyan-500">
          <a href={it.html_url}>Github</a>
          <a href={it.discussion_url}>讨论</a>
        </div>
      </section>
    ));
}

export default component$(() => {
  /// - 0：稳定版
  /// - 1：测试版
  /// - 2：夜间版
  const selected = useSignal(0);
  // const isLoaded = useSignal(false);
  const data = useResource$(({ track, cleanup }) => {
    track(() => selected.value);
    const controller = new AbortController();
    cleanup(() => controller.abort());
    // if (selected.value == 2) {
    //   return fetch("https://api.github.com/repos/class-widgets/class-widgets/actions/runs?branch=main&per_page=100");
    // }
    return genRelease(selected.value == 0);
  });

  return (
    <>
      <header class="sticky top-12 flex w-full border-b-2 bg-white px-2 dark:bg-black">
        <button
          class="select-item px-2 pb-1 pt-2 "
          aria-selected={selected.value == 0}
          onClick$={() => (selected.value = 0)}
        >
          稳定版
        </button>
        <button
          class="select-item px-2 pb-1 pt-2"
          aria-selected={selected.value == 1}
          onClick$={() => (selected.value = 1)}
        >
          测试版
        </button>
        {/* <button
          class="select-item px-2 pb-1 pt-2"
          aria-selected={selected.value == 2}
          onClick$={() => (selected.value = 2)}
        >
          夜间版
        </button> */}
      </header>
      <Resource
        value={data}
        onPending={() => (
          <main class="mx-auto flex min-h-80 w-fit items-center gap-4 py-4">
            <div class="loader"></div>
            <div class=" text-gray-500">加载中</div>
          </main>
        )}
        onResolved={(i) => <main class="m-4 flex flex-col gap-4">{i}</main>}
        onRejected={(e) => (
          <main class="mx-auto w-fit py-4">错误：{`${e}`}</main>
        )}
      ></Resource>
    </>
  );
});
