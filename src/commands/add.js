exports.run = (client, msg, args, _command, _content, Discord, config) => {
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

  //Create a variable with the user that we want to add to the ticket.
  let memberMention = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
  //Check if there is a user mention.
  if (!memberMention) {
    //Create the embed with the MessageEmbed() constructor.
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Usuario desconocido, introduce un usuario válido.');
    
    //Send the embed.
    msg.channel.send({embed}).catch(console.error);
    //And then return to exit.
    return;
  }

  //Please, try to do this.
  try {
    //Update the user permissions in the channel.
    msg.channel.updateOverwrite(memberMention, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
      ATTACH_FILES: true
    });
    
    //Create embed to create a response message to the author.
    const authorResponse = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle('Lithium - Tickets')
    .setDescription(`${memberMention} ha sido añadido correctamente.`)
    .setFooter(`Solicitado por ${msg.member.displayName}`);

    //Send this response to the author.
    msg.channel.send(authorResponse);
    
    //Get the ticket topic and split it in arguments.
    const ticketTopic = msg.channel.topic.trim().split(/ +/g);
    //Log the action of the author with some details.
    const logAction = new Discord.MessageEmbed()
    .setTitle("Lithium - Tickets")
    .setColor('#ff8c00')
    .setTimestamp()
    .setDescription(`
Se detectó que ${memberMention} fue añadido al ticket de ${ticketTopic[3]} en el canal ${msg.channel} por ${msg.author}.
A continuación, se incluyen más detalles sobre este ticket:
\`\`\`yaml
Ticket:
  ID: ${msg.channel.name.substr(10)}
  Canal: ${msg.channel.name}
  Motivo: ${ticketTopic.splice(6, ticketTopic.length).join(" ")}\`\`\`
    `);
    
    //Send this embed to the channel that is in the config channel.
    client.channels.cache.get(config.ticketLogChannel).send(logAction).catch(console.error);
  //Catch if an error occurs.
  } catch(err) {
    //Log the error.
    console.log(err);
  }
}

//Create the entry for this command in the help.
exports.help = {
    name: "Add",
    category: "Soporte",
    description: "Añade alguien a un ticket.",
    usage: "Add [@Usuario]",
    example: ""
};