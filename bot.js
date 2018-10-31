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
const translate = require("google-translate-api");
const botgram = require("botgram");

const bot = botgram(TELEGRAM);

/* ======================================
*			Global Variables
 ====================================== */
/**
 * English
 */
const en = "en";
/**
 * Spanish
 */
const es = "es";

/* ======================================
*				Commands
 ====================================== */

bot.command("help",  "ayuda", "start", (msg, reply) => {
	const username = "@" + bot.get("username");
	if (msg.chat.type !== "user" &&
		(msg.type !== "text" || msg.text.includes(username))) {
		reply.text("Solo en privado 😉/Only in private😉.");
	} else {
		let message = "¡Hola!\nWelcome!";
		message += "\nConmigo 🤖 puedes traducir mensajes de español a inglés o viceversa: 🇪🇸 ↔ 🇺🇸 ";
		message += "\nWith me 🤖 you can translate messages from english to spanish and viceversa: 🇪🇸 ↔ 🇺🇸 ";
		reply.text(message);
	}
});

bot.command("about", "acercade", (msg, reply) => {
	if (msg.chat.type !== "user" &&
		(msg.type !== "text" || msg.text.includes("@" + bot.get("username")))) {
		reply.text("Solo en privado 😉/Only in private😉.");
	} else {
		let aboutThisBot = "Fui creado con ❤ y algunas buenas intenciones por @Cawolf." +
			"\nSi deseas conocer como se hizo este bot el código base se encuentra" +
			" [aui en el Github de Cawolf](https://github.com/cawolfkreo/simple-Telegram-bot-translator)." +
			"\n¡Ten un buen día! 😄.";
		aboutThisBot += "\n\nI was made with ❤ and some good intentions by @Cawolf." +
			"\nIf you want to know more of how this bot was made the source code is" +
			" [here on Cawolf's Github](https://github.com/cawolfkreo/simple-Telegram-bot-translator)." +
			"\nHave a nice day! 😄.";
		reply.markdown(aboutThisBot);
	}
});

/**
 * Translates from Spanish to english
 */
bot.command("traducir", (msg, reply) => translationHandler(msg, reply, true));

/**
 * Translates from Spanish to english
 */
bot.command("translate", (msg, reply) => translationHandler(msg, reply, false));

bot.command((msg, reply) => {
	let forMe = true;
	if (msg.chat.type !== "user" &&
		(msg.type !== "text" || msg.text.includes("@" + bot.get("username")))) {
		forMe = false;
	}

	if (forMe) {
		let message = "Lo siento *no entendí tu último comando* 😢.";
		message += "\nI'm sorry, but *I didn't understand your last command* 😢.";
		reply.markdown(message);
	}
});

/* ======================================
*			Other Functions
 ====================================== */
/**
 * This is the handler for the two translation commands, it makes sure the message is for the the bot 
 * and parses the message for the translator. 
 * @param {Message} msg the message received by the bot
 * @param {Reply} reply the reply received by the bot
 * @param {Boolean} direction true for spanish to english and false for english to spanish
 */
function translationHandler(msg, reply, direction) {
	let paraMi = true;
	if (msg.chat.type !== "user" &&
		(msg.type !== "text" || msg.text.includes("@" + bot.get("username")))) {
		paraMi = false;
	}

	const command = direction ? "traducir" : "translate";

	if (paraMi && msg.type === "text") {
		const message = msg.text.replace(`/${command}`, "").trim();
		traduc(message, direction)
			.then(translation => reply.text(translation.text))
			.catch(err => console.log(`[${utilities.dateNow()}] Error: ${err}`));
	}
}

/**
 * Takes a text and a direction for the translation and asynchronously requests a translation from the google api.
 * @param {String} text the text message to translate
 * @param {Boolean} direction true for spanish to english and false for english to spanish
 * @returns A promise with the result.
 */
function traduc(text, direction) {
	if (text.length <= 0) return new Promise(resolve => {
		const res = { text: "Please don't send empty messages/No envies mensajes vacios :C" };
		resolve(res);
	});
	const options = { from: (direction ? es : en), to: (direction ? en : es) };

	return translate(text, options);
}

/* ======================================
*				Start-Up 
*				  Info
 ====================================== */
bot.ready(() => {
	console.log(`[${utilities.dateNow()}] Telegram bot ready to listen! with username: ${bot.get("username")}`);
});