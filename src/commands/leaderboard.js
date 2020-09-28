exports.run = async (client, msg, _args, _content, _command, Discord) => {
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
  //Create a constant for the SQLite module.
  const SQLite = require("better-sqlite3");
  //Create a constant for the scores database.
  const sql = new SQLite('./scores.sqlite'); 
  //Get the data from the leaderboard and store it in a constant.
  const getLeaderboardCount = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 5;").all(msg.guild.id);
  
  //Create the leaderboard embed.
  var embed = new Discord.MessageEmbed()
  .setTitle("Lithium - Niveles")
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setColor('#ff8c00')
  
  //Create the leaderboard using a for loop with the lenght of the leaderboard.
  for (let i = 0; i < getLeaderboardCount.length; i++) {
    //Store the data in this constant.
    const data = getLeaderboardCount[i];

    //Create a variable for the name of each user.
    var userTag;
    //Check if the data of the user is undefined.
    if ((await client.users.fetch(data.user)) === undefined) { 
      userTag = "Usuario Desconocido"; 
    } else {
      userTag = (await client.users.fetch(data.user)).tag;
    }

    //Create variables for the levels and experience
    var userExperience = data.points;
    var userLevel = data.level;
    //Finally create the field where we store the data of each user.
    embed.addField(`\`${i + 1}\` ${userTag}`, `${userExperience} XP - Nivel ${userLevel}`);
  }
  //Send the leaderboard.
  msg.channel.send({embed});  
}

//Add to the help.
exports.help = {
    name: "Leaderboard",
    category: "Información",
    description: "Entrega una lista de las 5 personas con más XP.",
    usage: "Leaderboard",
    example: "",
    status: "Ready"
};