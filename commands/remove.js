exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
      if(!msg.channel.name.startsWith('🗳┋ticket-')) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Este comando sólo puede ser usado en un ticket.');
        
        msg.channel.send({embed}).catch(console.error);
          return;
    }

    let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
    if(!user) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usuario desconocido, introduce un usuario válido.')
        
        msg.channel.send({embed}).catch(console.error);
          return;
    }
    try {
    msg.channel.updateOverwrite(user, {
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false,
        ATTACH_FILES: false
    });
      
      const removed = new Discord.MessageEmbed()
          .setColor('#ff8c00')
          .setTimestamp()
          .setTitle('Literium - Tickets')
          .setDescription(`${user} fue removido.`)
          .setFooter(`Solicitado por ${msg.member.displayName}`)   
          msg.channel.send(removed);
      const embed = new Discord.MessageEmbed()
        .setTitle("Literium - Removido de ticket")
        .setColor('#ff8c00')
        .addField("**Nombre:**", user, true)
        .addField("**Removido por:**", msg.author, true)
        .addField("**Canal:**", msg.channel, true)
        .setTimestamp();
      
    client.channels.cache.get(config.ticketLogChannel).send({embed})
    console.log(`${msg.author.tag} removió un usuario (#${msg.channel})`)
      
  } catch(error) {
    console.log(error);
  }
};

exports.help = {
    name: "Remove",
    category: "Soporte",
    description: "Elimina a un usuario de un ticket.",
    usage: "Remove [@Usuario]",
    example: ""
};