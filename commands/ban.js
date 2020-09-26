exports.run = (_client, msg, args, _command, _content, Discord, config) => {
    var banChannel = config.banLogChannel;
    var user = msg.mentions.users.first();
    const banUser = msg.guild.member(user);
    var banReason = args.splice(1, args.length - 1).join(" ");
    if(!banReason) banReason = "Mal comportamiento";  
    
    if (!msg.member.hasPermission('BAN_MEMBERS')) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
        msg.channel.send({embed}).catch(console.error);
    } else if (!banUser || !banReason) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Debes mencionar a una persona y poner un motivo.');
        
        msg.channel.send({embed}).catch(console.error);
    } else {
        msg.delete();
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTimestamp()
            .setFooter(`Sancionado por ${msg.member.displayName}`)  
            .setTitle(`Literium - Sanciones`)
            .setDescription(`
**Tag:** ${user.tag}
**ID:** ${user.id}
**Motivo:** ${banReason}
            `);
            msg.guild.channels.cache.find(x => x.id === banChannel).send({embed}).catch(console.error);
            msg.channel.send({embed}).catch(console.error);   

        banUser.ban({
          reason: `${banReason}`
        })
        .then(user => console.log("Baneado " + user.username + " de " + msg.guild.name))
        .catch(console.error);
    };
};

exports.help = {
    name: "Ban",
    category: "Moderación",
    description: "Banea al jugador especificado.",
    usage: "Ban [@Usuario] [Motivo]",
    example: "",
    status: "Ready"
};