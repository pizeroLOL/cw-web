import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface AsideAProps {
  name: string;
  href: string;
  type: "AsideA";
}

const AsideA = component$<AsideAProps>((info) => {
  // const location = useLocation();
  // const toPathname = info.href;
  // const locationPathname = location.url.pathname;

  // const startSlashPosition =
  //   toPathname !== "/" && toPathname.startsWith("/")
  //     ? toPathname.length - 1
  //     : toPathname.length;
  // const endSlashPosition =
  //   toPathname !== "/" && toPathname.endsWith("/")
  //     ? toPathname.length - 1
  //     : toPathname.length;
  // const isActive =
  //   locationPathname === toPathname ||
  //   (locationPathname.endsWith(toPathname) &&
  //     (locationPathname.charAt(endSlashPosition) === "/" ||
  //       locationPathname.charAt(startSlashPosition) === "/"));
  return (
    <Link
      href={info.href}
      class="block rounded-lg p-2 hover:bg-cyan-200 dark:hover:bg-cyan-800"
    >
      {info.name}
    </Link>
  );
});

export default AsideA;
