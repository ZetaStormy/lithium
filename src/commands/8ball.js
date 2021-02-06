exports.run = (_client, msg, args, _command, _content, Discord) => {
  //Check the channel were the author of message sent the command.
  if (!(msg.channel.name.startsWith("💻┋comandos") || msg.channel.name.startsWith("💫┋off-topic"))) {
    //Create the embed message using MessageEmbed() constructor.
    const incorrectChannelMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Usa comandos en los canales correspondientes.");

    //Send the embed to the channel were the command was called.
    msg.channel.send({ embed: incorrectChannelMessage });
    //The return to exit.
    return;
  }

  //Verify if the args[1] (the argument where the question is supposed to be) exists.
  if (!args[1]) {
    //If it doesn't exists, create a beatiful embed using MessageEmbed().
    const notEnoughArgumentsMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Debes preguntar algo con más de una palabra.");

    //Then, we send this embed.
    msg.channel.send({ embed: notEnoughArgumentsMessage });
    //And return because we don't want to continue the execution of the code.
    return;
  }

  //Create an array of replies, a looooot of them.
  const randomReplies = ["Sí.", "No.", "No lo sé.", "Claro, lo que tú digas.", "¡Pregunta más tarde!", "¡No estoy seguro!", "Por favor, no.", "Dígame usted.", "Sin duda.", "No te lo puedo decir ahora.", "Sí, claro.", "Mmm", "No tengo ni idea.", "Ehh... Pregunta en otro momento."];
  //Chose a random reply from the array using Math.
  const result = Math.floor((Math.random() * randomReplies.length));
  //Create the question variable without skipping the spaces.
  const question = args.join(" ");

  //Create another embed message with the question and the answer.
  const sucessMessage = new Discord.MessageEmbed()
    .setFooter(`Solicitado por ${msg.member.displayName}`)
    .setTimestamp()
    .setColor("#ff8c00")
    .setTitle("Lithium - Entretenimiento")
    .addField("**Pregunta**", question)
    .addField("**Respuesta**", randomReplies[result]);

  //Send the embed.
  msg.channel.send({ embed: sucessMessage });
}

//Create the 8ball entry in help command.
exports.help = {
  name: "8ball",
  category: "Misceláneo",
  description: "Pregúntale a este inteligente bot.",
  usage: "8ball [Pregunta]"
}