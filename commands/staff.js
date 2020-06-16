exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
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
  const helper = msg.guild.roles.cache.find(x => x.name === "⁃ Helper");
  const mod = msg.guild.roles.cache.find(x => x.name === "⁃ Moderator");
  const sMod = msg.guild.roles.cache.find(x => x.name === "⁃ Superior Moderator");  
  const executive = msg.guild.roles.cache.find(x => x.name === "⁃ Executive");
  const admin = msg.guild.roles.cache.find(x => x.name === "⁃ Administrator");
  const owner = msg.guild.roles.cache.find(x => x.name === "⁃ Owner");
  const founder = msg.guild.roles.cache.find(x => x.name === "⁃ Founder");
  var list = helper.members.map(m=>m.user.tag).sort();
  var result = "";
  for (var i = 0; i < list.length; i++){
    result += ("- " + String(list[i] + "\n"));
  };
  var list2 = mod.members.map(m=>m.user.tag).sort();
  var result2 = "";
  for (var i = 0; i < list2.length; i++){
    result2 += ("- " + String(list2[i] + "\n"));
  };  
  var list3 = sMod.members.map(m=>m.user.tag).sort();
  var result3 = "";
  for (var i = 0; i < list3.length; i++){
    result3 += ("- " + String(list3[i] + "\n"));
  };
  var list4 = executive.members.map(m=>m.user.tag).sort();
  var result4 = "";
  for (var i = 0; i < list4.length; i++){
    result4 += ("- " + String(list4[i] + "\n"));
  };   
  var list5 = admin.members.map(m=>m.user.tag).sort();
  var result5 = "";
  for (var i = 0; i < list5.length; i++){
    result5 += ("- " + String(list5[i] + "\n"));
  }; 
  var list6 = owner.members.map(m=>m.user.tag).sort();
  var result6 = "";
  for (var i = 0; i < list6.length; i++){
    result6 += ("- " + String(list6[i] + "\n"));
  };
  var list7 = founder.members.map(m=>m.user.tag).sort();
  var result7 = "";
  for (var i = 0; i < list7.length; i++){
    result7 += ("- " + String(list7[i] + "\n"));
  };    
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTimestamp()
  .setTitle('Literium - Información')
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .addField("**Founders**", result7 || 'Sin usuarios.')  
  .addField("**Owners**", result6 || 'Sin usuarios.')  
  .addField("**Administrators**", result5 || 'Sin usuarios.')  
  .addField("**Executives**", result4 || 'Sin usuarios.')  
  .addField("**S-Moderators**", result3 || 'Sin usuarios.')  
  .addField("**Moderators**", result2 || 'Sin usuarios.')  
  .addField("**Helpers**", result || 'Sin usuarios.')
        
  msg.channel.send({embed}).catch(console.error);
};     

exports.help = {
    name: "Staff",
    category: "Información",
    description: "Muestra a el Staff de LiteriumNT.",
    usage: "Staff",
    example: ""
};