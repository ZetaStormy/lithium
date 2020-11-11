exports.run = (_client, msg, Discord, _content, _command) => { 
  //Check the channel were the author of message sent the command.
  if (!msg.channel.name.startsWith(`💻┋comandos`) && !msg.channel.name.startsWith(`💫┋off-topic`)) {
    //Create the embed message using MessageEmbed() constructor.
    const incorrectChannelMessage = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle(`Error`)
      .setDescription('Usa comandos en los canales correspondientes.');
      
    //Send the embed to the channel were the command was called.
    msg.channel.send({embed: incorrectChannelMessage}).catch(console.error);
    //The return to exit.
    return;
  }
  
  let adressDomain = "play.literium.net";
  let adressPort = "25565";
  let statsUrl = 'https://mcapi.us/server/status?ip=' + adressDomain + '&port=' + adressPort;

  const axios = require("axios").default;  
  axios.get(statsUrl).then(function (response) {
    const Discord = require('discord.js');
    if (response.status == 200) {
      const responseGoodMessage = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("#ff8c00")
        .setTitle("Literium - Información")
        .addField("Estado", response.data.online ? "En línea." : "Apagado.", true)
        .addField("Jugadores", `${response.data.players.now}/${response.data.players.max} conectados.`, true)
        .setFooter(`Solicitado por ${msg.member.displayName}`);
  
      msg.channel.send({embed: responseGoodMessage}).catch(console.error);
    } else {
      const responseBadMessage = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('Error al obtener los datos del servidor.'); 
      
      msg.channel.send({embed: responseBadMessage}).catch(console.error);
      return;
    }
  }).catch(function (error) {
    const Discord = require('discord.js');
    console.log(error);
    const errorMessage = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle(`Error`)
      .setDescription('Error al obtener los datos del servidor.'); 
    
    msg.channel.send({embed: errorMessage}).catch(console.error);
    return;
  });
}

//Add the help for this command.
exports.help = {
  name: "Status",
  category: "Información",
  description: "Muestra el estado del servidor.",
  usage: "Status"
}