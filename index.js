const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const request = require("axios");

const config = require("./config.json");
const prefix = config.prefix;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.on('guildMemberAdd', (guildMember) => {
   guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name === "⁃ Jugador"));
 });
client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(config.prefix) !== 0) return;
  
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const content = msg.content.substr(prefix.length + command.length,msg.content.length - prefix.length - command.length);
  
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, content, command, Discord, config, request);
  } catch (err) {
    return;
  }

});

var secret = require("./secret.json");
client.login(secret.token);