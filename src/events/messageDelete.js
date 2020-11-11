//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

exports.run = (client, message) => {
    //Check if the message author is a bot.
    if (message.author.bot) {
        return;
    }

    //Store the guild identification.
    const guildIdentification = config.mainGuildIdentificator;
    //The channel where we are going to log all the deleted messages.
    const delLogChannel = config.deleteLogChannel;

    //Check if the message content is bigger than 1900 characters.
    const deletedContent = message.content.length > 1900 ? "*Contenido comprimido debido a la longitud.* - " + message.content.substr(0,1900) : message.content;

    //Create the embed with the information.
    const messageDeletedMessage = new Discord.MessageEmbed()
    .setColor("#ff8c00")
    .setTimestamp()
    .setTitle("Lithium - Mensaje borrado")
    .setDescription(`**Nombre:** ${message.member.displayName}\n**Tag:** ${message.author.tag}\n**Canal:** ${message.channel.name}\n**Contenido:** ${deletedContent}`);

    //Check if the guild has the delete log channel.
    client.guilds.cache.find((x) => x.id === guildIdentification).channels.cache.find((x) => x.id === delLogChannel).send({embed: messageDeletedMessage});
};