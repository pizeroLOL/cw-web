import { component$, useSignal } from "@builder.io/qwik";

// const LoadingCircel = component$(() => <div></div>)

export default component$(() => {
  // const searchText = useSignal('');
  const isLoaded = useSignal(false);
  // const data = useSignal([]);
  // const tags = useSignal([]);
  // const showedData = useSignal([]);
  const Loader = !isLoaded ? null : <div class="loader"></div>;
  return (
    <>
      <section>
        {/* <input type="text" bind:value={searchText} placeholder="输入以搜索" /> */}
      </section>
      <section>
        <div class=""></div>
      </section>
      {Loader}
    </>
  );
});
