/*TODO
Improve this code because is awful.
*/
exports.run = async (_client, msg, args, _content, _command, Discord, config) => {
  let azul = msg.guild.roles.cache.find(azul => azul.name === "⁃ Azul"); 
  let naranja = msg.guild.roles.cache.find(naranja => naranja.name === "⁃ Naranja"); 
  let amarillo = msg.guild.roles.cache.find(amarillo => amarillo.name === "⁃ Amarillo"); 
  let morado = msg.guild.roles.cache.find(morado => morado.name === "⁃ Morado"); 
  let cian = msg.guild.roles.cache.find(cian => cian.name === "⁃ Cian"); 
  let lima = msg.guild.roles.cache.find(lima => lima.name === "⁃ Lima"); 
  let fucsia = msg.guild.roles.cache.find(fucsia => fucsia.name === "⁃ Fucsia"); 
  let aqua = msg.guild.roles.cache.find(aqua => aqua.name === "⁃ Aqua"); 
  let oliva = msg.guild.roles.cache.find(oliva => oliva.name === "⁃ Oliva"); 
  let vinotinto = msg.guild.roles.cache.find(vinotinto => vinotinto.name === "⁃ Vino Tinto"); 
  let gris = msg.guild.roles.cache.find(gris => gris.name === "⁃ Gris"); 
  let verde = msg.guild.roles.cache.find(verde => verde.name === "⁃ Verde"); 
  let magenta = msg.guild.roles.cache.find(magenta => magenta.name === "⁃ Magenta"); 
  let rojo = msg.guild.roles.cache.find(rojo => rojo.name === "⁃ Rojo"); 
  let rosa = msg.guild.roles.cache.find(rosa => rosa.name === "⁃ Rosa"); 
  let color = args[0];
  let prestigeRole = msg.member.roles.cache.find(x => x.name === config.prestigeRole)
  if(!prestigeRole) {
        var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('No tienes permisos para hacer esto.');
        
    msg.channel.send({embed}).catch(console.error);
    return;
  }
  if (!color) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle('Error')
    .setDescription(`
Escoge uno de los siguientes colores:
**⁃ Azul**
**⁃ Naranja**
**⁃ Amarillo**
**⁃ Morado**
**⁃ Cian**
**⁃ Lima**
**⁃ Fucsia**
**⁃ Aqua**
**⁃ Oliva**
**⁃ VinoTinto**
**⁃ Gris**
**⁃ Verde**
**⁃ Magenta**
**⁃ Rojo**
**⁃ Rosa**
`);
    
    msg.channel.send({embed}).catch(console.error);
    return;
  }
if (color.toLowerCase() === "reset") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tus colores fueron reiniciados.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.remove(azul.id);
  msg.member.roles.remove(naranja.id);
  msg.member.roles.remove(amarillo.id);
  msg.member.roles.remove(morado.id);
  msg.member.roles.remove(cian.id);
  msg.member.roles.remove(lima.id);
  msg.member.roles.remove(fucsia.id);
  msg.member.roles.remove(aqua.id);
  msg.member.roles.remove(oliva.id);
  msg.member.roles.remove(vinotinto.id);
  msg.member.roles.remove(gris.id);
  msg.member.roles.remove(verde.id);
  msg.member.roles.remove(magenta.id);
  msg.member.roles.remove(rojo.id);
  msg.member.roles.remove(rosa.id);  
  }  
  
if (color.toLowerCase() === "azul") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Azul.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(azul.id);
  }
if (color.toLowerCase() === "naranja") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Naranja.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(naranja.id);
  }
if (color.toLowerCase() === "amarillo") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Amarillo.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(amarillo.id);
  } 
if (color.toLowerCase() === "morado") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Morado.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(morado.id);
  }    
if (color.toLowerCase() === "cian") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Cian.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(cian.id);
  }    
if (color.toLowerCase() === "lima") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Lima.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(lima.id);
  }
if (color.toLowerCase() === "fucsia") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Fucsia.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(fucsia.id);
  }    
if (color.toLowerCase() === "aqua") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Aqua.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(aqua.id);
  }  
if (color.toLowerCase() === "oliva") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Oliva.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(oliva.id);
  }
if (color.toLowerCase() === "vinotinto") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Vino Tinto.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(vinotinto.id);
  }    
if (color.toLowerCase() === "gris") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Gris.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(gris.id);
  }    
if (color.toLowerCase() === "verde") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Verde.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(verde.id);
  }  
if (color.toLowerCase() === "magenta") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Magenta.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(magenta.id);
  }
if (color.toLowerCase() === "rojo") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Rojo.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(rojo.id);
  } 
if (color.toLowerCase() === "rosa") {
  var embed = new Discord.MessageEmbed()
  .setColor('#ff8c00')
  .setTitle('Literium - Colores')
  .setTimestamp()
  .setFooter(`Solicitado por ${msg.member.displayName}`)
  .setDescription(`Tu color ha sido establecido a Rosa.`); 

  msg.channel.send({embed}).catch(console.error);
  msg.member.roles.add(rosa.id);
  }    
}

exports.help = {
    name: "Color",
    category: "Misceláneo",
    description: "Cambia el color de tu rol.",
    usage: "Color [Color/Reset]",
    example: "",
    status: "Ready"
};