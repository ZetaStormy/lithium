exports.run = (client, msg, _args, _content, _command, Discord, config) => {
  //Check if the command is executed from a ticket.
  if (!msg.channel.name.startsWith("🗳┋ticket-")) {
    const invalidChannelMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Este comando sólo puede ser usado en un ticket.");
        
    msg.channel.send({embed: invalidChannelMessage});
    return;
  }

  try {
    //Get the ticket topic and split it in arguments.
    const ticketTopic = msg.channel.topic.trim().split(/ +/g);
    //Create an embed with information about the ticket.
    const ticketInformationMessage = new Discord.MessageEmbed()
      .setTitle("Lithium - Tickets")
      .setColor("#ff8c00")
      .setTimestamp()
      .setDescription(`
${msg.author} ha cerrado un ticket de ${ticketTopic[3]} hace un momento usando uno de los comandos de Lithium.
A continuación, se muestra la información recuperada de este ticket:
\`\`\`yaml
Ticket:
  ID: ${msg.channel.name.substr(10)}
  Canal: ${msg.channel.name}
  Motivo: ${ticketTopic.splice(6, ticketTopic.length).join(" ")}\`\`\`
      `);

    //Send a message to the ticket log channel.
    client.channels.cache.get(config.ticketLogChannel).send({embed: ticketInformationMessage});
    //Delete the channel successfully if we are in a ticket.
    msg.channel.delete();
  } catch(err) {
    //Log the error if there is one.
    console.log(err);
  }
}

//Add the entry to the help command.
exports.help = {
  name: "Close",
  category: "Soporte",
  description: "Cierra un ticket.",
  usage: "Close"
}