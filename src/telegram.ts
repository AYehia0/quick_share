// a simple telegram handler to send the url to the channel
import { AxiosRequestConfig } from "axios";
import axios from "axios";

// get the bot api token from the environment
const BOT_API_TOKEN = import.meta.env.VITE_BOT_API_TOKEN as string;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID as string;

// Function to send the message to the telegram channel
// make sure that the bot has access to the channel
// https://core.telegram.org/bots/api#sendmessage
const sendMessage = async (url: string) => {
    try {
        const config: AxiosRequestConfig = {
            method: "POST",
            url: `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                chat_id: CHANNEL_ID,
                text: url,
            },
        };
        await axios(config);
    } catch (e) {
        console.error("Error sending message to the channel", e);
    }
};

export { sendMessage };
