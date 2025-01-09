import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export interface AsideAProps {
  name: string;
  href: string;
  type: "AsideA";
}

const AsideA = component$<AsideAProps>((info) => {
  const location = useLocation();
  const toPathname = info.href;
  const locationPathname = location.url.pathname;

  const startSlashPosition =
    toPathname !== '/' && toPathname.startsWith('/')
      ? toPathname.length - 1
      : toPathname.length;
  const endSlashPosition =
    toPathname !== '/' && toPathname.endsWith('/')
      ? toPathname.length - 1
      : toPathname.length;
  const isActive =
    locationPathname === toPathname ||
    (locationPathname.endsWith(toPathname) &&
      (locationPathname.charAt(endSlashPosition) === '/' ||
        locationPathname.charAt(startSlashPosition) === '/'));
  return (
    <Link href={info.href} class="rounded-lg px-2 hover:bg-sky-200 block">{info.name}</Link>
  );
});

export default AsideA;
