exports.run = (_client, msg, args, _content, _command, Discord, config) => { 
  let suggestion = args.slice(0).join(' ');
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
  if(!suggestion) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Menciona a una sugerencia.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
  }  
  
    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setFooter(`Solicitado por ${msg.member.displayName}`)  
    .setTitle(`Literium - Sugerencias`)
    .setDescription('Se ha enviado tu sugerencia correctamente.')    
    msg.channel.send({embed}).catch(console.error);
  
    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setFooter(`Enviada por ${msg.member.displayName}`)  
    .setTitle(`Literium - Sugerencias`)
    .setDescription(suggestion)  
    
    msg.guild.channels.cache.find(x => x.id === config.suggestChannel).send({embed}).catch(console.error)
    .then(function (message) {
        message.react('✅');
        message.react('❌');
    }) 
}  

exports.help = {
    name: "Suggest",
    category: "Soporte",
    description: "Envia una sugerencia.",
    usage: "Suggest [Mensaje]",
    example: "",
    status: "Ready"
};