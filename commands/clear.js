exports.run = (_client, msg, args, _command, _content, Discord) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para hacer esto.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
        }  
        const clearMessages = parseInt(args[0], 10);
        if (!clearMessages) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle('Error')
            .setDescription('Debes mencionar un número mayor a 0 y menor o igual a 100.');
        
        msg.channel.send({embed}).catch(console.error);
        return;
        } 
  
        if (clearMessages > 100) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle('Error')
            .setDescription('Debes mencionar un número mayor a 0 y menor o igual a 100.');
        
        msg.channel.send({embed}).catch(console.error);
        return;
        } 
          
          msg.channel.bulkDelete(clearMessages)
          var embed = new Discord.MessageEmbed()
          .setColor('#ff8c00')
          .setTitle('Literium - Limpieza')
          .setTimestamp()
          .setFooter(`Solicitado por ${msg.member.displayName}`)
          .setDescription(`Se han borrado ${clearMessages} mensajes.`);
          
          msg.channel.send({embed}).catch(console.error)
            .then(msg => {
            msg.delete({ timeout: 10000 }).catch(console.error);
          })
          
};

exports.help = {
    name: "Clear",
    category: "Administración",
    description: "Elimina mensajes de un canal.",
    usage: "Clear [Cantidad]",
    example: "",
    status: "Ready"
};