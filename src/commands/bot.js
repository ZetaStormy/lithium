exports.run = (client, msg, _args, _command, _content, Discord) => {
    //Check the channel were the author of message sent the command.
    if (!(msg.channel.name.startsWith("💻┋comandos") || msg.channel.name.startsWith("💫┋off-topic"))) {
        //Create the embed message using MessageEmbed() constructor.
        const incorrectChannelMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)
            .setTitle("Error")
            .setDescription("Usa comandos en los canales correspondientes.");

        //Send the embed to the channel were the command was called.
        msg.channel.send({ embed: incorrectChannelMessage });
        //The return to exit.
        return;
    }

    let presenceStatus;
    //Get the bot presence status and give a format to the string.
    switch (client.user.presence.status) {
        case "online":
            presenceStatus = "En línea";
            break;
        case "dnd":
            presenceStatus = "No molestar";
            break;
        case "idle":
            presenceStatus = "Ausente";
            break;
        case "offline":
            presenceStatus = "Desconectado";
            break;
    }

    let operativeSystem;
    //Get the process platform and give a format to the string.
    switch (process.platform) {
        case "win32":
            operativeSystem = "Windows";
            break;
        case "linux":
            operativeSystem = "Linux";
            break;
        case "darwin":
            operativeSystem = "Darwin";
            break;
        case "openbsd":
            operativeSystem = "OpenBSD";
            break;
        case "sunos":
            operativeSystem = "Solaris";
            break;
        case "freebst":
            operativeSystem = "FreeBSD";
            break;
        default:
            operativeSystem = "Desconocido";
            break;
    }

    //Call functions to get process CPU information.
    const startUsage = process.cpuUsage();

    //Spin the CPU for 500 milliseconds.
    const startTime = Date.now();
    while (Date.now() - startTime < 500);

    //Get elapsed time.
    const elapUsage = process.cpuUsage(startUsage);

    //Get system CPU usage and give it a format.
    const cpuPercent = 10 * (elapUsage.system) / ((Date.now() - startTime) * 1000)

    //Get process uptime in seconds.
    const processUptime = process.uptime();

    //Calculate days, hours, minutes and seconds using the seconds above.
    const days = Math.floor((processUptime % 31536000) / 86400);
    const hours = Math.floor((processUptime % 86400) / 3600);
    const minutes = Math.floor((processUptime % 3600) / 60);
    const seconds = Math.round(processUptime % 60);

    //Give a format to the process uptime.
    const uptimeFormat = (days > 0 ? days + " día(s), " : "") + (hours > 0 ? hours + " hora(s), " : "") + (minutes > 0 ? minutes + " minuto(s), " : "") + (seconds > 0 ? seconds + " segundo(s)" : "");

    //Create the embed message using the MessageEmbed() constructor and then set footer and that stuff.
    const sucessMessage = new Discord.MessageEmbed()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setTitle("Lithium - Información")
        .setColor("#ff8c00")
        .setTimestamp()
        .setDescription(`
Actualmente el bot se encuentra en fase de pruebas y únicamente es usado por ZafireNT, no obstante, puedes acceder al código fuente desde [Github](https://github.com/ZafireNT/lithium).
Lithium está bajo la licencia [GPL-3.0](https://github.com/ZafireNT/lithium/blob/main/LICENSE), por lo que es de código abierto y de libre uso.
A continuación, se muestra la información técnica de Lithium:
\`\`\`yaml
Presencia: ${presenceStatus}
Tiempo de actividad: ${uptimeFormat}
WebSocket: ${Math.round(client.ws.ping)}ms
SO: ${operativeSystem}
CPU: ${cpuPercent}%
RAM: ${((process.memoryUsage().heapUsed / 512) / 512).toFixed(2)}mb
NodeJS: ${process.versions.node}
DiscordJS: ${Discord.version}
\`\`\`
        `);

    //Just send the created embed and catch if an error occurs.
    msg.channel.send({ embed: sucessMessage });
}

//This is for the help command.
exports.help = {
    name: "Bot",
    category: "Información",
    description: "Muestra información del bot.",
    usage: "Bot"
}