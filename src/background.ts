import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener((_) => {
    // Get the .env from vite
    import.meta.env.VITE_BOT_API_TOKEN;
    import.meta.env.VITE_CHANNEL_ID;
});
