const ms = require('ms');
exports.run = async (client, msg, args, content, cooldown, command, Discord, config, request) => {
  let adminRole = msg.guild.roles.cache.find(x => x.name === '⁃ Administración');
  if (!msg.channel.name.startsWith(`💻┋comandos`)) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usa comandos en los canales correspondientes.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
           }
  if (!adminRole) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle('Error')
    .setDescription('No tienes permisos para ejecutar este comando.')
  }
  
  var embed = new Discord.MessageEmbed()
  .setColor('#8b0000')
  .setTimestamp()
  .setFooter(`Denegado a ${msg.member.displayName}`)
  .setTitle('Error')
  .setDescription('Comando no disponible temporalmente.')
  
  msg.channel.send({embed}).catch(console.error);
  return;
}

exports.help = {
    name: "Giveaway",
    category: "Administración",
    description: "Crea un sorteo de cualquier cosa.",
    usage: "Giveaway [Objeto] [Motivo] [Tiempo]",
    example: ""
};