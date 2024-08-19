require("fetch");
require("dotenv").config();
const {EmbedBuilder} = require("discord.js");
const { game_info, name_list } = require('./enums.js');


function get_players(data) {
	const players = [];
	
	for (let i = 0; i < data.teams.length; i++) {
		data.teams[i].map((player) => {
			let newPlayer = {
				id: player.player.profile_id,
				name: player.player.name,
				civ: player.player.civilization
			};
			if(!game_info.result)
				name_list.includes(player.player.name) ? game_info.result = player.player.result : null
			players.push(newPlayer);
		});
	}
	return players;
}

async function get_elo(id) {
	const response = await fetch(`${process.env.PROFILE_URL}/${id}`);
	const data = await response.json();
	let elo = data.modes.rm_solo?.rank_level || data.modes.rm_team?.rank_level;
	if (!elo) {
		elo = "unranked";
	}
	return elo;
}

async function fill_game_info(opponents) {	
	
	for (const player of opponents) {
		game_info.opponents.push(player.name);
		game_info.opponents_civs.push(player.civ);
		const elo = await get_elo(player.id);
		game_info.opponents_elos.push(elo);
	}
}

// TODO - burayla ilgilen
async function get_game_data(user) {
	let user_id;
	if (user === "mete2241") {
		user_id = 17078472;
	} else if (user === "KelekKarpuz") {
		user_id = 8822751;
	} else if (user === "matatarr") {
		user_id = 8822803;
	}

	const response = await fetch(`${process.env.PROFILE_URL}/${user_id}/games`);
	const data = await response.json();
	let temp_url = `${process.env.PROFILE_URL}/${user_id}/games/${data.games[0].game_id}`;
	game_info.url = temp_url.replace("api/v0/", "")
	game_info.server = data.games[0].server;
	game_info.map = data.games[0].map;
	game_info.time = data.games[0].duration/60;

	return data.games[0];
}

/**
 * Fetches and processes opponent data for a given user's last game.
 * @param {Promise} game_data A promise that resolves to an array of games.
 * @returns {Promise} Resolves to the processed player data.
 */
async function get_opponents_data(game_data) {
	const games = await game_data;
	const players = get_players(games);
	
	const opponents = players.filter(player => !name_list.includes(player.name));
	
	await fill_game_info(opponents);
}

function reset_game_info() {
	game_info.server = "";
	game_info.map = "";
	game_info.opponents = [];
	game_info.opponents_civs = [];
	game_info.opponents_elos = [];
	game_info.url = "";
	game_info.result = "";
	game_info.time = "";
}


async function make_embed(interaction) {

const exampleEmbed = new EmbedBuilder();
exampleEmbed.setColor(0xff0000)
if(game_info.result == "win")
	exampleEmbed.setColor(0x009900)
exampleEmbed
.setTitle(game_info.map)
.setURL(game_info.url)
//.setAuthor({ name: game_info.result , url: "filler" })
.setDescription(game_info.time.toString())
.setThumbnail("https://static.aoe4world.com/assets/maps/high_view-554e3c206c2ab5de03eff825bae1782c995f43c3d49045c445c37167755dc756.png")
.addFields(
	{ name: game_info.server, value: `süre: ${game_info.time.toString()}` },
	//{ name: '\u200B', value: '\u200B' },
	//{ name: 'Inline field title', value: 'Some value here', inline: true },
	//{ name: 'Inline field title', value: 'Some value here', inline: true },
)
.addFields({ name: game_info.opponents[0] + "  (" + game_info.opponents_civs[0] + ") ", value: game_info.opponents_elos[0], inline: true })
.addFields({ name: game_info.opponents[1] + "  (" + game_info.opponents_civs[1] + ") ", value: game_info.opponents_elos[1], inline: true })
.addFields({ name: game_info.opponents[2] + "  (" + game_info.opponents_civs[2] + ") ", value: game_info.opponents_elos[2], inline: true })
.setImage("https://static.aoe4world.com/assets/maps/high_view-554e3c206c2ab5de03eff825bae1782c995f43c3d49045c445c37167755dc756.png")
.setTimestamp()
await interaction.editReply({embeds: [exampleEmbed]});
reset_game_info();
}

module.exports = { get_game_data, get_opponents_data, make_embed};