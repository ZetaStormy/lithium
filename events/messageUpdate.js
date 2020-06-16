const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, oldMessage, newMessage) => {
    if (newMessage.author.bot) return;
    
    var guild = config.mainguildID;
    var editLogChannel = config.editLogChannel;
    
    if (oldMessage.content.length > 950) {var oldText = "*Contenido comprimido debido a la longitud.* - " + oldMessage.content.substr(0,950)} else {var oldText = oldMessage.content};
    if (newMessage.content.length > 950) {var newText = "*Contenido comprimido debido a la longitud.* - " + newMessage.content.substr(0,950)} else {var newText = newMessage.content};
    var embed = new Discord.MessageEmbed()
        .setColor('#ff8c00')
        .setTimestamp()
        .setTitle(`Literium - Mensaje editado`)
        .setDescription(`**Editado por:** ${newMessage.author.tag}\n**Canal:** ${newMessage.channel}`)
        .addField("Mensaje antiguo", `${oldText}`)
        .addField("Mensaje nuevo", `${newText}`);

    client.guilds.cache.find(x => x.id === guild).channels.cache.find(x => x.id === editLogChannel).send({embed}).catch(console.error);

};