exports.run = (_client, msg, args, _command, _content, Discord, config) => {
    //Check if the author has ADMINISTRATOR permission.
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
        const notEnoughPermissionsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("No tienes permisos para ejecutar ese comando.");

        msg.channel.send({ embed: notEnoughPermissionsMessage });
        return;
    }

    //Find the role that is in the first argument.
    const roleGive = msg.guild.roles.cache.find((x) => x.id === args[0]);
    if (!roleGive) { //Check if the role exists or if we have the arguments of the role.
        const notEnoughArgumentsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("Por favor, introduce la ID del rol que deseas dar.");

        msg.channel.send({ embed: notEnoughArgumentsMessage });
        return;
    }

    //Create the embed that is sent when the process is successful.
    const addRoleSuccessMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTitle("Lithium - Administración")
        .setTimestamp()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setDescription(`Se ha dado el rol ${roleGive.name} a todos correctamente (este proceso puede tardar unos minutos en terminar, así que por favor sé paciente).`);

    //Get a collection of all the guild members, then filter the bots and give the role to each member.
    msg.guild.members.cache.filter((m) => !m.user.bot).forEach((member) => member.roles.add(roleGive.id));
    //Send the embed that we created before.
    msg.channel.send({ embed: addRoleSuccessMessage });
}

//Add this command to the help.
exports.help = {
    name: "Giverole",
    category: "Administración",
    description: "Dale un rol a todo el mundo.",
    usage: "Giverole [Rol]"
}