"use strict";
/* ======================================
*				Imports
 ====================================== */

require("dotenv").config();

const { TELEGRAM } = process.env;

if (!TELEGRAM) {
	console.log("Error: No TELEGRAM variable in enviorement.\nPerhaps you forgot to include it?");
	process.exit(1);
}

const utilities = require("./imports/utilities");
require("./imports/server");
const botgram = require("botgram");

const bot = botgram(TELEGRAM);

/* ======================================
*			Global Variables
 ====================================== */

/* ======================================
*				Commands
 ====================================== */

bot.command("help", "start", (msg, reply) => {
	let message = "¡Hola!\nWelcome!";
	message += "\nConmigo 🤖 puedes traducir mensajes de español a inglés o viceversa: 🇪🇸 ↔ 🇺🇸 ";
	message += "\nWith me 🤖 you can translate messages from english to spanish and viceversa: 🇪🇸 ↔ 🇺🇸 ";
	reply.text(message);
});

bot.command("about", (msg, reply) => {
	let aboutThisBot = "Fui creado con ❤ y algunas buenas intenciones por @Cawolf." +
	"\nSi deseas conocer como se hizo este bot el código base se encuentra" +
	" [aui en el Github de Cawolf](https://github.com/cawolfkreo/simple-Telegram-bot-translator)." +
	"\n¡Ten un buen día! 😄.";
	aboutThisBot += "\n\nI was made with ❤ and some good intentions by @Cawolf." +
		"\nIf you want to know more of how this bot was made the source code is" +
		" [here on Cawolf's Github](https://github.com/cawolfkreo/simple-Telegram-bot-translator)." +
		"\nHave a nice day! 😄.";
	reply.markdown(aboutThisBot);
});

bot.command((msg, reply) => {
	let message = "Lo siento *no entendí tu último comando* 😢.";
	message += "\nI'm sorry, but *I didn't understand your last command* 😢.";
	reply.markdown(message);
});

/* ======================================
*			Other Functions
 ====================================== */

/* ======================================
*				Start-Up 
*				  Info
 ====================================== */
bot.ready(() => {
	console.log(`[${utilities.dateNow()}] Telegram bot ready to listen! with username: ${bot.get("username")}`);
});