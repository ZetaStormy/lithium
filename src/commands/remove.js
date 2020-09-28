exports.run = (client, msg, args, _content, _command, Discord, config) => {
  //Check if the command has been executed in a ticket channel.
  if (!msg.channel.name.startsWith('🗳┋ticket-')) {
    //Start the creation of the embed to say that this is not a ticket channel.
    var incorrectChannel = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Este comando sólo puede ser usado en un ticket.');
    
    //Send the error embed.
    msg.channel.send({incorrectChannel}).catch(console.error);
    //And then return to exit this command.
    return;
  }

  //Store the guild member argument in the variable memberMention.
  let memberMention = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
  //Check if there is a member mention in the arguments.
  if (!memberMention) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Usuario desconocido, introduce un usuario válido.')
        
    msg.channel.send({embed}).catch(console.error);
    return;
  }

  //Try to remove from the ticket.
  try {
    //Remove permissions for member.
    msg.channel.updateOverwrite(memberMention, {
			VIEW_CHANNEL: false,
			SEND_MESSAGES: false,
      ATTACH_FILES: false
    });
    
    //Create the embed with the response to the author.
    const authorResponse = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle('Lithium - Tickets')
    .setDescription(`${memberMention} ha sido removido correctamente.`)
    .setFooter(`Solicitado por ${msg.member.displayName}`)   

    //Send the response to the author.
    msg.channel.send(authorResponse);

    //Get the ticket topic and split it in arguments.
    const ticketTopic = msg.channel.topic.trim().split(/ +/g);
    //Create an embed to log the action.
    const logAction = new Discord.MessageEmbed()
    .setTitle("Lithium - Tickets")
    .setColor('#ff8c00')
    .setTimestamp()
    .setDescription(`
Se detectó que ${memberMention} fue removido del ticket de ${ticketTopic[3]} en el canal ${msg.channel} por ${msg.author}.
A continuación, se incluyen más detalles sobre este ticket:
\`\`\`yaml
Ticket:
  ID: ${msg.channel.name.substr(10)}
  Canal: ${msg.channel.name}
  Motivo: ${ticketTopic.splice(6, ticketTopic.length).join(" ")}\`\`\`
    `);    
    
    //Send to the log channel that is in the configuration.
    client.channels.cache.get(config.ticketLogChannel).send(logAction).catch(console.error);
  } catch(err) {
    //Catch the error and log it.
    console.log(err);
  }
}

//Help command.
exports.help = {
    name: "Remove",
    category: "Soporte",
    description: "Elimina a un usuario de un ticket.",
    usage: "Remove [@Usuario]",
    example: ""
};