import {
  $,
  component$,
  type JSXOutput,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import DOMPurify from "dompurify";
import { marked } from "marked";
import ClientLoader from "~/components/ClientLoader";
import { ShowedAsideContext } from "~/context";

interface ReleaseItem {
  html_url: string;
  author: { login: string; html_url: string; avatar_url: string };
  name: string;
  prerelease: boolean;
  created_at: string;
  assets: { name: string; browser_download_url: string }[];
  body: string;
  discussion_url: string;
}

const formatDom = (i: string) => DOMPurify.sanitize(marked.parse(i) as string);
const ReleaseBlock = component$<{ it: ReleaseItem }>(({ it }) => (
  <section class="flex flex-col gap-4 rounded-lg border-2 border-gray-500 bg-gray-50 p-4 dark:bg-gray-950">
    <h1 class="text-3xl">{it.name}</h1>
    <div class="flex flex-wrap items-center gap-4 align-middle text-gray-500">
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
      <time dateTime={it.created_at}>{new Date(it.created_at).toString()}</time>
    </div>
    <div
      class="markdown word-break overflow-auto border-y-2 border-gray-500 py-2"
      dangerouslySetInnerHTML={formatDom(it.body)}
    ></div>
    <div class="flex gap-4">
      {it.assets.map((assets, index) => (
        <a
          href={assets.browser_download_url}
          key={index}
          class="block rounded-md bg-gray-200 p-2 hover:bg-cyan-200 hover:text-cyan-800 dark:bg-gray-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-200"
        >
          {assets.name}
        </a>
      ))}
    </div>
    <div class="flex flex-wrap gap-4 *:hover:text-cyan-500">
      <a href={it.html_url}>Github</a>
      <a href={it.discussion_url}>讨论</a>
    </div>
  </section>
));

async function getRelease(isRelease: boolean) {
  const srcUrl =
    "https://api.github.com/repos/class-widgets/class-widgets/releases";
  const src = await fetch(srcUrl);
  const input = await src.json();
  const strunctInput = input as ReleaseItem[];
  return strunctInput.filter(
    (it) => it.prerelease == !isRelease,
  ) as ReleaseItem[];
}

// TODO：根据工件自动生成链接
const genAssetLinks = (runId: number) =>
  [
    "ubuntu-20.04-x64",
    "debian-10-x64",
    "macos-13-bundle",
    "macos-13-x64",
    "windows-latest-x64",
    "windows-latest-x86",
  ].map((it, index) => (
    <a
      key={index}
      href={`https://nightly.link/Class-Widgets/Class-Widgets/actions/runs/${runId}/${it}.zip`}
      class="block rounded-md bg-gray-200 p-2 hover:bg-cyan-200 hover:text-cyan-800 dark:bg-gray-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-200"
    >
      {it}
    </a>
  ));

interface WorkflowRunsItem {
  id: number;
  name: string;
  display_title: string;
  status: string;
  actor: { login: string; html_url: string; avatar_url: string };
  head_commit: { id: string };
}

const NightlyBlock = component$(({ it }: { it: WorkflowRunsItem }) => (
  <section class="flex flex-col gap-4 rounded-lg border-2 border-gray-500 bg-gray-50 p-4 dark:bg-gray-950">
    <h1 class="text-3xl">{it.display_title}</h1>
    <div class="flex flex-wrap items-center gap-4 align-middle text-gray-500">
      <a
        href={it.actor.html_url}
        class="flex items-center gap-2 align-middle hover:text-cyan-500"
      >
        <img
          src={it.actor.avatar_url}
          alt={`${it.actor.login} 的头像`}
          width={32}
          height={32}
          class="rounded-full"
        />
        <span>{it.actor.login}</span>
      </a>
      <span>{it.head_commit.id}</span>
    </div>
    <div class="flex flex-wrap gap-4">{genAssetLinks(it.id)}</div>
  </section>
));

async function genNightly() {
  const srcUrl =
    "https://api.github.com/repos/class-widgets/class-widgets/actions/runs?branch=main&per_page=100";
  const src = await fetch(srcUrl);
  const rawInput = await src.json();
  const input = rawInput as {
    workflow_runs: WorkflowRunsItem[];
  };

  return input.workflow_runs.filter(
    (it) => it.name == "构建" && it.status == "completed",
  );
}
export default component$(() => {
  /// - 0：稳定版
  /// - 1：测试版
  /// - 2：夜间版
  const selected = useSignal(0);
  const loader = $((cleanup: (arg0: () => void) => void) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    // console.log("hello");
    if (selected.value == 2) {
      return genNightly().then((it) =>
        it.map((it, id) => <NightlyBlock it={it} key={id} />),
      );
    }
    return getRelease(selected.value == 0).then((i) =>
      i.map((it, id) => <ReleaseBlock it={it} key={id}></ReleaseBlock>),
    );
  });

  // FIXME: 搞到一个 loader 里
  const data =
    selected.value == 0 ? (
      <ClientLoader
        loader$={loader}
        loading={
          <main class="mx-auto flex min-h-80 w-fit items-center gap-4 py-4">
            <div class="loader"></div>
            <div class="text-gray-500">加载中</div>
          </main>
        }
        ok$={(o: JSXOutput) => <main class="m-4 flex flex-col gap-4">{o}</main>}
        err$={(e) => <main class="mx-auto w-fit py-4">错误：{`${e}`}</main>}
      ></ClientLoader>
    ) : selected.value == 1 ? (
      <ClientLoader
        loader$={loader}
        loading={
          <main class="mx-auto flex min-h-80 w-fit items-center gap-4 py-4">
            <div class="loader"></div>
            <div class="text-gray-500">加载中</div>
          </main>
        }
        ok$={(o: JSXOutput) => <main class="m-4 flex flex-col gap-4">{o}</main>}
        err$={(e) => <main class="mx-auto w-fit py-4">错误：{`${e}`}</main>}
      ></ClientLoader>
    ) : (
      <ClientLoader
        loader$={loader}
        loading={
          <main class="mx-auto flex min-h-80 w-fit items-center gap-4 py-4">
            <div class="loader"></div>
            <div class="text-gray-500">加载中</div>
          </main>
        }
        ok$={(o: JSXOutput) => <main class="m-4 flex flex-col gap-4">{o}</main>}
        err$={(e) => <main class="mx-auto w-fit py-4">错误：{`${e}`}</main>}
      ></ClientLoader>
    );
  const showedAside = useContext(ShowedAsideContext);
  return (
    <>
      <header
        class="sticky top-12 flex w-full border-b-2 bg-white px-2 transition-[top] ease-in-out md:top-0 md:aria-expanded:top-12 dark:bg-black"
        aria-expanded={!showedAside.value}
      >
        <button
          class="select-item px-2 pb-1 pt-2"
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
        <button
          class="select-item px-2 pb-1 pt-2"
          aria-selected={selected.value == 2}
          onClick$={() => (selected.value = 2)}
        >
          夜间版
        </button>
      </header>
      {data}
    </>
  );
});
