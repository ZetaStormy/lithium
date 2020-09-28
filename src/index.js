//Discord requires the discord.js package.
const Discord = require("discord.js");
//Create the client using Discord.Client() constructor.
const client = new Discord.Client();
//fs requires fs package.
const fs = require("fs");
//request requires axios package.
const request = require("axios");

//config requires the config file.
const config = require("./config.json");
//The prefix is in the config file.
const prefix = config.prefix;

//Read the directory events.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err); //Log if an error happens.
  //Go for each file that we found before.
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`); //Create the event function that requires the event files.
    let eventName = file.split(".")[0]; //Create the event name and split the dot from the name.
    client.on(eventName, (...args) => eventFunction.run(client, ...args)); //When an event happens, use the eventFunction.
  });
});

//Log everything.
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
//TODO: Change this to the event file.
client.on('guildMemberAdd', (guildMember) => {
   guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name === "⁃ Jugador"));
});

//On the message event...
client.on("message", msg => {
  //Check if the author is a bot.
  if (msg.author.bot) return;
  //Check if the prefix is inside a string or not.
  if (msg.content.indexOf(config.prefix) !== 0) return;
  
  //Define args that is the message content without the prefix, without final spaces and split everytime it has a space.
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  //Command is just the command, but in lower case.
  const command = args.shift().toLowerCase();
  //Get the content of the message using the sub string method.
  const content = msg.content.substr(prefix.length + command.length,msg.content.length - prefix.length - command.length);
  
  try {
    let commandFile = require(`./commands/${command}.js`); //Create a variable for the command files.
    commandFile.run(client, msg, args, content, command, Discord, config, request); //Export all that variables to the command file.
  } catch (err) { //catch if there is an error.
    return;
  }

});

//Create a variable with the secret token file.
var secret = require("./secret.json");
//Login with that token.
client.login(secret.token);