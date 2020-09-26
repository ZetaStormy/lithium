exports.run = async (client, msg, _args, _content, _command, Discord) => {
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite'); 
const getLeaderboardCount = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 5;").all(msg.guild.id);
  if (!msg.channel.name.startsWith(`💻┋comandos`)) {
           var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usa comandos en los canales correspondientes.');
        
        msg.channel.send({embed}).catch(console.error);
             return;
}    
var embed = new Discord.MessageEmbed()
  .setTitle("Literium - Niveles")
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription("**Ranking**")
  .setColor('#ff8c00');
  
    for (let i = 0; i < getLeaderboardCount.length; i++) {
      const data = getLeaderboardCount[i];
    
  var user;
  if ((await client.users.fetch(data.user)) === undefined) { user = "Usuario Desconocido"; }   
  else {
    user = (await client.users.fetch(data.user)).tag;
  }  
  var xp = data.points;
  var level = data.level;
  embed.addField(`\`${i + 1}\` ${user}`, `${xp} XP - Nivel ${level}`);
    }
return msg.channel.send({embed});  
}

exports.help = {
    name: "Leaderboard",
    category: "Información",
    description: "Entrega una lista de las 5 personas con más XP.",
    usage: "Leaderboard",
    example: "",
    status: "Ready"
};