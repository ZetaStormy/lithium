const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, message) => {
if (message.author.bot) return;   
    var guild = config.mainguildID;
    var delLogChannel = config.deleteLogChannel;
    if (message.content.length > 1900) {var text = "*Contenido comprimido debido a la longitud.* - " + message.content.substr(0,1900)} else {var text = message.content};
    var embed = new Discord.MessageEmbed()
        .setColor('#ff8c00')
        .setTimestamp()
        .setTitle(`Literium - Mensaje borrado`)
        .setDescription(`**Nombre:** ${message.member.displayName}\n**Tag:** ${message.author.tag}\n**Canal:** ${message.channel.name}\n**Contenido:** ${text}`);
    client.guilds.cache.find(x => x.id === guild).channels.cache.find(x => x.id === delLogChannel).send({embed}).catch(console.error);
};