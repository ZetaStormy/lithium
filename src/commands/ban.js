exports.run = (_client, msg, args, _command, _content, Discord, config) => {
    //Create a variable for the log channel that is in the configuration file.
    var logChannel = config.banLogChannel;
    //Create a variable for the user in the mention.
    var user = msg.mentions.users.first();
    //Convert this user mention to a guild member.
    const memberMention = msg.guild.member(user);
    //Variable to store the ban reason.
    var punishmentReason = args.splice(1, args.length - 1).join(" ");
    //If there isn't a valid reason, then use this string.
    if (!punishmentReason) punishmentReason = "Mal comportamiento";  
    
    //If the member doesn't have enough permissions, then execute the code inside.
    if (!msg.member.hasPermission('BAN_MEMBERS')) {
        var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('No tienes permisos para ejecutar ese comando.');
        
        msg.channel.send({embed}).catch(console.error);
        return;
    //Else if there isn't a user to punish or a punishment reason, then execute the code inside.
    } else if (!memberMention || !punishmentReason) {
        var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('Debes mencionar a una persona y poner un motivo.');
        
        msg.channel.send({embed}).catch(console.error);
    } else {
        //Check if the bot can delete the message.
        if (msg.deletable) msg.delete();
        //Create the embed.
        var embed = new Discord.MessageEmbed()
        .setColor('#ff8c00')
        .setTimestamp()
        .setFooter(`Sancionado por ${msg.member.displayName}`)  
        .setTitle(`Lithium - Sanciones`)
        .setDescription(`
**Tag:** ${user.tag}
**ID:** ${user.id}
**Motivo:** ${punishmentReason}
        `);

        //Send the message to the logs channel.
        msg.guild.channels.cache.find(x => x.id === logChannel).send({embed}).catch(console.error);
        //Send the message to the channel where the command is executed.
        msg.channel.send({embed}).catch(console.error);

        //Ban the member and the reason will be the punishmentReason variable.
        memberMention.ban({
          reason: `${punishmentReason}`
        }).catch(console.error);
    }
}

//Create an entry in the help command.
exports.help = {
    name: "Ban",
    category: "Moderación",
    description: "Banea al jugador especificado.",
    usage: "Ban [@Usuario] [Motivo]",
    example: "",
    status: "Ready"
};