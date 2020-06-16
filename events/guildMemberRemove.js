const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, member) => {
    var leaveChannelID = config.quitLogChannel;

    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle(`Literium - Salida`)    
    .setDescription(`
  **Nombre:** ${member.displayName}
  **Tag:** ${member.user.tag}
  **ID:** ${member.user.id}
  **Creación:** ${member.user.createdAt}
`);
    client.channels.cache.find(x => x.id === leaveChannelID).send({embed}).catch(console.error);
  
  }