exports.run = (_client, msg, _args, _content, _command, Discord) => {
  //Check the channel were the author of message sent the command.
  if (!msg.channel.name.startsWith(`💻┋comandos`) && !msg.channel.name.startsWith(`💫┋off-topic`)) {
    //Create the embed message using MessageEmbed() constructor.
    var incorrectChannel = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Usa comandos en los canales correspondientes.');
    
    //Send the embed to the channel were the command was called.
    msg.channel.send({incorrectChannel}).catch(console.error);
    //The return to exit.
    return;
  }
  
  //Create the embed with the rules using MessageEmbed() constructor.
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle('Lithium - Información')
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`
Puedes leer el PDF de nuestras normas desde Google Drive haciendo [click aquí](https://bit.ly/3kGL3k2).
¡En caso de que tengas alguna duda sobre nuestras normas no dudes en consultar a un Staff!
  `);

  //Send the embed message.
  msg.channel.send({embed}).catch(console.error);
}     

//Add an entry for this command in -help.
exports.help = {
    name: "Rules",
    category: "Información",
    description: "Obtén las normas del servidor.",
    usage: "Rules",
    example: ""
};