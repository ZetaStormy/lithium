exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');  
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

  const user = msg.mentions.users.first() || client.users.cache.get(args[0]);
  if(!user) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Menciona un usuario válido.');   
    msg.channel.send({embed}).catch(console.error);    
    return;
  }

  const pointsToTake = parseInt(args[1], 10);
  if(!pointsToTake) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Menciona una cantidad de puntos válida.');   
    msg.channel.send({embed}).catch(console.error);    
    return;
  }
  
  if(pointsToTake > 500) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle('Error')
    .setDescription('Introduce una cantidad entre 1 y 500.')
    msg.channel.send({embed}).catch(console.error);
    return;
  }

  let userscore = client.getScore.get(user.id, msg.guild.id);
  let score = client.getScore.get(msg.author.id, msg.guild.id);   
  if (!userscore) {
    userscore = { id: `${msg.guild.id}-${user.id}`, user: user.id, guild: msg.guild.id, points: 0, level: 1 }
  }
  userscore.points -= pointsToTake;

  let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
  userscore.level = userLevel;

  client.setScore.run(userscore);

  var embed = new Discord.MessageEmbed()
  .setTitle("Literium - Niveles")
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Al usuario ${user.tag} se le ha quitado ${pointsToTake} de XP y ahora tiene ${userscore.points} de XP.`)
  .setColor('#ff8c00'); 
  
  msg.channel.send({embed}).catch(console.error)
  msg.guild.channels.cache.find(x => x.id === config.otherLogChannel).send({embed}).catch(console.error);
}

exports.help = {
    name: "Take",
    category: "Administración",
    description: "Quita XP a un usuario.",
    usage: "Take [@Usuario] [Cantidad]",
    example: ""
}; 