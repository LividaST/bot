import axios from 'axios';
import { registerFont } from 'canvas';
import { Canvas, resolveImage } from 'canvas-constructor';
import chalk from 'chalk';
import { MessageAttachment } from 'discord.js';
import Vibrant from 'node-vibrant';

import { client } from '../';

registerFont(`${process.cwd()}/assets/OpenSans-Bold.ttf`, { family: 'OpenSans Bold' })
registerFont(`${process.cwd()}/assets/OpenSans-Regular.ttf`, { family: 'OpenSans' })

export const createLogger = () => new class Logger {
	info = (message: String) => console.log(`${chalk.bgBlue("  ")} ${message}`);
	debug = (message: String) => console.log(`${chalk.bgRedBright("  ")} ${message}`);
	error = (message: String)  => console.log(`${chalk.bgRed("  ")} ${message}`);
	success = (message: String) => console.log(`${chalk.bgGreen("  ")} ${message}`);
}

export const getChannel = (msg, query) => {
	if (query.length > 3) return msg.mentions.channels.first() || client.channels.cache.get(query) || client.channels.cache.filter(ch => (ch as any).name.includes(query.toLowerCase()) && ch.type === 'text').first()
	else return msg.mentions.channels.first() || client.channels.cache.get(query)
};

export const getCommand = (cmd) => client.aliases.get(cmd.toLowerCase()) || client.commands.get(cmd.toLowerCase()) || false;

export const getUser = (queryy) => {
    const query = queryy.toString()
    const target = client.users.cache.get(query) || client.users.cache.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).first() || client.users.cache.filter(u => u.tag.toLowerCase().includes(query.toLowerCase())).first()
    return target
};

export const upperOne = (input: string) => input.toLowerCase().charAt(0).toUpperCase() + input.substring(1);


export const requestSong = (song: string, user: string) => {
	const body = JSON.stringify({
		name: user,
		type: 'Song Request',
		message: song,
		requestOrigin: 'Discord'
	});
	
	axios('https://livida.net/api/radio/request', {
		method: "POST",
		data: body,
		headers: { 'Content-Type': 'application/json' }
	});
}

export const regenStatsCanvas = async (client) => {
	const data = await client.fetch('https://livida.net/api/radio/').then(res => res ? res.data : {error: true});
    if(data.error) return;


    const title = data.nowplaying.song.name.length > 30 ? data.nowplaying.song.name.substring(0, 27) + '...' : data.nowplaying.song.name,
        artist = data.nowplaying.artist.name,
        dj = data.dj.username,
        thumbnail = await resolveImage(data.nowplaying.album.art),
        djicon = await resolveImage(data.dj.avatar),
        colours = await Vibrant.from(data.nowplaying.album.art).maxColorCount(2).getPalette()
        
    client.nowPlaying = new MessageAttachment(new Canvas(1630, 670)
        .save()
        .beginPath()
        .bezierCurveTo(0, 564, 815, 780, 1630, 564)
        .lineTo(1630, 0)
        .lineTo(0, 0)
        .stroke()
        .printLinearColorGradient(815, 0, 815, 670, [{ position: 0, color: colours.LightVibrant.getHex() }, { position: 100, color: colours.DarkVibrant.getHex() }])
        .fill()
        .restore()
        .printRoundedImage(thumbnail, 330, 125, 350, 350, 25)
        .setTextAlign('center')
        .setTextFont('36px OpenSans Bold')
        .setColor('#FFFFFF')
        .printText(title, 505, 520)
        .setTextFont('36px OpenSans')
        .printText(artist, 505, 565)
        .printCircularImage(djicon, 1125, 300, 175)
        .setTextFont('36px OpenSans Bold')
        .printText(dj, 1125, 520)
		.toBuffer(),
		"nowPlaying.png")

    client.user.setActivity(`${data.nowplaying.song.text} • ${process.env.PREFIX}help`, { type: 'LISTENING' })
}

export const regenNextCanvas = async (client) => {
    const { data } = await client.fetch('https://livida.net/api/radio/timetable/mini').then(res => res ? res.data : {error: true});
    if(data.error) return;
    
    const djicon1 = await resolveImage(data.now.avatar),
        djicon2 = await resolveImage(data.next.avatar),
        djicon3 = await resolveImage(data.later.avatar);

    client.ttCanvas = new MessageAttachment(new Canvas(1600, 750)
        .printRoundedRectangle(0, 0, 1600, 750, 60)
        .printLinearColorGradient(815, 0, 815, 670, [{ position: 0, color: '#8800ff' }, { position: 100, color: '#270049' }])
        .fill()
        .printCircularImage(djicon1, 310, 375, 140)
        .printCircularImage(djicon2, 800, 375, 140)
        .printCircularImage(djicon3, 1290, 375, 140)
        .setTextAlign('center')
        .setTextFont('60px OpenSans Bold')
        .setColor('#FFFFFF')
        .printText('Now', 310, 200)
        .printText('Next', 800, 200)
        .printText('Later', 1290, 200)
        .setTextFont('50px OpenSans')
        .printText(data.now.username, 310, 580)
        .printText(data.next.username, 800, 580)
        .printText(data.later.username, 1290, 580)
        .toBuffer(),
        "timetable.png")
}