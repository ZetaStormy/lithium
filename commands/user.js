exports.run = (_client, msg, args, _command, _content, Discord) => {
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
    var Input = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if (!Input) {
      var embed = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle('Error')
      .setDescription('Menciona un usuario o ID válida.');
      
      msg.channel.send({embed}).catch(console.error);
      return;
    }
  
    var user = Input;
      var activity;
        if (user.presence.activities[0] === undefined) { activity = "Indefinida"; }         
        else if (user.presence.activities[0].name === "Custom Status") {
            activity = `${user.presence.activities[0].state}`;
        } else {
            switch (user.presence.activities[0].type) {
                case "PLAYING":
                    activity = "Jugando a ";
                    break;
                case "LISTENING":
                    activity = " Escuchando ";
                    break;
                case "WATCHING":
                    activity = "Viendo ";
                    break;
                case "STREAMING":
                    activity = "Transmitiendo ";
                    break;
            }
            activity += user.presence.activities[0].name;
        }
    var roles = user.roles.cache.array();
    for (var i = 0; i < roles.length; i++){
        result += (String(roles[i] + "\n"));
        var result =  roles;
    };  

    switch(user.presence.status){
      case "online": var mstatus = "En línea"; break;
      case "dnd": var mstatus = "No molestar"; break;
      case "idle": var mstatus = "Ausente"; break;
      case "offline": var mstatus = "Desconectado"; break;
    }; 
      
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTimestamp()
            .setTitle('Literium - Información')
            .setThumbnail(user.user.avatarURL())
            .setFooter(`Solicitado por ${msg.member.displayName}`)	
            .addField("**Información**",`
**Tag:** ${user.user.tag}
**Nombre:** ${user.displayName}
**ID:** ${user.id}
**Avatar:** [Click aquí](${user.user.avatarURL()})
**Creación:** ${user.user.createdAt}
            `)
            .addField("**Detalles**",`
**Estado:** ${mstatus}
**Presencia:** ${activity}
            `)
            .addField("**Roles**", result);
        msg.channel.send({embed}).catch(console.error);
};

exports.help = {
    name: "User",
    category: "Información",
    description: "Muestra información relacionada con el usuario.",
    usage: "User [@Usuario/ID]",
    example: "",
    status: "Ready"
};