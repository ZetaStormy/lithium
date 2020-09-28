exports.run = (_client, msg, args, _command, _content, Discord) => {
    //Check if the member has enough permissions.
    if (!msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
        var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('No tienes permisos para ejecutar ese comando.');
      
        msg.channel.send({embed}).catch(console.error);
        return;
    }

    //Store the member mention.
    var memberMention = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    //Check if there is a member mention.
    if (!memberMention) {
      var embed = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle('Error')
      .setDescription('Menciona un usuario o ID válida.');
      
      msg.channel.send({embed}).catch(console.error);
      return;
    }
    
    //Variable to store the member activity.
    var memberActivity;
    //Check if the activity is undefined.
    if (memberMention.presence.activities[0] === undefined) { 
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

    var memberRolesArray = memberMention.roles.cache.array();
    for (var i = 0; i < memberRolesArray.length; i++){
        memberRoles += (String(memberRolesArray[i] + "\n"));
        var memberRoles =  memberRolesArray;
    }

    //Translate different presence status.
    switch(memberMention.presence.status){
      case "online": 
        var mstatus = "En línea"; 
        break;
      case "dnd": 
        var mstatus = "No molestar"; 
        break;
      case "idle": 
        var mstatus = "Ausente"; 
        break;
      case "offline": 
        var mstatus = "Desconectado"; 
        break;
    }
    
    //Create the embed with the user information.
    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle('Lithium - Información')
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
**Estado:** ${mstatus}
**Presencia:** ${memberActivity}
            `)
    .addField("**Roles**", memberRoles);

    //Send the embed.
    msg.channel.send({embed}).catch(console.error);
}

//add an entry for this command.
exports.help = {
    name: "User",
    category: "Información",
    description: "Muestra información relacionada con el usuario.",
    usage: "User [@Usuario/ID]",
    example: "",
    status: "Ready"
};