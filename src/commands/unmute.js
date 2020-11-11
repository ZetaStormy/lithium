exports.run = async (_client, msg, args, _content, _command, Discord, config) => {
    //Check the permissions.
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        const noEnoughPermsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle("Error")
            .setDescription("No tienes permisos para hacer esto.");
 
        msg.channel.send({embed: noEnoughPermsMessage});
        return;
    }

    //Store the member mention.
    const memberMention = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
    //Check if there is a mention.
    if(!memberMention) {
        const invalidMemberMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle("Error")
            .setDescription("Menciona a un usuario válido.");
        
        msg.channel.send({embed: invalidMemberMessage});
        return;
    }

    //Store the muted role in a variable.
    const mutedRole = msg.guild.roles.cache.find(r => r.name === "⁃ Silenciado");
    //Store the default role in a variable.
    const defaultRole = msg.guild.roles.cache.find(r => r.name === "⁃ Jugador");
    
    //Check if the role exists or if the user has the muted role.
    if(!mutedRole || !memberMention.roles.cache.has(mutedRole.id)) {
        const notMutedMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle("Error")
            .setDescription("El usuario no está silenciado.");
        
        msg.channel.send({embed: notMutedMessage});
        return;
    }

    //Remove the muted role.
    await memberMention.roles.remove(mutedRole.id);
    //Add the default role again.
    await memberMention.roles.add(defaultRole.id);

    //Create an embed to say that the user is no longer muted.
    const noLongerMutedMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setFooter(`Sancionado por ${msg.member.displayName}`)  
        .setTitle("Lithium - Sanciones")
        .setTimestamp()
        .setDescription(`<@${memberMention.id}> ya no está silenciado.`);

    //Send to the log channel.
    msg.guild.channels.cache.find((x) => x.id === config.muteLogChannel).send({embed: noLongerMutedMessage});
    //Send to the channel.
    msg.channel.send({embed: noLongerMutedMessage}).catch(console.error)  
    //Delete the command.
    msg.delete();
}  

//I think at this point you know what this does (it adds an entry to the help command).
exports.help = {
    name: "Unmute",
    category: "Moderación",
    description: "Quitar el silencio de un usuario.",
    usage: "Unmute [@Usuario]"
}