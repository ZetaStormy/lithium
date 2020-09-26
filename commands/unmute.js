exports.run = async (_client, msg, args, _content, _command, Discord, config) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para hacer esto.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
    }

        let toMute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
        if(!toMute) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Menciona a un usuario válido.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
        }

        let role = msg.guild.roles.cache.find(r => r.name === "⁃ Silenciado")
        let jugador = msg.guild.roles.cache.find(r => r.name === "⁃ Jugador")
        
        if(!role || !toMute.roles.cache.has(role.id)) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('El usuario no está silenciado.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
        }

        await toMute.roles.remove(role.id);
        await toMute.roles.add(jugador.id);
            var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setFooter(`Sancionado por ${msg.member.displayName}`)  
            .setTitle(`Literium - Sanciones`)
            .setTimestamp()
            .setDescription(`<@${toMute.id}> ya no está silenciado.`)  
            
            msg.guild.channels.cache.find(x => x.id === config.muteLogChannel).send({embed}).catch(console.error);
            msg.channel.send({embed}).catch(console.error)  

        msg.delete();

     }  

exports.help = {
    name: "Unmute",
    category: "Moderación",
    description: "Quitar el silencio de un usuario.",
    usage: "Unmute [@Usuario]",
    example: ""
}; 