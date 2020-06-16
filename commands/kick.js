exports.run = async (client, msg, args, content, cooldown, command, Discord, config, request) => {
  if (!msg.member.hasPermission('KICK_MEMBERS')) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('No tienes permisos para ejecutar ese comando.');
    
    msg.channel.send({embed}).catch(console.error);
    return;
  }
  
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if(!member) { 
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Menciona a un usuario válido.');
    
    msg.channel.send({embed}).catch(console.error);
    return;
    }
    if(!member.kickable) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('No puedes expulsar a ese usuario.');
    
    msg.channel.send({embed}).catch(console.error);
    return;
    }
    if(member.user.id === config.owner) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('No puedo expulsar a mi dueño.');
    
    msg.channel.send({embed}).catch(console.error);
    return;    
    }
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Mal comportamiento";
    
    await member.kick(reason)
      .catch(error => {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription(`No pude expulsar por ${error}.`);
    
    msg.channel.send({embed}).catch(console.error);      
    });
        msg.delete();
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTimestamp()
            .setFooter(`Sancionado por ${msg.member.displayName}`)  
            .setTitle(`Literium - Sanciones`)
            .setDescription(`
**Sanción:** Expulsión
**Tag:** ${member.user.tag}
**ID:** ${member.user.id}
**Motivo:** ${reason}
            `);
            msg.guild.channels.cache.find(x => x.id === config.kickLogChannel).send({embed}).catch(console.error);
            msg.channel.send({embed}).catch(console.error)   
        .then(user => console.log("Expulsado " + user.username + " de " + msg.guild.name))
        .catch(console.error);
    }


exports.help = {
    name: "Kick",
    category: "Moderación",
    description: "Expulsa a un usuario.",
    usage: "Kick [@Usuario] [Motivo]",
    example: ""
};