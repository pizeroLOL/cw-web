import { createContextId, type Signal } from "@qwik.dev/core";

export const ShowedAsideContext =
  createContextId<Signal<boolean>>("showedAside");
