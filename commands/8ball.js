exports.run = (_client, msg, args, _command, _content, Discord) => {
if (!msg.channel.name.startsWith(`💻┋comandos`)) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usa comandos en los canales correspondientes.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
           } else
           var amt = args[1];
           if (typeof amt === 'undefined') {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Debes preguntar algo con más de una palabra.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
           }
   
    let replies = ["Sí.", "No.", "No lo sé.", "Claro, lo que tú digas.", "¡Pregunta más tarde!", "¡No estoy seguro!", "Por favor, no.", "Dígame usted.", "Sin duda.", "No te lo puedo decir ahora.", "Sí, claro", "Mmm", "No tengo ni idea.", "Ehh... Pregunta en otro momento." ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    var embed = new Discord.MessageEmbed()

    .setFooter(`Solicitado por ${msg.member.displayName}`)
    .setTimestamp()
    .setColor("#ff8c00")
    .setTitle("Literium - Diversión")
    .addField("**Pregunta**", question)
    .addField("**Respuesta**", replies[result]);

    msg.channel.send({embed});

 }

exports.help = {
    name: "8ball",
    category: "Misceláneo",
    description: "Pregúntale a este inteligente bot.",
    usage: "8ball [Pregunta]",
    example: ""
};