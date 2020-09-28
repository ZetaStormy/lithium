//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

exports.run = (client, message) => {
    //Check if the message author is a bot.
    if (message.author.bot) return;   

    //Store the guild identification.
    var guildIdentification = config.mainGuildID;
    //The channel where we are going to log all the deleted messages.
    var delLogChannel = config.deleteLogChannel;
    //Check if the message content is bigger than 1900 characters.
    if (message.content.length > 1900) {
        var deletedContent = "*Contenido comprimido debido a la longitud.* - " + message.content.substr(0,1900); //Cut and paste the first 1900 characters.
    } else {
        var deletedContent = message.content; //Print the message content normally
    }

    //Create the embed with the information.
    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle(`Lithium - Mensaje borrado`)
    .setDescription(`**Nombre:** ${message.member.displayName}\n**Tag:** ${message.author.tag}\n**Canal:** ${message.channel.name}\n**Contenido:** ${deletedContent}`);

    //Check if the guild has the delete log channel.
    client.guilds.cache.find(x => x.id === guildIdentification).channels.cache.find(x => x.id === delLogChannel).send({embed}).catch(console.error);
};