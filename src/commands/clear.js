exports.run = (_client, msg, args, _command, _content, Discord) => {
    //Check if the user has enough permissions.
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        //Create the embed using the MessageEmbed() constructor.
        const notEnoughPermissionsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("No tienes permisos para ejecutar ese comando.");
        
        //Send the embed to the channel where this command was executed.
        msg.channel.send({embed: notEnoughPermissionsMessage});
        //Return to exit this command.
        return;
    }

    //Create a constant where we store the number of messages to delete and parse them to integer.
    const clearMessages = parseInt(args[0], 10);
    //If arguments are null, execute this code and also check if the quantity of messages to delete is lower than 100, because that's the limit.
    if (!clearMessages || clearMessages > 100) {
        const numberInvalidMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("Debes mencionar un número mayor a 0 y menor o igual a 100.");
        
        msg.channel.send({embed: numberInvalidMessage});
        return;
    }
    
    //Check if the bot can delete the command message.
    if (msg.deletable) {
        msg.delete();
    }
    //Bulk delete all the messages that were specified in the args.
    msg.channel.bulkDelete(clearMessages);
    //Send a message to the user that all messages were deleted successfully.
    const sucessMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTitle("Lithium - Limpieza")
        .setTimestamp()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setDescription(`Se han borrado ${clearMessages} mensajes.`);
    
    //Send the embed and then delete the embed to keep the chat clear.
    msg.channel.send({embed: sucessMessage}).catch(console.error).then((msg) => {
        msg.delete({timeout: 10000});
    });
}

//Add an entry for this command in the help.
exports.help = {
    name: "Clear",
    category: "Administración",
    description: "Elimina mensajes de un canal.",
    usage: "Clear [Cantidad]"
}