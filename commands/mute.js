const ms = require('ms');
exports.run = async (_client, msg, args, _content, _command, Discord, config) => {  
  let tomute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
  if(!tomute) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Menciona a un usuario válido.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
  }
  
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
  
  if(tomute.hasPermission("MANAGE_MESSAGES")) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No puedo silenciar a este usuario.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
  }
  
  if (tomute.id === msg.author.id) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No puedes silenciarte a ti mismo.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
  }
  
  let muterole = msg.guild.roles.cache.find(muterole => muterole.name === "⁃ Silenciado");
  if(!muterole){
    try{
      muterole = await msg.guild.createRole({
        name: "⁃ Silenciado",
        color: "#a57474",
        permissions: []
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  

  let mutetime = args[1];
  if(!mutetime) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription(`
Debes especificar el tiempo.
**Ejemplo:** -mute @ZetaStormy 1d
*(Silencia a ZetaStormy por 1 día).*
`);
        
        msg.channel.send({embed}).catch(console.error);
             return;
}

    let reason = args.slice(2).join(' ');
    if(!reason) reason = "Mal comportamiento";
    const jugador = msg.guild.roles.cache.find(x => x.name === '⁃ Jugador');
  
  await(tomute.roles.add(muterole.id));
  await(tomute.roles.remove(jugador.id));
        msg.delete();
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTimestamp()
            .setFooter(`Sancionado por ${msg.member.displayName}`)  
            .setTitle(`Literium - Sanciones`)
            .setDescription(`
**Sanción:** Silenciado
**Tag:** ${tomute.user.tag}
**ID:** ${tomute.user.id}
**Motivo:** ${reason}
**Tiempo:** ${ms(ms(mutetime))}
            `);
            msg.guild.channels.cache.find(x => x.id === config.muteLogChannel).send({embed}).catch(console.error);
            msg.channel.send({embed}).catch(console.error);   

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    tomute.roles.add(jugador.id);
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setFooter(`Sancionado por ${msg.member.displayName}`)  
            .setTitle(`Literium - Sanciones`)
            .setTimestamp()
            .setDescription(`<@${tomute.id}> ya no está silenciado.`)   
              msg.guild.channels.cache.find(x => x.id === config.muteLogChannel).send({embed}).catch(console.error);
            msg.channel.send({embed}).catch(console.error); 
      }, ms(mutetime));

}

exports.help = {
    name: "Mute",
    category: "Moderación",
    description: "Silencia a un usuario.",
    usage: "Mute [@Usuario] [1s/m/h/d]",
    example: "",
    status: "Ready"
};