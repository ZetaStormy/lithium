exports.run = (_client, msg, args, _content, _command, Discord, config) => {
    //Check the channel were the author of message sent the command.
    if (!msg.channel.name.startsWith("💻┋comandos") && !msg.channel.name.startsWith("💫┋off-topic")) {
        //Create the embed message using MessageEmbed() constructor.
        const incorrectChannelMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("Usa comandos en los canales correspondientes.");

        //Send the embed to the channel were the command was called.
        msg.channel.send({ embed: incorrectChannelMessage });
        //The return to exit.
        return;
    }

    //Create the variable userSuggestion to store the message and skip the spaces of this argument.
    const userSuggestion = args.slice(0).join(" ");
    //Check if there is a suggestion.
    if (!userSuggestion) {
        const invalidSuggestionMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("Por favor, escribe una sugerencia válida y bien estructurada.");

        msg.channel.send({ embed: invalidSuggestionMessage });
        return;
    }

    //Create the embed message to say that the suggestion was sent successfully.
    const sucessMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTimestamp()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setTitle("Lithium - Sugerencias")
        .setDescription("Se ha enviado tu sugerencia correctamente.");

    msg.channel.send({ embed: sucessMessage });

    //Create the embed for the suggestion log.
    const suggestMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTimestamp()
        .setFooter(`Enviada por ${msg.member.displayName}`)
        .setTitle("Lithium - Sugerencias")
        .setDescription(userSuggestion)

    //Send the suggestion to the suggest channel in the configuration.
    msg.guild.channels.cache.find((x) => x.id === config.suggestChannel).send({ embed: suggestMessage }).catch(console.error)
        .then(function (message) { //React to the message to have votes.
            message.react("✅");
            message.react("❌");
        });
}

//Add entry for the help module.
exports.help = {
    name: "Suggest",
    category: "Soporte",
    description: "Envia una sugerencia.",
    usage: "Suggest [Mensaje]"
}