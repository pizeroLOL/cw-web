import { component$ } from "@qwik.dev/core";
import { Link, type DocumentHead } from "@qwik.dev/router";

export default component$(() => {
  return (
    <main class="flex min-h-[90dvh] pb-8">
      <section class="flex flex-col gap-4 self-end rounded-xl px-8">
        <div class="self">
          <p class="pb-2 text-xl font-semibold text-gray-300">使用</p>
          <h1 class="text-6xl lg:text-8xl">Class Widgets</h1>
          <div class="flex gap-2 pt-4 text-2xl">
            提醒老师同学
            <div class="h-8 overflow-hidden font-light">
              <div class="animate-index-cw-tip *:h-8">
                <div>课堂剩余时间</div>
                <div>复习剩余时间</div>
                <div>下课剩余时间</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 flex items-center gap-4">
          <Link
            href="/downloads"
            class="flex w-fit items-center justify-center gap-2 rounded-sm bg-cyan-600 px-3 py-1 text-white hover:bg-cyan-700 active:bg-cyan-800"
          >
            下载
            <svg
              class="block stroke-black dark:stroke-white"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 17a.5.5 0 0 1 .09 1H4.5a.5.5 0 0 1-.09-1H15.5ZM10 2a.5.5 0 0 1 .5.41V14.3l3.64-3.65a.5.5 0 0 1 .64-.06l.07.06c.17.17.2.44.06.63l-.06.07-4.5 4.5a.5.5 0 0 1-.25.14L10 16a.5.5 0 0 1-.4-.2l-4.46-4.45a.5.5 0 0 1 .64-.76l.07.06 3.65 3.64V2.5c0-.27.22-.5.5-.5Z" />
            </svg>
          </Link>
          <Link href="/docs"></Link>
          <a
            class="flex items-center rounded-full px-1 py-1 hover:bg-gray-200 active:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-gray-600"
            href="https://github.com/class-widgets/class-widgets"
          >
            <svg
              class="block h-5 w-5"
              viewBox="0 0 96 96"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                class="fill-black dark:fill-white"
              />
            </svg>
          </a>
        </div>
      </section>
      {/* <Link href='/docs'>文档</Link>
      <Link href='/plugins'>插件中心</Link> */}
    </main>
  );
});

export const head: DocumentHead = {
  title: "Class Widgets",
  meta: [
    {
      name: "unofficol class widgets",
      content:
        "class widgets's download link & plugings' link & class widgets meme",
    },
  ],
};
