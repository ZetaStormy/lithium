 exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    if(!msg.channel.name.startsWith('🗳┋ticket-')) { 
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Este comando sólo puede ser usado en un ticket.');
        
        msg.channel.send({embed}).catch(console.error);
          return;
    } else {
      try {
        msg.channel.delete()

  	      const embed = new Discord.MessageEmbed()
  	        .setTitle("Literium - Ticket cerrado")
  					.setColor('#ff8c00')
            .setDescription(`
**Nombre:** ${msg.author}
**Canal:** ${msg.channel.name}
`)
  					.setTimestamp();
  	    client.channels.cache.get(config.ticketLogChannel).send({embed})
  			console.log(`${msg.author.tag} ticket cerrado (#${msg.channel.name})`)

      } catch(error) {
        console.log((error));
      }
    }
 };
 
exports.help = {
    name: "Close",
    category: "Soporte",
    description: "Cierra un ticket.",
    usage: "Close",
    example: ""
}; 