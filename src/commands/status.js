exports.run = (_client, msg, _args, _content, _command, Discord) => {
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

  let adressDomain = "play.zafire.org";
  let adressPort = "25565";
  let statsUrl = "https://mcapi.us/server/status?ip=" + adressDomain + "&port=" + adressPort;

  const axios = require("axios").default;
  axios.get(statsUrl).then(function (response) {
    if (response.status === 200) {
      const responseGoodMessage = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("#ff8c00")
        .setTitle("Lithium - Información")
        .setDescription(`
Puede que haya un leve retraso en algunas ocasiones.
A continuación, se muestra un resumen del estado actual del servidor:
\`\`\`yaml
Estado: ${response.data.players.max < 1 ? "Mantenimiento" : "En línea"}
Jugadores: ${response.data.players.now} conectados
\`\`\`
        `)
        .setFooter(`Solicitado por ${msg.member.displayName}`);

      msg.channel.send({ embed: responseGoodMessage });
    } else {
      const responseBadMessage = new Discord.MessageEmbed()
        .setColor("#8b0000")
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)
        .setTitle("Error")
        .setDescription("Error al obtener los datos del servidor.");

      msg.channel.send({ embed: responseBadMessage });
      return;
    }
  }).catch(function (error) {
    console.log(error);
    const errorMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Error al obtener los datos del servidor.");

    msg.channel.send({ embed: errorMessage });
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