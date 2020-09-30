//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

exports.run = (client, oldMessage, newMessage) => {
    //Check if the author is a bot.
    if (newMessage.author.bot) return;
    
    //Store the guild ID.
    var guildIdentification = config.mainGuildID;
    //Store the edit log channel.
    var editLogChannel = config.editLogChannel;
    
    //Check if the old message content length is more than 950.
    if (oldMessage.content.length > 950) {
        var oldContent = "*Contenido comprimido debido a la longitud.* - " + oldMessage.content.substr(0,950); //Cut and paste 950 characters.
    } else {
        var oldContent = oldMessage.content; //Print the normal content.
    }

    //Chek if the new message content length is more than 950.
    if (newMessage.content.length > 950) {
        var newContent = "*Contenido comprimido debido a la longitud.* - " + newMessage.content.substr(0,950); //Cut and paste the characters.
    } else {
        var newContent = newMessage.content; //Show the normal content.
    }

    //Create the embed with information.
    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle(`Literium - Mensaje editado`)
    .setDescription(`**Editado por:** ${newMessage.author.tag}\n**Canal:** ${newMessage.channel}`)
    .addField("Mensaje antiguo", `${oldContent}`)
    .addField("Mensaje nuevo", `${newContent}`);

    //Check if the guild has the edit log channel.
    client.guilds.cache.find(x => x.id === guildIdentification).channels.cache.find(x => x.id === editLogChannel).send({embed}).catch(console.error);
}