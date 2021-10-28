# Lithium [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1dc1ab3f62b34a228eda5c964fcc4585)](https://www.codacy.com/gh/ZafireStudios/lithium/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ZafireNT/lithium&amp;utm_campaign=Badge_Grade)

This project has been abandoned, as I have nearly zero knowledge about JavaScript and I just wrote this bot by taking parts from other bots a long time ago. If someday I learn JavaScript (currently I only know Java properly), I will rewrite this bot in a proper way.

Repository of Lithium, the assistant of ZafireNT discord server. 
This discord bot has been created only for Zafire Network, but you can use the code as you want. The only objective of this repository is to have a backup of this bot in case something happens and to make things easier for programming begginers.

## Features

- Moderation commands (Mute, ban and kick).
- Administration commands (Announce, user profile and many more).
- Useful events actions (Give role on join, welcome message, ranks and more!)
- Change your username color with the color command!
- SQLite storage (For levels of guilds).
- It is open source, you can use this code wherever you want!
  
## Installation

Lithium requires [Node.js](https://nodejs.org/) v12+ to run.

First you have to introduce your token inside `index.js` that is inside `src`, like this:

```javascript
client.login("YOUR_TOKEN_HERE");
```

Then just install the dependencies and run the bot with this commands:

```sh
$ cd lithium/src/
Goes to the directory of the source.
$ npm install
Install the dependencies in package.json.
$ node index.js
Starts the index of the bot.
```

### NPM Packages

Lithium uses NPM packages to work properly:

- [discord.js](https://www.npmjs.com/package/discord.js) - A powerful library for interacting with the Discord API.
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) - The fastest and simplest library for SQLite3 in Node.js.
- [fs](https://www.npmjs.com/package/fs) - Easy to use file system for Node.js.
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and Node.js.
- [ms](https://www.npmjs.com/package/ms) - Easily convert various time formats to milliseconds.

## License

Lithium is licensed under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) (GNU General Public License v3.0) license.
