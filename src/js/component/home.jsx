import React from "react";
import Playlist from "./playList.jsx";

const BASE_URL = "https://assets.breatheco.de/apis/sound/";

//create your first component

const Home = () => {
	return (
		<div>
			<Playlist />
		</div>
	);
};
export default Home;
