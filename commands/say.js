exports.run = (_client, msg, args, _content, _command, Discord) => {
    if(!msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
        msg.channel.send({embed}).catch(console.error);
      return;
    }
      if (!args[0]) {
      var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTitle('Literium - Misceláneo')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)
        .setDescription(`Introduce un mensaje.`); 
        msg.channel.send({embed}).catch(console.error);
      return;
    };
    
    if (msg.deletable) msg.delete();
        
    const roleColor = msg.guild.me.roles.highest.hexColor;

    if (args[0] === "embed") {
        const embed = new Discord.MessageEmbed()
            .setDescription(args.slice(1).join(" "))
            .setColor(roleColor === "#000000" ? "#ffffff" :  roleColor)
            .setTimestamp()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL);

        msg.channel.send(embed);
    } else {
        msg.channel.send(args.join(" "));

    }
};

exports.help = {
    name: "Say",
    category: "Administración",
    description: "Envia un mensaje como si fuera el bot.",
    usage: "Say [Embed] [Mensaje]",
    example: "",
    status: "Ready"
};