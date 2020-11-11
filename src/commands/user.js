exports.run = (_client, msg, args, _command, _content, Discord) => {
    //Check if the member has enough permissions.
    if (!msg.member.roles.cache.find((x) => x.name === "⁃ Administración")) {
        const noEnoughPermsMessage = new Discord.MessageEmbed()
        .setColor("#8b0000")
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle("Error")
        .setDescription("No tienes permisos para ejecutar ese comando.");
      
        msg.channel.send({embed: noEnoughPermsMessage});
        return;
    }

    //Store the member mention.
    const memberMention = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    //Check if there is a member mention.
    if (!memberMention) {
      const invalidMemberMessage = new Discord.MessageEmbed()
        .setColor("#8b0000")
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)
        .setTitle("Error")
        .setDescription("Menciona un usuario o ID válida.");
      
      msg.channel.send({embed: invalidMemberMessage});
      return;
    }
    
    //Variable to store the member activity.
    let memberActivity = "";
    //Check if the activity is undefined.
    if (typeof memberMention.presence.activities[0] === "undefined") { 
        memberActivity = "Indefinida"; 
    } else if (memberMention.presence.activities[0].name === "Custom Status") { //Check if it is a custom status.
        memberActivity = `${memberMention.presence.activities[0].state}`;
    } else {
        //Translate different types of activities.
        switch (memberMention.presence.activities[0].type) {
            case "PLAYING":
                memberActivity = "Jugando a ";
                break;
            case "LISTENING":
                memberActivity = " Escuchando ";
                break;
            case "WATCHING":
                memberActivity = "Viendo ";
                break;
            case "STREAMING":
                memberActivity = "Transmitiendo ";
                break;
        }
        //Finally, set the activity.
        memberActivity += memberMention.presence.activities[0].name;
    }

    const memberRolesArray = memberMention.roles.cache.array();
    let memberRolesList = "";
    for (let i = 0; i < memberRolesArray.length; i++){
        memberRolesList += (String(memberRolesArray[i] + "\n"));
        memberRolesList =  memberRolesArray;
    }

    let memberStatus = "";
    //Translate different presence status.
    switch(memberMention.presence.status){
      case "online": 
        memberStatus = "En línea"; 
        break;
      case "dnd": 
        memberStatus = "No molestar"; 
        break;
      case "idle": 
        memberStatus = "Ausente"; 
        break;
      case "offline": 
        memberStatus = "Desconectado"; 
        break;
    }
    
    //Create the embed with the user information.
    const userInformationMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTimestamp()
        .setTitle("Lithium - Información")
        .setThumbnail(memberMention.user.avatarURL())
        .setFooter(`Solicitado por ${msg.member.displayName}`)	
        .addField("**Información**",`
**Tag:** ${memberMention.user.tag}
**Nombre:** ${memberMention.displayName}
**ID:** ${memberMention.id}
**Avatar:** [Click aquí](${memberMention.user.avatarURL()})
**Creación:** ${memberMention.user.createdAt}
        `)
        .addField("**Detalles**",`
**Estado:** ${memberStatus}
**Presencia:** ${memberActivity}
        `)
        .addField("**Roles**", memberRolesList);

    //Send the embed.
    msg.channel.send({embed: userInformationMessage});
}

//add an entry for this command.
exports.help = {
    name: "User",
    category: "Información",
    description: "Muestra información relacionada con el usuario.",
    usage: "User [@Usuario/ID]"
}