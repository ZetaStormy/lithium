exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
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
  
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle('Literium - Información')
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`
Lee nuestras normas con frecuencia para no perderte ninguna modificación.
**Enlace:**
**- https://bit.ly/3apryHt**
*(Nota: El enlace es para descarga directa, si no quieres descargar nada contacta a un Staff)*
`);
        
  msg.channel.send({embed}).catch(console.error);
};     

exports.help = {
    name: "Rules",
    category: "Información",
    description: "Obtén las normas del servidor.",
    usage: "Rules",
    example: ""
};