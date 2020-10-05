exports.run = (_client, msg, args, _command, _content, Discord, config) => {
    /* This is just a simple command to give a role to everyone on a discord server
     * I just made this command to help a friend that needed it.
    */
    //Check if the author is the owner of the bot (You can change that in config.json).
    if (msg.author.id !== config.owner) {        
        let noPerms = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('No tienes permisos para ejecutar ese comando.');
        
        msg.channel.send(noPerms).catch(console.error);
        return;
    }

    //Find the role that is in the first argument.
    let roleGive = msg.guild.roles.cache.find(x => x.id === args[0]);
    if (!roleGive) { //Check if the role exists or if we have the arguments of the role.
        let noArgs = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('Por favor, introduce el rol que deseas dar.');
        
        msg.channel.send(noArgs).catch(console.error);
        return;
    }

    //Create the embed that is sent when the process is successful.
    let addRoleSuccess = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTitle('Lithium - Administración')
    .setTimestamp()
    .setFooter(`Solicitado por ${msg.member.displayName}`)
    .setDescription(`Se ha dado el rol ${roleGive.name} a todos correctamente (este proceso puede tardar unos minutos en terminar, así que por favor sé paciente).`);
    
    //Get a collection of all the guild members, then filter the bots and give the role to each member.
    msg.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(roleGive.id).catch(console.error));
    //Send the embed that we created before.
    msg.channel.send(addRoleSuccess).catch(console.error);
}

//Add this command to the help.
exports.help = {
    name: "Addrole",
    category: "Administración",
    description: "Dale un rol a todo el mundo.",
    usage: "Addrole [Rol]",
    example: "",
    status: "Ready"
}