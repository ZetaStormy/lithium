exports.run = (_client, msg, Discord, _content, _command, request) => { 
  //Check the channel were the author of message sent the command.
  if (!msg.channel.name.startsWith(`💻┋comandos`) && !msg.channel.name.startsWith(`💫┋off-topic`)) {
    //Create the embed message using MessageEmbed() constructor.
    var incorrectChannel = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('Usa comandos en los canales correspondientes.');
      
    //Send the embed to the channel were the command was called.
    msg.channel.send({incorrectChannel}).catch(console.error);
    //The return to exit.
    return;
  }
  
  //TODO: Recode this command.
  const adressDomain = "play.literium.net";
  const adressPort = "25565";
  const statsURL = "http://mcapi.us/server/status?ip=" + adressDomain + "&port=" + adressPort;
  request(statsURL, function (err, response, body) {
    if (err) {
      console.log(err);
      let embed = new Discord.MessageEmbed()
      .setColor('#8b0000')
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)        
      .setTitle(`Error`)
      .setDescription('Error al obtener los datos del servidor.'); 
      
      msg.channel.send({embed}).catch(console.error);
      return;
    }
    body = JSON.parse(body);
    let adressStatus = "Apagado.";
    if (body.online) {
      adressStatus = "Encendido.";
    }   
    let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#ff8c00")
    .setTitle("Literium - Información")
    .addField("Estado", adressStatus, true)
    .addField("Jugadores", `${body.players.now} conectados.` || `0 conectados.`, true)
    .setFooter(`Solicitado por ${msg.member.displayName}`);

    msg.channel.send({embed}).catch(console.error);
  });
 };

//Add the help for this command.
exports.help = {
    name: "Status",
    category: "Información",
    description: "Muestra el estado del servidor.",
    usage: "Status",
    example: ""
};