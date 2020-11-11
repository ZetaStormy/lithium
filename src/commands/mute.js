exports.run = async (_client, msg, args, _content, _command, Discord, config) => {
  //Check the permissions.
  if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
    const notEnoughPermsMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle("Error")
      .setDescription("No tienes permisos para hacer esto.");
 
    msg.channel.send({embed: notEnoughPermsMessage});
    return;
  }

  //Store the mention of the member.
  const memberMention = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
  //Check if there is a mention
  if (!memberMention) {
    const invalidMemberMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle("Error")
      .setDescription("Menciona a un usuario válido.");
        
    msg.channel.send({embed: invalidMemberMessage});
    return;
  }
  
  //Check if the member has the permission to punish.
  if (memberMention.hasPermission("MANAGE_MESSAGES")) {
    const canNotPunishMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle("Error")
      .setDescription("No puedo silenciar a este usuario.");
        
    msg.channel.send({embed: canNotPunishMessage});
    return;
  }
  
  //You can't punish your self.
  if (memberMention.id === msg.author.id) {
    const canNotPunishYouMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle("Error")
      .setDescription("No puedes silenciarte a ti mismo.");
        
    msg.channel.send({embed: canNotPunishYouMessage});
    return;
  }
  
  //Store the default server role, in this case is the "Jugador" role.
  const defaultRole = msg.guild.roles.cache.find((x) => x.name === '⁃ Jugador');
  //Store the role that we want to use to mute in a variable.
  let mutedRole = msg.guild.roles.cache.find((role) => role.name === "⁃ Silenciado");
  //Check if the role exist.
  if (!mutedRole) {
    //If it doesn't exists, then create it.
    try {
      //Create it.
      mutedRole = await msg.guild.roles.create({
        data: {
          name: "⁃ Silenciado",
          color: "#a57474",
          permissions: [] 
        }
      });

      //Overwrite permissions.
      msg.guild.channels.cache.forEach(async (channel) => {
        await channel.updateOverwrite(mutedRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });

    } catch(e) {
      //Catch and log the error.
      console.log(e);
    }
  }

  const ms = require('ms');
  //The second argument will be the mute time.
  const muteTime = args[1];
  //Check if we have the time argument and return if we don't have it.
  if(!muteTime) {
    let embed = new Discord.MessageEmbed()
    .setColor("#8b0000")
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle("Error")
    .setDescription(`
Por favor, especifica una cantidad de tiempo válida usando el sufijo para días (d), horas (h), minutos (m) y segundos (s). Este comando no ha sido tan probado y perfeccionado, por lo que se recomienda no especificar valores tan altos. A continuación, se muestra un ejemplo del uso correcto:
\`-mute @ZetaStormy 1d Spam\`
Silencia a ZetaStormy por 1 día con motivo "Spam".
    `);
        
    msg.channel.send({embed});
    return;
  }

  //Create the reason variable and verify if it is empty.
  let reason = args.slice(2).join(' ');
  if(!reason) reason = "Mal comportamiento";

  //Add the mute role to the member.
  await(memberMention.roles.add(mutedRole.id));
  //Remove the default role to the member, so it doesn't overwrite the permissions.
  await(memberMention.roles.remove(defaultRole.id));

  //Check if the bot can delete the command message.
  if (msg.deletable) msg.delete();
  
  const sucessMessage = new Discord.MessageEmbed()
    .setColor("#ff8c00")
    .setTimestamp()
    .setFooter(`Sancionado por ${msg.member.displayName}`)  
    .setTitle("Lithium - Sanciones")
    .setDescription(`
**Sanción:** Silenciado
**Tag:** ${memberMention.user.tag}
**ID:** ${memberMention.user.id}
**Motivo:** ${reason}
**Tiempo:** ${ms(ms(muteTime))}
    `);

  //Find the log channel in the configuration and send the embed.
  msg.guild.channels.cache.find((x) => x.id === config.muteLogChannel).send({embed: sucessMessage});
  //Send the embed to the channel
  msg.channel.send({embed: sucessMessage});   

  //Set the timeout of the mute using the muteTime and create a function inside the setTimeout function to do some stuff.
  setTimeout(function() {
    //Remove the mute role.
    memberMention.roles.remove(mutedRole.id);
    //Add the default role again.
    memberMention.roles.add(defaultRole.id);

    //Create the embed to say that the member is no longer muted.
    const noLongerMutedMessage = new Discord.MessageEmbed()
      .setColor("#ff8c00")
      .setFooter(`Sancionado por ${msg.member.displayName}`)  
      .setTitle("Lithium - Sanciones")
      .setTimestamp()
      .setDescription(`<@${memberMention.id}> ya no está silenciado.`);

    //Find the mute log channel and send this embed
    msg.guild.channels.cache.find((x) => x.id === config.muteLogChannel).send({embed: noLongerMutedMessage});
    //Send this message to the channel where the member was muted.
    msg.channel.send({embed: noLongerMutedMessage});
  }, ms(muteTime)); //Specify the timeout time.
}

//Information for the help command.
exports.help = {
  name: "Mute",
  category: "Moderación",
  description: "Silencia a un usuario.",
  usage: "Mute [@Usuario] [1s/m/h/d]"
}