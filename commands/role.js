exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
if (!msg.channel.name.startsWith(`💻┋comandos`)) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usa comandos en los canales correspondientes.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
}
    if(!msg.member.hasPermission('MANAGE_ROLES')) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
        msg.channel.send({embed}).catch(console.error);
      return;
    } else {
    var input = args.join(" ");
    } 
    if (typeof input === 'undefined' || input == 'everyone') {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Ingresa un rol válido.');
        
        msg.channel.send({embed}).catch(console.error);
    } else {
        var role = msg.guild.roles.cache.find(x => x.name === input);
        if (!role) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Ingresa un rol válido.');
        
        msg.channel.send({embed}).catch(console.error);
        } else {
            var list = role.members.map(m=>m.user.tag).sort();
            var result = "";
            for (var i = 0; i < list.length; i++){
                result += ("- " + String(list[i] + "\n"));
            };
            var embed = new Discord.MessageEmbed()
                .setTitle("Literium - Administración")
                .setColor('#ff8c00')
                .addField("**Nombre:**", role.name, true)
                .addField("**Usuarios:**", result || 'Sin usuarios.')
                .setTimestamp()
                .setFooter(`Solicitado por ${msg.member.displayName}`)				
            msg.channel.send({embed}).catch(console.error);
        };
    };
};

exports.help = {
    name: "Role",
    category: "Administración",
    description: "Muestra información del rol.",
    usage: "Role [Nombre]",
    example: "",
    status: "Ready"
};