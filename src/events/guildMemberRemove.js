//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

//Export the client (Created with Discord.Client() constructor) and the member (Object of GuildMember).
exports.run = (client, member) => {
  //Store the ID of this configuration channel.
  var leaveChannel = config.quitLogChannel;

  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle(`Lithium - Salida`)    
  .setDescription(`
¡Alguien ha salido del servidor de Discord!
\`\`\`yaml
Informacion:
  Nombre: ${member.displayName}
  Tag: ${member.user.tag}
  ID: ${member.user.id}
  Creacion: ${member.user.createdAt}
\`\`\`
  `);

  //Send to the leave log channel.
  client.channels.cache.find(x => x.id === leaveChannel).send({embed}).catch(console.error);  
}