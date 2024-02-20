# Quick Share

Quickly share a link to your telegram channel using a web-ext just with a single click!, mostly used for jobs on linkedin but can be used for something else.

## Requirements

- `API KEY` : used for using the Telegram API.

  If you want to replicate my extact setup, you need to create a bot using `BotFather`, get the `API Key` and add the bot to the channel you want to send messages to.
- `chat_id`: the target channel id.

  To get the `chat_id` I used this [bot](https://t.me/username_to_id_bot)

## Installation

The extension is meant for personal use only, but if you want to give it a shot, make sure you have `nodejs` installed and have a browser ofc (LOL).

1. Clone the repo
2. Go to the repo and `npm i`
3. Add your `API KEY` and `chat_id` to `.example.env` and move it `.env`.
3. Build the extension and load it to your favourite browser. 
