//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

exports.run = (client, oldMessage, newMessage) => {
    //Check if the author is a bot.
    if (newMessage.author.bot) return;
    
    //Store the guild ID.
    const guildIdentification = config.mainGuildIdentificator;
    //Store the edit log channel.
    const editLogChannel = config.editLogChannel;
    
    //Check if the old message content length is more than 950.
    const oldContent = oldMessage.content.length > 950 ? "*Contenido comprimido debido a la longitud.* - " + oldMessage.content.substr(0,950) : oldMessage.content;
    //Check if the new message content length is more than 950.
    const newContent = newMessage.content.length > 950 ? "*Contenido comprimido debido a la longitud.* - " + newMessage.content.substr(0,950) : newMessage.content;

    //Create the embed with information.
    const messageUpdateMessage = new Discord.MessageEmbed()
    .setColor("#ff8c00")
    .setTimestamp()
    .setTitle("Lithium - Mensaje editado")
    .setDescription(`**Editado por:** ${newMessage.author.tag}\n**Canal:** ${newMessage.channel}`)
    .addField("Mensaje antiguo", `${oldContent}`)
    .addField("Mensaje nuevo", `${newContent}`);

    //Check if the guild has the edit log channel.
    client.guilds.cache.find((x) => x.id === guildIdentification).channels.cache.find((x) => x.id === editLogChannel).send({embed: messageUpdateMessage});
}