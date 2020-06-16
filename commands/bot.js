exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
const SQLite = require("better-sqlite3");  
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
    var game = client.user.presence.type;
        switch(game) {
            case 1: var gtype = "Jugando a"; break;
            case 2: var gtype = "Escuchando a"; break;
            case 3: var gtype = "Mirando a"; break;
            case 4: var gtype = "Transmitiendo";  break;
        };
    switch(client.user.presence.status){
      case "online": var status = "En línea"; break;
      case "dnd": var status = "No molestar"; break;
      case "idle": var status = "Ausente"; break;
      case "offline": var status = "Desconectado"; break;
    };  
    switch(process.platform){
        case "win32": var os = "Windows"; break;
        case "linux": var os = "Linux"; break;
        case "darwin": var os = "Darwin"; break;
        case "openbsd": var os = "OpenBSD"; break;
        case "sunos": var os = "Solaris"; break;
        case "freebst": var os = "FreeBSD"; break;
    };
    const previousUsage = process.cpuUsage();
    const startDate = Date.now();
    while (Date.now() - startDate < 500);
    var uptime = process.uptime();
    var usage = process.cpuUsage(previousUsage);
    const result = 10 * (usage.system) / ((Date.now() - startDate) * 1000) 
    var days = Math.floor((uptime % 31536000) / 86400);
    var hours = Math.floor((uptime % 86400) / 3600);
    var minutes = Math.floor((uptime % 3600) / 60);
    var seconds = Math.round(uptime % 60);
    var botuptime = (days > 0 ? days + " días, ":"") + (hours > 0 ? hours + " horas, ":"") + (minutes > 0 ? minutes + " minutos, ":"") + (seconds > 0 ? seconds + " segundos":"");

    if (!msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
      msg.channel.send({embed}).catch(console.error);
      return;
    } else  
    var embed = new Discord.MessageEmbed()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setTitle('Literium - Información')
        .setColor('#ff8c00')
        .setDescription(`
**Información General**
**Estado:** ${status}
**Tiempo en línea:** ${botuptime}
**WS:** ${Math.round(client.ws.ping)} ms
**Información Técnica**
**Sistema:** ${os}
**Memoria:** ${((process.memoryUsage().heapUsed / 512) / 512).toFixed(2)} MB
**CPU:** ${result}%
**Node:** ${process.versions.node}
**API:** ${Discord.version}
**SQLite:** 7.1.0
       `)
        .setTimestamp();
    msg.channel.send({embed}).catch(console.error);
};

exports.help = {
    name: "Bot",
    category: "Administración",
    description: "Muestra información del bot.",
    usage: "Bot",
    example: "",
    status: "Ready"
};