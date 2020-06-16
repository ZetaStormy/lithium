exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
  const admin = msg.member.roles.cache.find(x => x.name === "⁃ Administración");
  const channel = msg.mentions.channels.first();
  if (!admin) {
      var embed = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle(`Error`)
      .setDescription('No tienes permisos para ejecutar ese comando.');
        
      msg.channel.send({embed}).catch(console.error);   
      return;
  }  
  if (!channel) {
      var embed = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle(`Error`)
      .setDescription('Ingresa el canal, el título y el mensaje.');
        
      msg.channel.send({embed}).catch(console.error)
      return; 
  }
  
  msg.delete();
  var sayMsg = args.splice(2, args.length - 1).join(" ");
  var sayTitle = args.splice(1, args.length - 1).join(" ");
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle(sayTitle)
  .setThumbnail('https://i.imgur.com/OO3sCse.jpg')
  .setFooter(`Enviado por ${msg.member.displayName}`,`${msg.author.avatarURL()}`)
  .setDescription(sayMsg);
        
  channel.send({embed}).catch(console.error);
};     

exports.help = {
    name: "Announce",
    category: "Administración",
    description: "Envia un anuncio al canal especificado.",
    usage: "Announce [Canal] [Título] [Mensaje]",
    example: ""
};