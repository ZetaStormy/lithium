exports.run = (client, msg, _args, _command, _content, Discord) => {
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

    //Get the bot presence status and give a format to the string.
    switch (client.user.presence.status) {
        case "online": 
            var presenceStatus = "En línea"; 
            break;
        case "dnd": 
            var presenceStatus = "No molestar"; 
            break;
        case "idle": 
            var presenceStatus = "Ausente"; 
            break;
        case "offline": 
            var presenceStatus = "Desconectado"; 
            break;
    }

    //Get the process platform and give a format to the string.
    switch (process.platform) {
        case "win32": 
            var operativeSystem = "Windows"; 
            break;
        case "linux": 
            var operativeSystem = "Linux"; 
            break;
        case "darwin": 
            var operativeSystem = "Darwin"; 
            break;
        case "openbsd": 
            var operativeSystem = "OpenBSD"; 
            break;
        case "sunos": 
            var operativeSystem = "Solaris"; 
            break;
        case "freebst": 
            var operativeSystem = "FreeBSD"; 
            break;
    }

    //Call functions to get process CPU information.
    var startUsage = process.cpuUsage();
    
    //Spin the CPU for 500 milliseconds.
    var startTime = Date.now();
    while (Date.now() - startTime < 500);
    
    //Get elapsed time.
    var elapUsage = process.cpuUsage(startUsage);
    
    //Get system CPU usage and give it a format.
    const cpuPercent = 10 * (elapUsage.system) / ((Date.now() - startTime) * 1000)

    //Get process uptime in seconds.
    var processUptime = process.uptime();

    //Calculate days, hours, minutes and seconds using the seconds above.
    var days = Math.floor((processUptime % 31536000) / 86400);
    var hours = Math.floor((processUptime % 86400) / 3600);
    var minutes = Math.floor((processUptime % 3600) / 60);
    var seconds = Math.round(processUptime % 60);

    //Give a format to the process uptime.
    var uptimeFormat = (days > 0 ? days + " días, ":"") + (hours > 0 ? hours + " horas, ":"") + (minutes > 0 ? minutes + " minutos, ":"") + (seconds > 0 ? seconds + " segundos":"");

    //Create the embed message using the MessageEmbed() constructor and then set footer and that stuff.
    var embed = new Discord.MessageEmbed()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setTitle('Lithium - Información')
        .setColor('#ff8c00')
        .setTimestamp()
        .setDescription(`
Actualmente el bot se encuentra en fase de pruebas y únicamente es usado por LiteriumNT, no obstante, puedes acceder al código fuente desde [Github](https://github.com/LiteriumNT/Lithium).
Lithium está bajo la licencia [GPL-3.0](https://github.com/LiteriumNT/Lithium/blob/community/LICENSE), por lo que es de código abierto y de libre uso.
A continuación, se muestra la información técnica de Lithium:
\`\`\`yaml
Presencia: ${presenceStatus}
Tiempo de actividad: ${uptimeFormat}
WebSocket: ${Math.round(client.ws.ping)}ms
OS: ${operativeSystem}
CPU: ${cpuPercent}%
RAM: ${((process.memoryUsage().heapUsed / 512) / 512).toFixed(2)}mb
NodeJS: ${process.versions.node}
DiscordJS: ${Discord.version}
\`\`\`
        `);

        //Just send the created embed and catch if an error occurs.
        msg.channel.send({embed}).catch(console.error);
};

//This is for the help command.
exports.help = {
    name: "Bot",
    category: "Administración",
    description: "Muestra información del bot.",
    usage: "Bot",
    example: "",
    status: "Ready"
};