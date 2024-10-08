//const name_list = {
//	mete2241:"17078472", 
//	akustikyollar:"8822751",
//	matatarr:"8822803"
//}

const name_list = {
	TırnakPide:"17078472", 
	KelekKarpuz:"8822751",
	TulumPeyniri:"8822803"
}

const names = [
	"TırnakPide",
	"KelekKarpuz",
	"TulumPeyniri"
]

const id_list = [
	17078472,
	8822751,
	8822803
]

const map_urls = {
	"African Waters" : "https://liquipedia.net/commons/images/thumb/c/cc/African_Waters_AoE4_icon.png/300px-African_Waters_AoE4_icon.png",
	"Altai" : "https://liquipedia.net/commons/images/d/da/Altari_AoE4.png",
	"Ancient Spires" : "https://liquipedia.net/commons/images/b/b6/Ancient_Spires_AoE4.png",
	"Dry Arabia": "https://liquipedia.net/commons/images/4/45/Arabia_%28AOE4%29_Icon.png",
	"Archipelago" : "https://liquipedia.net/commons/images/2/2d/Archipelago_AoE4.png",
	"Baltic" : "https://liquipedia.net/commons/images/thumb/5/58/Baltic_AoE4_icon.png/300px-Baltic_AoE4_icon.png",
	"Basin" : "https://liquipedia.net/commons/images/6/6c/Basin_%28AoE4%29_Icon.png",
	"Black Forest" : "https://liquipedia.net/commons/images/6/67/Black_Forest_AoE4.png",
	"Bohemia" : "https://liquipedia.net/commons/images/b/bd/Bohemia.JPG",
	"Boulder Bay" : "https://liquipedia.net/commons/images/2/2d/Boulder_Bay_AoE4_icon.png",
	"Bridges" : "https://liquipedia.net/commons/images/thumb/8/85/Bridges_AoE4_map.png/300px-Bridges_AoE4_map.png",
	"Canal" : "https://liquipedia.net/commons/images/thumb/2/27/Canal_AoE4_map.png/300px-Canal_AoE4_map.png",
	"Cauldron" : "https://liquipedia.net/commons/images/b/bb/Cauldron_%28AoE4%29_Icon.png",
	"Cliffside" : "https://liquipedia.net/commons/images/thumb/0/00/Cliffside_AoE4_icon.png/300px-Cliffside_AoE4_icon.png",
	"Coastal" : "https://liquipedia.net/commons/images/thumb/b/b1/Coastal_AoE4.png/300px-Coastal_AoE4.png",
	"Coastal Cliffs" : "",
	"Confluence" : "https://liquipedia.net/commons/images/d/da/Confluence_AoE4.png",
	"Continental" : "https://liquipedia.net/commons/images/c/c5/Continental_Icon_AoE4.JPG",
	"Danube River" : "https://liquipedia.net/commons/images/f/f2/Danube_River_AoE4.png",
	"Dry River" : "",
	"Escarpment" : "",
	"Floodplain" : "",
	"Forest Ponds" : "https://liquipedia.net/commons/images/c/cc/AOE4_FOREST_PONDS.webp",
	"Forts" : "https://liquipedia.net/commons/images/thumb/a/aa/Forts_AoE4_icon.png/300px-Forts_AoE4_icon.png",
	"Four Lakes" : "https://liquipedia.net/commons/images/thumb/7/71/Four_Lakes_%28AoE4%29_Icon.png/300px-Four_Lakes_%28AoE4%29_Icon.png",
	"French Pass" : "https://liquipedia.net/commons/images/f/f2/French_Pass_AoE4.png",
	"Frisian Marshes" : "",
	"Glade" : "https://liquipedia.net/commons/images/thumb/9/96/Glade_AoE4_icon.png/300px-Glade_AoE4_icon.png",
	"Golden Heights" : "https://liquipedia.net/commons/images/thumb/3/3c/Golden_Heights_AoE4_icon.png/300px-Golden_Heights_AoE4_icon.png",
	"Golden Pit" : "https://liquipedia.net/commons/images/thumb/3/31/Golden_Pit_AoE4_icon.png/300px-Golden_Pit_AoE4_icon.png",
	"Golden Swamp" : "",
	"Gorge" : "https://liquipedia.net/commons/images/7/77/Gorge_AoE4.png",
	"Haywire" : "https://liquipedia.net/commons/images/thumb/1/16/Haywire_AoE4_icon.png/300px-Haywire_AoE4_icon.png",
	"Hidden Valley" : "https://liquipedia.net/commons/images/thumb/7/7f/Hidden_Valley_AoE4_icon.png/300px-Hidden_Valley_AoE4_icon.png",
	"Hideout" : "https://liquipedia.net/commons/images/6/67/Hideout_AoE4.PNG",
	"High View" : "https://liquipedia.net/commons/images/4/41/High_View_AoE4.png",
	"Hill and Dale" : "https://liquipedia.net/commons/images/9/9e/Hill_and_Dale_AoE4.png",
	"Himeyama" : "https://liquipedia.net/commons/images/e/e7/Himeyama_AoE4_icon.png",
	"Holy Island" : "",
	"Jousting Fields" : "",
	"Kawasan" : "",
	"King of the Hill" : "https://liquipedia.net/commons/images/e/eb/King_of_the_Hill_AoE4.png",
	"Lakeside" : "",
	"Lipany" : "https://liquipedia.net/commons/images/9/99/Lipany_AoE4.png",
	"Marshland" : "https://liquipedia.net/commons/images/d/d9/Marshland_Icon_AoE4.JPG",
	"MegaRandom" : "https://liquipedia.net/commons/images/1/1e/MegaRandom_AoE4.png",
	"Land MegaRandom" : "https://liquipedia.net/commons/images/1/1e/MegaRandom_AoE4.png",
	"Migration" : "https://liquipedia.net/commons/images/1/1d/Migration_%28AoE4%29.PNG",
	"Mongolian Heights" : "https://liquipedia.net/commons/images/b/b3/Mongolian_Heights_AoE4.png",
	"Mountain Clearing" : "https://liquipedia.net/commons/images/thumb/5/5b/Mountain_Clearing_AoE4_icon.png/300px-Mountain_Clearing_AoE4_icon.png",
	"Mountain Pass" : "https://liquipedia.net/commons/images/8/8d/Mountain_Pass_AoE4.png",
	"Moving Out" : "https://liquipedia.net/commons/images/thumb/8/8d/Moving_Out_AoE4_map.PNG/240px-Moving_Out_AoE4_map.PNG",
	"Nagari" : "https://liquipedia.net/commons/images/b/b7/Nagari_AoE4.png",
	"Oasis" : "https://liquipedia.net/commons/images/thumb/e/e3/Oasis_AoE4.png/300px-Oasis_AoE4.png",
	"Prairie" : "https://liquipedia.net/commons/images/thumb/a/a7/Prairie_AoE4_icon.png/300px-Prairie_AoE4_icon.png",
	"Regions" : "https://liquipedia.net/commons/images/5/50/Regions.PNG",
	"Rocky Canyon" : "https://liquipedia.net/commons/images/thumb/f/f2/Rocky_Canyon_AoE4_map.png/300px-Rocky_Canyon_AoE4_map.png",
	"Rocky River" : "https://liquipedia.net/commons/images/c/c3/Rocky_River_AoE4_icon.PNG",
	"Scandinavia" : "https://liquipedia.net/commons/images/thumb/9/9a/Scandinavia_AoE4_map.png/240px-Scandinavia_AoE4_map.png",
	"Shamble Hill" : "",
	"Socotra" : "https://liquipedia.net/commons/images/thumb/b/bf/Socotra_AoE4_map.png/240px-Socotra_AoE4_map.png",
	"Tempi" : "",
	"The Pit" : "https://liquipedia.net/commons/images/6/68/The_Pit_%28AoE4%29_Icon.png",
	"Thickets" : "https://liquipedia.net/commons/images/thumb/3/38/Thickets_AoE4_icon.png/300px-Thickets_AoE4_icon.png",
	"Turtle Ridge" : "https://liquipedia.net/commons/images/thumb/3/37/Turtle_Ridge_AoE4_icon.png/300px-Turtle_Ridge_AoE4_icon.png",
	"Volcanic Island" : "https://liquipedia.net/commons/images/c/ca/Volcanic_Island_%28AoE4%29.PNG",
	"Warring Island" : "https://liquipedia.net/commons/images/3/35/Warring_Islands_AoE4.png",
	"Water Drake" : "",
	"Waterholes" : "https://liquipedia.net/commons/images/b/b1/Waterholes_%28AoE4%29_Icon.JPG",
	"Wetlands" : "https://liquipedia.net/commons/images/thumb/a/a4/Wetlands_AoE4_map.png/300px-Wetlands_AoE4_map.png",
	"WoodWall" : "https://liquipedia.net/commons/images/2/2b/Woodwall_%28AoE4%29_Icon.png"
}

module.exports = {name_list, names, map_urls};