const fs = require("fs");
exports.run = (_client, msg, args, _content, _command, Discord, config) => {
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
    var req = args[0];
    
    var files = fs.readdirSync('./commands/');
    const commands = [];
    for (i in files) {
        var cmd = files[i];
        commands.push(cmd.replace(".js",""));
    };
    
    if (typeof req === 'undefined') {
        var catList = [];
        for (i in commands) {
            var cmd = require("../commands/" + commands[i] + ".js");
            if (catList.indexOf(cmd.help.category) < 0) {catList.push(cmd.help.category)}
        };
        var result = "";
        for (var i = 0; i < catList.length; i++){
            result += ("- " + String(catList[i] + "\n"));
        };
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTimestamp()
            .setTitle("Literium - Comandos")
            .setFooter(`Solicitado por ${msg.member.displayName}`)
            .setDescription(`Obtén la lista de comandos con **-help [Categoría]**. \n**Categorías:** \n${result}`);
            msg.channel.send({embed}).catch(console.error);
    } else {
        if (req.toLowerCase() === "owner" && msg.author.id !== config.owner) {
        var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
            msg.channel.send({embed}).catch(console.error);
        } else {
            var embed = new Discord.MessageEmbed()
                .setColor('#ff8c00')
                .setTitle(`Literium - ${req}`)
                .setTimestamp()
                .setFooter(`Solicitado por ${msg.member.displayName}`)
                for (y in commands) {
                    var cmd = require("../commands/" + commands[y] + ".js");
                    if(cmd.help.category.toLowerCase() === req.toLowerCase()) {
                        embed.addField(`**${config.prefix}${cmd.help.usage}**`, `${cmd.help.description}`)
                    };
                };
            msg.channel.send({embed}).catch(console.error);
            };
    };
};

exports.help = {
    name: "Help",
    category: "Información",
    description: "Muestra todos los comandos disponibles.",
    usage: "Help [Categoría]",
    example: "",
    status: "Untested"
};