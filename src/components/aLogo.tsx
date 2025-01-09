import { component$ } from "@builder.io/qwik";
import logo from "../assets/logo.png";

export default component$(() => (
  <>
    <img src={logo} width={28} height={28} alt="logo" />{" "}
    <div class="text-xl font-semibold leading-[28px]">Class Widgets</div>
  </>
));
