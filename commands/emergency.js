exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
  const admin = msg.member.roles.cache.find(x => x.name === "⁃ Administración");
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
  msg.delete();    
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle('Error')
  .setThumbnail('https://i.imgur.com/OO3sCse.jpg')
  .setFooter(`Enviado por ${msg.member.displayName}`,`${msg.author.avatarURL()}`)
  .setDescription(`No hay mensaje preestablecido.`);
        
  msg.channel.send({embed}).catch(console.error);
};     

exports.help = {
    name: "Emergency",
    category: "Administración",
    description: "Comando para anuncios preestablecidos.",
    usage: "Emergency",
    example: ""
};