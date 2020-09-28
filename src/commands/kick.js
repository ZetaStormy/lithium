exports.run = async (_client, msg, args, _content, _command, Discord, config) => {
  //Check if the author has enough permissions.
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
  
  //Get the first argument that would be the member.
  let memberMention = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
  //If the member doesn't exist, execute the code.
  if (!memberMention) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Menciona a un usuario válido.');
    
    msg.channel.send({embed}).catch(console.error);
    return;
  }

  //Check if we can kick that member of the guild.
  if (!memberMention.kickable) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('No puedes expulsar a ese usuario.');
    
    msg.channel.send({embed}).catch(console.error);
    return;
  }
  
  //Create the variable reason to store the reason obviously.
  let punishmentReason = args.slice(1).join(' ');
  //If there is no reason, then use this string.
  if (!punishmentReason) punishmentReason = "Mal comportamiento";
  
  //Wait for the reason to avoid errors.
  await memberMention.kick(punishmentReason).catch(error => {
    //Send a message with the error if theres is one.
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription(`No pude expulsar por ${error}.`);
    
    msg.channel.send({embed}).catch(console.error);
  });
  
  //Check if the bot can delete the command message.
  if (msg.deletable) msg.delete();
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setFooter(`Sancionado por ${msg.member.displayName}`)  
  .setTitle(`Lithium - Sanciones`)
  .setDescription(`
**Sanción:** Expulsión
**Tag:** ${memberMention.user.tag}
**ID:** ${memberMention.user.id}
**Motivo:** ${punishmentReason}
  `);

  //Log the punishment to the kick log channel in the configuration.
  msg.guild.channels.cache.find(x => x.id === config.kickLogChannel).send({embed}).catch(console.error);
  //Send the same punishment message to the channel.
  msg.channel.send({embed}).catch(console.error);
}

//Add an entry for this command in the help command.
exports.help = {
    name: "Kick",
    category: "Moderación",
    description: "Expulsa a un usuario.",
    usage: "Kick [@Usuario] [Motivo]",
    example: ""
};