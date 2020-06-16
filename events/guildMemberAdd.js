const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, member) => {
  var joinChannelID = config.joinLogChannel;

  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle(`Literium - Entrada`)
  .setDescription(`
 **Nombre:** ${member.displayName}
 **Tag:** ${member.user.tag}
 **ID:** ${member.user.id}
 **Creación:** ${member.user.createdAt}
  `);
  client.channels.cache.find(x => x.id === joinChannelID).send({embed}).catch(console.error);

  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle('Bienvenid@')
  .setDescription('Te damos la más cordial bienvenida al discord, recuerda leer las normas. Para más información contacta a un Staff.');
  member.send({embed}).catch(console.error);
  
  } 