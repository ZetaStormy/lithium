# Lithium

Repository of Lithium (Community branch), the assistant of LiteriumNT community discord server.
This discord bot has been created only for Literium Network, but you can use the code as you want. The only objective of this repository is to have a backup of this bot in case something happen.

### Features

  - Moderation commands (Mute, ban and kick).
  - Administration commands (Announce, user profile and many more).
  - Useful events actions (Give role on join, welcome message, ranks and more!)
  - SQLite storage (For levels of guilds).
  - It is open source, you can use this code wherever you want!
  
### To-Do

  - Do everything that the TODO comments say.
  - Code optimization for better performance.
  - Add more commands and economy system.
  - Add translations using a language system.
  - Introduce rank of the leaderboard command in the rank command.

## Installation

Lithium requires [Node.js](https://nodejs.org/) v12+ to run.

First you have to create a `secret.json` file inside `src` folder to save the token, like this:

```json
{
    "token": "Insert Token Here"
}
```

Then just install the dependencies and run the bot with this commands:

```sh
$ cd lithium/src/
$ npm install
$ node index.js
```

### NPM Packages

Lithium uses NPM packages to work properly:

* [discord.js](https://www.npmjs.com/package/discord.js) - A powerful library for interacting with the Discord API.
* [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) - The fastest and simplest library for SQLite3 in Node.js.
* [fs](https://www.npmjs.com/package/fs) - Easy to use file system for Node.js.
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and Node.js.
* [ms](https://www.npmjs.com/package/ms) - Easily convert various time formats to milliseconds.

## License

Lithium uses the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) (GNU General Public License v3.0) license, you can do everything that the license says.
