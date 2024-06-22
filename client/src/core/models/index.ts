import { atom } from "jotai";
import WebApp from "@twa-dev/sdk";
import { WebApp as WebAppTypes } from "@twa-dev/types";
import { TgButtons } from "@/lib/telegram";

export const $webApp = atom<WebAppTypes | null>(null);
export const $tgButtons = atom<TgButtons | null>(null);

export const $doLoadWebApp = atom(null, async (get, set) => {
  const webApp = get($webApp);
  if (!webApp) {
    if (typeof window !== "undefined" && WebApp) {
      set($webApp, WebApp);
      set($tgButtons, new TgButtons(WebApp));
    } else {
      set($webApp, null);
    }
  }
});
