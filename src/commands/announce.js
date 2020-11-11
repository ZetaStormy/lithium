exports.run = (_client, msg, args, _command, _content, Discord) => {
    const authorName = msg.member.displayName;
    //Check if the sender has the administration role.
    if (!msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
        //Create the embed using the MessageEmbed() constructor.
        const notEnoughPermissionsMessage = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${authorName}`)
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
        //Send the embed to the channel where this command was executed.
        msg.channel.send({embed: notEnoughPermissionsMessage}).catch(console.error);
        //Return to exit this command.
        return;
    }

    const authorObject = msg.author;
    const messageChannel = msg.channel;
    //Create this variable where we store the announcement channel.
    const announcementChannel = msg.mentions.channels.first();
    //Check if there is an announcement channel in the command.
    if (!announcementChannel) {
        //Create the embed using MessageEmbed().
        const notEnoughArgumentsMessage = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${authorName}`)        
            .setTitle(`Error`)
            .setDescription('Ingresa un canal válido.');
        
        //Send this embed and then return to exit the command.
        msg.channel.send({embed: notEnoughArgumentsMessage}).catch(console.error)
        return;
    }

    const awaitTitleMessage = new Discord.MessageEmbed()
        .setColor('#ff8c00')
        .setTitle('Lithium - Administración')
        .setTimestamp()
        .setFooter(`Enviado a ${authorName}`)
        .setDescription(`Por favor, ingresa un título en menos de 30 segundos.`);
    
    //Send the embed and then delete the embed to keep the chat clear.
    msg.channel.send({embed: awaitTitleMessage}).catch(console.error).then(msg => {
        const filter = m => m.author.id === authorObject.id;
        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {
            msg.delete().catch(console.error);
            const titleMessage = collected.array();
            const titleCollectedMessage = new Discord.MessageEmbed()
                .setColor('#ff8c00')
                .setTitle("Lithium - Administración")
                .setTimestamp()
                .setFooter(`Enviado a ${authorName}`)
                .setDescription("El título del anuncio será: " + titleMessage);
            
            msg.channel.send({embed: titleCollectedMessage}).catch(console.error).then(msg => {
                msg.delete({timeout: 10000}).catch(console.error).then(msg => {
                    const awaitAnnounceMessage = new Discord.MessageEmbed()
                        .setColor('#ff8c00')
                        .setTitle("Lithium - Administración")
                        .setTimestamp()
                        .setFooter(`Enviado a ${authorName}`)
                        .setDescription("Por favor, ingresa un anuncio en menos de 120 segundos.")

                    msg.channel.send({embed: awaitAnnounceMessage}).catch(console.error).then(msg => {
                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 120000,
                            errors: ['time']
                        }).then(collected => {
                            const announceMessage = collected.array();
                            const announceCollectedMessage = new Discord.MessageEmbed()
                                .setColor('#ff8c00')
                                .setTitle("Lithium - Administración")
                                .setTimestamp()
                                .setFooter(`Enviado a ${authorName}`)
                                .setDescription("El mensaje del anuncio será: " + announceMessage);
                        
                            msg.channel.send({embed: announceCollectedMessage}).catch(console.error).then(msg => {
                                msg.delete({timeout: 20000}).catch(console.error).then(msg => {
                                    //Create the embed of the announcement.
                                    const announcementMessage = new Discord.MessageEmbed()
                                        .setColor('#ff8c00')
                                        .setTimestamp()
                                        .setTitle(titleMessage)
                                        .setThumbnail('https://i.imgur.com/OO3sCse.jpg')
                                        .setFooter(`Enviado por ${authorName}`,`${authorObject.avatarURL()}`)
                                        .setDescription(announceMessage);

                                    //Send this embed to the channel in the arguments.
                                    announcementChannel.send({embed: announcementMessage}).catch(console.error).then(msg => {
                                        const announceSucessMessage = new Discord.MessageEmbed()
                                            .setColor('#ff8c00')
                                            .setTitle("Lithium - Administración")
                                            .setTimestamp()
                                            .setFooter(`Solicitado por ${authorName}`)
                                            .setDescription(`Se ha enviado tu anuncio al canal ${announcementChannel} correctamente.`)
                                        
                                        messageChannel.send({embed: announceSucessMessage}).catch(console.error).then(msg => {
                                            msg.delete({timeout: 10000}).catch(console.error);
                                        });
                                    });
                                });
                            });
                        }).catch(_collected => {
                            const timeoutAnnounceMessage = new DiscordMessageEmbed()
                                .setColor('#8b0000')
                                .setTimestamp()
                                .setFooter(`Denegado a ${authorName}`)
                                .setTitle(`Error`)
                                .setDescription('No se ha recibido ningún mensaje válido.');
                        
                            //Send the embed and then delete the embed to keep the chat clear.
                            msg.channel.send({embed: timeoutAnnounceMessage}).catch(console.error).then(msg => {
                                msg.delete({timeout: 10000}).catch(console.error);
                            });
                        });
                    })
                });
            });
        }).catch(_collected => {
            msg.delete().catch(console.error);
            const timeoutTitleMessage = new Discord.MessageEmbed()
                .setColor('#8b0000')
                .setTimestamp()
                .setFooter(`Denegado a ${authorName}`)
                .setTitle(`Error`)
                .setDescription('No se ha recibido ningún título válido.');
            
            //Send the embed and then delete the embed to keep the chat clear.
            msg.channel.send({embed: timeoutTitleMessage}).catch(console.error).then(msg => {
                msg.delete({timeout: 10000}).catch(console.error);
            });
        });
    });
}   

//Create an entry for this command.
exports.help = {
    name: "Announce",
    category: "Administración",
    description: "Envia un anuncio al canal especificado.",
    usage: "Announce [Canal]",
}