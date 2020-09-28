//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

exports.run = (client, member) => {
  //Store the join log channel ID
  var joinChannel = config.joinLogChannel;

  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle(`Lithium - Entrada`)
  .setDescription(`
**Nombre:** ${member.displayName}
**Tag:** ${member.user.tag}
**ID:** ${member.user.id}
**Creación:** ${member.user.createdAt}
  `);

  //Send the message to the join log channel.
  client.channels.cache.find(x => x.id === joinChannel).send({embed}).catch(console.error);
} 