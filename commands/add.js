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
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true,
        ATTACH_FILES: true
    });
      
      const added = new Discord.MessageEmbed()
          .setColor('#ff8c00')
          .setTimestamp()
          .setTitle('Literium - Tickets')
          .setDescription(`${user} fue añadido.`)
          .setFooter(`Solicitado por ${msg.member.displayName}`)   
          msg.channel.send(added);
      
      const embed = new Discord.MessageEmbed()
        .setTitle("Literium - Añadido a ticket")
        .setColor('#ff8c00')
        .addField("**Nombre:**", user, true)
        .addField("**Añadido por:**", msg.author, true)
        .addField("**Canal:**", msg.channel, true)
        .setTimestamp();
      
    client.channels.cache.get(config.ticketLogChannel).send({embed})
    console.log(`${msg.author.tag} añadió un usuario al ticket(#${msg.channel})`)
      
  } catch(error) {
    console.log(error);
  }
};

exports.help = {
    name: "Add",
    category: "Soporte",
    description: "Añade alguien a un ticket.",
    usage: "Add [@Usuario]",
    example: ""
};