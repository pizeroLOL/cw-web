import {
  component$,
  type JSXOutput,
  useSignal,
  type JSX,
  type QRL,
  useVisibleTask$,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

// 定义组件的 Props 类型
interface ClientJsonLoaderProps<T> {
  loader$: QRL<(cleanup: (fn: () => void) => void) => Promise<T>>; // 抽象加载函数
  loading: JSX.Element; // 必须提供的加载中的 JSX
  err$: QRL<(error: Error) => JSXOutput | JSXOutput[]>; // 必须提供的加载错误的 JSX
  ok$: QRL<(data: T) => JSXOutput | JSXOutput[]>; // 必须提供的渲染函数
}

export default component$(
  <T,>({ loader$: loader, loading, err$, ok$ }: ClientJsonLoaderProps<T>) => {
    // 使用 useSignal 来存储 JSON 数据和加载状态
    const jsonData = useSignal<T | null>(null);
    const isLoading = useSignal<boolean>(true);
    const error = useSignal<Error | null>(null);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      if (!isBrowser) return;

      const fetchData = async () => {
        // 加载数据
        const data = await loader(cleanup);
        jsonData.value = data;
      };

      fetchData()
        .catch((e) => (error.value = e as Error))
        .finally(() => (isLoading.value = false));
    });

    // 渲染逻辑
    if (isLoading.value) {
      return loading; // 显示加载中的 JSX
    }
    if (error.value) {
      return <>{err$(error.value)}</>; // 显示加载错误的 JSX
    }
    if (jsonData.value) {
      return <>{ok$(jsonData.value)}</>; // 显示加载成功后的渲染内容
    }
    return null; // 默认返回 null
  },
);
