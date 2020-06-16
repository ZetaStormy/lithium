exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');  
if (!msg.channel.name.startsWith(`💻┋comandos`)) {
           let no = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usa comandos en los canales correspondientes.');
        
        msg.channel.send(no).catch(console.error);
             return;
}  
  let score = client.getScore.get(msg.author.id, msg.guild.id);  
  const curxp = score.points;
  const curlvl = score.level;
  const nxtLvl = 5000 * (Math.pow(2, score.level) - 1);
  let difference = nxtLvl - curxp;  
  let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
  let embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Niveles')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`
Te falta ${difference} de XP para subir al siguiente nivel.
**Nivel:** ${curlvl}
**XP:** ${curxp}
`)
  if(!member) return msg.channel.send(embed)
  let mscore = client.getScore.get(member.id, msg.guild.id);    
  const mcurxp = mscore.points;
  const mcurlvl = mscore.level;
  let mnxtLvl = 5000 * (Math.pow(2, mcurlvl) - 1); 
  let mdifference = mnxtLvl - mcurxp;    
  let embed2 = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle(`Literium - Niveles`)
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`
A ${member.displayName} le falta ${mdifference} de XP para subir al siguiente nivel.
**Nivel:** ${mcurlvl}
**XP:** ${mcurxp}
`)
 msg.channel.send(embed2)  
  
}


exports.help = {
    name: "Rank",
    category: "Información",
    description: "Muestra tu nivel en el discord.",
    usage: "Rank [@Usuario]",
    example: "",
    status: "Ready"
};