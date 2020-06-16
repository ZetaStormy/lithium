const config = require("../config.json");
const Discord = require("discord.js");

exports.run = (client, message) => {
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
if (message.author.bot) return; 
  const firstCheckForIP = new RegExp('([\d]{1,3}[., ]{1,}){3,}([\d]{1,3})');
  const secondCheckForIP = new RegExp('(discord)[^\wñ]*(gg\/|me\/)([\w]( )?){4,}');
  const thirdCheckForIP = new RegExp('(mc.|.org|hypixel.net|.biz|.name|.xyz|.mobi|.kz|.tk|server.pro|.serv.nu|.adult|.sex|.xxx|.webcam|.wtf|.sexy)');
  const firstCheckForNSFW = new RegExp('(pornhub.|xvideos.)')
  
  if (message.content.match(firstCheckForIP)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: firstCheckForIP`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription
    (`
Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.
`);        
    message.author.send({embed}).catch(console.error);
    return;  
  }

  if (message.content.match(secondCheckForIP)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: secondCheckForIP`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription
    (`
Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.
`);        
    message.author.send({embed}).catch(console.error);
    return;  
  }  
  
  if (message.content.match(thirdCheckForIP)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: thirdCheckForIP`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription
    (`
Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.
`);        
    message.author.send({embed}).catch(console.error);
    return;  
  }   
  
  if (message.content.match(firstCheckForNSFW)) {
    message.delete().catch(console.error);
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Enviado a ${message.author.username} | Check: firstCheckForNSFW`)        
    .setTitle(`Literium - Moderación Automática`)
    .setDescription
    (`
Se ha eliminado un mensaje tuyo que contenía **${message.content}** en ${message.channel}, por contener contenido inapropiado. ¿Piensas que eliminé tu mensaje de forma inapropiada?, contacta a un **Staff** en caso de que creas eso.
`);        
    message.author.send({embed}).catch(console.error);
    return;  
  }   
  
    let score;
    if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
            score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 1,
            };
        }
        const xpAdd = Math.floor(Math.random() * 1) + 50;
        const curxp = score.points;
        const curlvl = score.level;
        const nxtLvl = 5000 * (Math.pow(2, score.level) - 1);
        score.points = curxp + xpAdd;
        if (nxtLvl <= score.points) {
            score.level = curlvl + 1;
        var embed = new Discord.MessageEmbed()
        .setColor('#ff8c00')
        .setTitle('Literium - Niveles')
        .setTimestamp()
        .setFooter(`Enviado a ${message.member.displayName}`)
        .setDescription(`¡Has subido a nivel ${curlvl + 1}!`); 
  
        message.channel.send({embed}).catch(console.error);
  if (score.level === 15) {
    const role = message.guild.roles.cache.find(prestigio => prestigio.name === "⁃ Prestigio");

    message.guild.member.roles.add(role) 
      .catch(console.error);     
  }          
        }
        client.setScore.run(score);
    }
  
};