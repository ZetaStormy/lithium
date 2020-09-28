//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

exports.run = (client, member) => {
  //Store the ID of this configuration channel.
  var leaveChannel = config.quitLogChannel;

  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle(`Lithium - Salida`)    
  .setDescription(`
**Nombre:** ${member.displayName}
**Tag:** ${member.user.tag}
**ID:** ${member.user.id}
**Creación:** ${member.user.createdAt}
  `);

  //Send to the leave log channel.
  client.channels.cache.find(x => x.id === leaveChannel).send({embed}).catch(console.error);  
}