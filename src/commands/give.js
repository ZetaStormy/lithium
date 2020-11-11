exports.run = (client, msg, args, _content, _command, Discord, config) => {
  //Check if the command executor is an administrator.
  if (!msg.member.roles.cache.find((x) => x.name === "⁃ Administración")) {
    const noEnoughPermsMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("No tienes permisos para ejecutar ese comando.");

    msg.channel.send({embed: noEnoughPermsMessage});
    return;
  }

  //Mention the user that we want to modify.
  const userMention = msg.mentions.users.first() || client.users.cache.get(args[0]);
  //Check if there is a user mention.
  if (!userMention) {
    const invalidMemberMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Menciona un usuario válido.");

    msg.channel.send({embed: invalidMemberMessage});    
    return;
  }

  //Parse to integer the quantity of points that we want to add.
  const pointsToAdd = parseInt(args[1], 10);
  //Check if there is a mention to this points.
  if (!pointsToAdd) {
    const invalidPointsMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Menciona una cantidad de puntos válida.");

    msg.channel.send({embed: invalidPointsMessage});    
    return;
  }
  
  //Check if the quantity of points to give is over 500 to prevent database corruption.
  if (pointsToAdd > 500) {
    const tooMuchPointsMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Introduce una cantidad entre 1 y 500.");

    msg.channel.send({embed: tooMuchPointsMessage});
    return;
  }

  //Get information about the member.
  let memberScore = client.getScore.get(userMention.id, msg.guild.id);
  //If the data of the member doesn't exist, then create it.
  if (!memberScore) {
    memberScore = { 
      id: `${msg.guild.id}-${userMention.id}`,
      user: userMention.id, guild: msg.guild.id,
      points: 0,
      level: 1 
    }
  }
  //Idk what this does, I forgot it and i don't understand because i'm sleepy.
  memberScore.points += pointsToAdd;

  //Calculate the user level.
  const userLevel = Math.floor(0.1 * Math.sqrt(memberScore.points));
  memberScore.level = userLevel;

  //Set the score of the member.
  client.setScore.run(memberScore);

  //Send the message.
  const sucessMessage = new Discord.MessageEmbed()
    .setTitle("Lithium - Niveles")
    .setTimestamp()
    .setFooter(`Solicitado por ${msg.member.displayName}`)
    .setDescription(`${userMention.tag} ha recibido ${pointsToAdd} de XP y ahora tiene ${memberScore.points} de XP.`)
    .setColor("#ff8c00"); 
  
  msg.channel.send({embed: sucessMessage});
};

//add the entry to help.
exports.help = {
  name: "Give",
  category: "Administración",
  description: "Entrega XP a un usuario.",
  usage: "Give [@Usuario] [Cantidad]"
}