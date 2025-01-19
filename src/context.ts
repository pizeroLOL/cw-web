import { createContextId, type Signal } from "@builder.io/qwik";

export const ShowedAsideContext =
  createContextId<Signal<boolean>>("showedAside");
