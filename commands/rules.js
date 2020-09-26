exports.run = (_client, msg, _args, _content, _command, Discord) => {
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
Puedes leer el PDF de nuestras normas desde Google Drive haciendo [click aquí](https://bit.ly/3kGL3k2).
¡En caso de que tengas alguna duda sobre nuestras normas no dudes en consultar a un Staff!
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