//Define discord.
const Discord = require("discord.js");
//Define the configuration.
const config = require("../config.json");

//Export the client (Created with Discord.Client() constructor) and the member (Object of GuildMember).
exports.run = (client, member) => {
  //Store the join log channel ID
  const joinChannel = config.joinLogChannel;

  const memberJoinMessage = new Discord.MessageEmbed()
  .setColor("#ff8c00")
  .setTimestamp()
  .setTitle("Lithium - Entrada")
  .setDescription(`
¡Alguien nuevo ha entrado al servidor de Discord!
\`\`\`yaml
Informacion:
  Nombre: ${member.displayName}
  Tag: ${member.user.tag}
  ID: ${member.user.id}
  Creación: ${member.user.createdAt}
\`\`\`
  `);

  //Add default role to the member.
  member.roles.add(member.guild.roles.cache.find(role => role.name === "⁃ Jugador"));
  //Send the message to the join log channel.
  client.channels.cache.find((x) => x.id === joinChannel).send({embed:memberJoinMessage});
} 