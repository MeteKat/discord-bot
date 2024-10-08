const mongoose = require('mongoose')


const game_data_schema = new mongoose.Schema({
	server: String,
	map: String,
	teams: Array,
	civs: Array,
	opponents_elos: Array,
	url: String,
	result: String,
	time: String,
	game_ids: Object
});

var game_info = {
	server: "",
	map: "",
	teams: [[],[]],
	civs: [[],[]],
	opponents_elos: [],
	url: "",
	result: "",
	time: "",
	game_ids: {
		8822803:142309183,
		8822751:143192680,
		17078472:0
	},
}


async function create_db() {
	mongoose.connection.dropCollection("game_datas")
	const game_datas = mongoose.model("game_data", game_data_schema);
	await game_datas.create(game_info);

	return game_datas
}
	

module.exports = { create_db };