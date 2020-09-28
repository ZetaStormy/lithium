exports.run = (client, msg, args, _content, _command, Discord, config) => {
  //Check if the command executor is an administrator.
  if (!msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle(`Error`)
    .setDescription('No tienes permisos para ejecutar ese comando.');

    msg.channel.send({embed}).catch(console.error);
    return;
  }

  //Mention the user that we want to modify.
  const userMention = msg.mentions.users.first() || client.users.cache.get(args[0]);
  //Check if there is a user mention.
  if (!userMention) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle(`Error`)
    .setDescription('Menciona un usuario válido.');

    msg.channel.send({embed}).catch(console.error);    
    return;
  }

  //Parse to integer the quantity of points that we want to take.
  const pointsToTake = parseInt(args[1], 10);
  //Check if there is a mention to this points.
  if(!pointsToTake) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Menciona una cantidad de puntos válida.');

    msg.channel.send({embed}).catch(console.error);    
    return;
  }
  
  //Check if the quantity of points to take is over 500 to prevent database corruption.
  if(pointsToTake > 500) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle('Error')
    .setDescription('Introduce una cantidad entre 1 y 500.')
    msg.channel.send({embed}).catch(console.error);
    return;
  }

  //Get information about the member.
  let memberScore = client.getScore.get(user.id, msg.guild.id);
  //If the data of the member doesn't exist, then create it.
  if (!memberScore) {
    memberScore = {
      id: `${msg.guild.id}-${user.id}`,
      user: user.id,
      guild: msg.guild.id,
      points: 0,
      level: 1 
    }
  }

  //Idk what this does, I forgot it and i don't understand because i dont know too much about javascript.
  memberScore.points -= pointsToTake;

  //Calculate the user level.
  let userLevel = Math.floor(0.1 * Math.sqrt(memberScore.points));
  memberScore.level = userLevel;

  //Set the score of the member.
  client.setScore.run(memberScore);

  //Send the message.
  var embed = new Discord.MessageEmbed()
  .setTitle("Lithium - Niveles")
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Al usuario ${userMention.tag} se le ha quitado ${pointsToTake} de XP y ahora tiene ${memberScore.points} de XP.`)
  .setColor('#ff8c00'); 
  
  msg.channel.send({embed}).catch(console.error);
  //Log to the logs channel.
  msg.guild.channels.cache.find(x => x.id === config.otherLogChannel).send({embed}).catch(console.error);
}

//Export to help.
exports.help = {
    name: "Take",
    category: "Administración",
    description: "Quita XP a un usuario.",
    usage: "Take [@Usuario] [Cantidad]",
    example: ""
}; 