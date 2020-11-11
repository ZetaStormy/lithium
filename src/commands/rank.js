exports.run = (client, msg, args, _content, _command, Discord) => {
  //Check the channel were the author of message sent the command.
  if (!(msg.channel.name.startsWith(`💻┋comandos`) || msg.channel.name.startsWith(`💫┋off-topic`))) {
    //Create the embed message using MessageEmbed() constructor.
    const incorrectChannelMessage = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle(`Error`)
      .setDescription('Usa comandos en los canales correspondientes.');
      
    //Send the embed to the channel were the command was called.
    msg.channel.send({embed: incorrectChannelMessage}).catch(console.error);
    //The return to exit.
    return;
  }

  //Get the message author information from the database using getScore.get().
  const authorScore = client.getScore.get(msg.author.id, msg.guild.id);  
  //Create a constant with the points and the level.
  const currentExperience = authorScore.points;
  const currentLevel = authorScore.level;
  //Calculate how much experience is needed for the next level.
  const nextLevel = 5000 * (Math.pow(2, authorScore.level) - 1);
  const levelDifference = nextLevel - currentExperience;
  
  //Create the embed for the author rank using MessageEmbed() constructor.
  const authorRankMessage = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTitle('Lithium - Niveles')
    .setTimestamp()
    .setFooter(`Solicitado por ${msg.member.displayName}`)
    .setDescription(`
Te falta ${levelDifference} de XP para subir al siguiente nivel.
**Nivel:** ${currentLevel}
**XP:** ${currentExperience}
    `);

  //Create memberMention variable to check if there was a name mention in the command.
  const memberObject = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
  //There isn't a member mention in the command, return the author rank embed.
  if(!memberObject) return msg.channel.send({embed: authorRankMessage}).catch(console.error);

  //If there is a member, then get the information from the database of this member.
  const memberScore = client.getScore.get(memberObject.id, msg.guild.id);   
  //Then create variables with the points and level of this member. 
  const memberCurrentExperience = memberScore.points;
  const memberCurrentLevel = memberScore.level;
  //Calculate how much experience needs this member for the next level.
  const memberNextLevel = 5000 * (Math.pow(2, memberCurrentLevel) - 1); 
  const memberLevelDifference = memberNextLevel - memberCurrentExperience;    

  //Start the creation of the embed message using MessageEmbed() constructor.
  const memberRankMessage = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTitle(`Lithium - Niveles`)
    .setTimestamp()
    .setFooter(`Solicitado por ${msg.member.displayName}`)
    .setDescription(`
A ${memberObject.displayName} le falta ${memberLevelDifference} de XP para subir al siguiente nivel.
**Nivel:** ${memberCurrentLevel}
**XP:** ${memberCurrentExperience}
    `)

  //Finally send the embed with the member rank message.
  msg.channel.send({embed: memberRankMessage}).catch(console.error);
}

exports.help = {
  name: "Rank",
  category: "Información",
  description: "Muestra tu nivel en el discord.",
  usage: "Rank [@Usuario]"
}