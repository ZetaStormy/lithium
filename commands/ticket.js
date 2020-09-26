 exports.run = (client, msg, args, _content, _command, Discord, config) => {
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
     
		let topic = args.join(" ");
    if(!topic) topic = "Por defecto.";   
		let id = msg.author.id.toString().substr(0, 4) + msg.author.discriminator;
		let chan = `🗳┋ticket-${id}`;

		if (msg.guild.channels.cache.find(channel => channel.name === chan)) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Ya has abierto un ticket.');
        
        msg.channel.send({embed}).catch(console.error);
        return;
		};

		msg.guild.channels.create(`🗳┋ticket-${id}`, {
			type: 'text'
		}).then(async c => {
			c.setParent(config.ticketsCat);
      c.setTopic(`${msg.author} | Motivo: ${topic}`);
			let supportRole = msg.guild.roles.cache.get(config.supportRole)
			if (!supportRole) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No se ha encontrado el rol de soporte.');
        
        msg.channel.send({embed}).catch(console.error);
        return;
		};
    
      let defaultRole = msg.member.roles.cache.find(x => x.id === "675531469086523436")
			c.updateOverwrite(defaultRole, {
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			})
			c.updateOverwrite(msg.member, {
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true,
        ATTACH_FILES: true
			})
			c.updateOverwrite(supportRole, {
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true,
        ATTACH_FILES: true
			});

			const created = new Discord.MessageEmbed()
				.setColor('#ff8c00')
        .setTimestamp()
        .setTitle('Literium - Tickets')
				.setDescription(`
Tu ticket ha sido creado, lee las instrucciones dadas y sigue los pasos.
**ID:** ${id}
**Canal:** ${c}
`)
				.setTimestamp()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
			const welcome = new Discord.MessageEmbed()
				.setColor('#ff8c00')
        .setTitle('Literium - Tickets')
        .setTimestamp()
        .setFooter(`Solicitado por ${msg.member.displayName}`)      
				.setDescription(`
**Tag:** ${msg.author.tag}
**ID:** ${id}
**Motivo:** ${topic}
${config.ticketText}
`);      


				msg.channel.send(created)
				let w = await c.send(welcome)
      
				var embed = new Discord.MessageEmbed()
  .setTimestamp()
  .setColor('#ff8c00')
  .setTitle(`Literium - Ticket creado`)
  .setDescription(`
**Tag:** ${msg.author.tag}
**ID:** ${id}
 **Motivo:** ${topic}
  `);
			client.channels.cache.get(config.ticketLogChannel).send({embed})
			console.log(`${msg.author.tag} creó un nuevo ticket (#ticket-${id})`)
		})
 }
 
exports.help = {
    name: "Ticket",
    category: "Soporte",
    description: "Abre un ticket.",
    usage: "Ticket [Motivo]",
    example: ""
}; 