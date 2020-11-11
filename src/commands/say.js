exports.run = (_client, msg, args, _content, _command, Discord) => {
    //Check if the member has the administration role.
    if(!(msg.member.roles.cache.find((x) => x.name === "⁃ Administración") || msg.member.hasPermission("ADMINISTRATOR"))) {
        const noEnoughPermsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle("Error")
            .setDescription("No tienes permisos para ejecutar ese comando.");
        
        msg.channel.send({embed: noEnoughPermsMessage});
        return;
    }

    //Check if there is a message.
    if (!args[0]) {
        const noEnoughArgumentsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTitle("Literium - Misceláneo")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setDescription(`Introduce un mensaje.`);

        msg.channel.send({embed: noEnoughArgumentsMessage});
        return;
    }
    
    //Check if the bot can delete the command message.
    if (msg.deletable) {
        msg.delete();
    }
    
    //Store the HEX color of the highest role of the guild.
    const roleColor = msg.guild.me.roles.highest.hexColor;
    //If the first argument (converted to lower case) is "embed", create an embed.
    if (args[0].toLowerCase() === "embed") {
        const sayEmbedMessage = new Discord.MessageEmbed()
        .setDescription(args.slice(1).join(" ")) //Slice the first argument because is the "embed" argument and then use join() to skip the spaces.
        .setColor(roleColor === "#000000" ? "#ffffff" :  roleColor) //If the roleColor equals "#000000" (default), then use "#ffffff", else use the highest guild role HEX color.
        .setTimestamp()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL);
        
        //Send the embed.
        msg.channel.send({embed: sayEmbedMessage});
    } else {
        //Send a simple message and use join() to skip the spaces.
        msg.channel.send(args.join(" "));
    }
};

//Add entry for the help command-
exports.help = {
    name: "Say",
    category: "Administración",
    description: "Envia un mensaje como si fuera el bot.",
    usage: "Say [Embed] [Mensaje]"
}