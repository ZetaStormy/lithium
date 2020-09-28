exports.run = (_client, msg, args, _command, _content, Discord) => {
    //Check if the sender has the role administrator.
    if (!msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
        //Create the embed using the MessageEmbed() constructor.
        var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)
        .setTitle(`Error`)
        .setDescription('No tienes permisos para ejecutar ese comando.');
        
        //Send the embed to the channel where this command was executed.
        msg.channel.send({embed}).catch(console.error);
        //Return to exit this command.
        return;
    }

    //Create this variable where we store the announcement channel.
    const announcementChannel = msg.mentions.channels.first();
    //Check if there is an announcement channel in the command.
    if (!announcementChannel) {
        //Create the embed using MessageEmbed().
        var embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('Ingresa el canal, el título y el mensaje.');
        
        //Send this embed and then return to exit the command.
        msg.channel.send({embed}).catch(console.error)
        return;
    }

    //Check if the bot can delete the message.
    if (msg.deletable) msg.delete();
    //Create variables where we store the messages.
    var authorMessage = args.splice(2, args.length - 1).join(" ");
    var authorTitle = args.splice(1, args.length - 1).join(" ");

    //Create the embed of the announcement.
    var embed = new Discord.MessageEmbed()
    .setColor('#ff8c00')
    .setTimestamp()
    .setTitle(authorTitle)
    .setThumbnail('https://i.imgur.com/OO3sCse.jpg')
    .setFooter(`Enviado por ${msg.member.displayName}`,`${msg.author.avatarURL()}`)
    .setDescription(authorMessage);
    
    //Send this embed to the channel in the arguments.
    announcementChannel.send({embed}).catch(console.error);
}   

//Create an entry for this command.
exports.help = {
    name: "Announce",
    category: "Administración",
    description: "Envia un anuncio al canal especificado.",
    usage: "Announce [Canal] [Título] [Mensaje]",
    example: ""
};