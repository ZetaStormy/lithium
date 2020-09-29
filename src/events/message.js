//Define that Discord requires discord.js package.
const Discord = require("discord.js");

exports.run = (client, message) => {
  //Check if the message author is a bot.
  if (message.author.bot) return; 
  //TODO: Improve checks.
  //Store all the checks in constant using RegExp() constructor.
  const firstCheckForIP = new RegExp('([\d]{1,3}[., ]{1,}){3,}([\d]{1,3})');
  const secondCheckForIP = new RegExp('(discord)[^\wñ]*(gg\/|me\/)([\w]( )?){4,}');
  const thirdCheckForIP = new RegExp('(mc.|.org|hypixel.net|.biz|.name|.xyz|.mobi|.kz|.tk|server.pro|.serv.nu|.adult|.sex|.xxx|.webcam|.wtf|.sexy)');
  const firstCheckForNSFW = new RegExp('(pornhub.|xvideos.)')
  
  //Check if the message matches with the first check.
  if (message.content.match(firstCheckForIP)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: firstCheckForIP`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription(`Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.`);        

    message.author.send({embed}).catch(console.error);
    return;  
  }

  //Check if the message matches with the second check.
  if (message.content.match(secondCheckForIP)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: secondCheckForIP`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription(`Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.`);        

    message.author.send({embed}).catch(console.error);
    return;  
  }  
  
  //Check if the message matches with the third check.
  if (message.content.match(thirdCheckForIP)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: thirdCheckForIP`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription(`Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.`);

    message.author.send({embed}).catch(console.error);
    return;  
  }   
  
  //Check if the message content is a NSFW link.
  if (message.content.match(firstCheckForNSFW)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: firstCheckForNSFW`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription(`Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.`);

    message.author.send({embed}).catch(console.error);
    return;  
  }   
  
  if (message.guild) {
    //Create the variable score.
    let score = client.getScore.get(message.author.id, message.guild.id);
    //Check if there is data for this user in the database, if not create it.
    if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1,
      }
    }
    
    //Create the formula to increment the experience every message.
    const experienceIncrement = Math.floor(Math.random() * 1) + 500;
    //Create a constant of the current experience.
    const currentExperience = score.points;
    //Create a constant of the current level.
    const currentLevel = score.level;
    //Create a formula for the next level.
    const nextLevel = 5000 * (Math.pow(2, score.level) - 1);
    //Add experience every message.
    score.points = currentExperience + experienceIncrement;
    //Check if nextLevel is bigger than score.points to increase the level
    if (nextLevel <= score.points) {
      //Increase the level by one.
      score.level = currentLevel + 1;

      //Create an embed to say that the user level up
      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Niveles')
      .setTimestamp()
      .setFooter(`Enviado a ${message.member.displayName}`)
      .setDescription(`¡Has subido a nivel ${currentLevel + 1}!`); 

      message.channel.send({embed}).catch(console.error);        
    }

    //Set the new experience and level value in the database.
    client.setScore.run(score);

    //Check if the level is 15 or bigger.
    if (score.level >= 15) {
      //Add the prestige role if it is bigger or equal.
      message.guild.member.roles.add(message.guild.roles.cache.find(x => x.name === "⁃ Prestigio")).catch(console.error);     
    } 
  }
}