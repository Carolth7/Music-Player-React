import React, { useEffect, useState } from "react";

// Declaracion de la constante BASE_URL, almacenaremos ahi la direccion que nos dan
const BASE_URL = "https://assets.breatheco.de/apis/sound/";

// Declaracion de la funcion Playlist, donde empezaremos haciendo uso de los useStates, cada uno inicialiazado de una manera
const Playlist = () => {
	const [mapList, setMapList] = useState([]);
	const [playSong, setPlaySong] = useState({});
	// Empezamos usando el useEffect, donde le pasaremos la direccion de la que vamos a extraer las canciones
	useEffect(() => {
		fetch(BASE_URL.concat("songs"), {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(responseAsJson => {
				setMapList(responseAsJson);
			})
			.catch(error => {
				console.log("Warning!! Try again.", error);
			});
	}, []);

	// Declaramos una variable que nos mapeara la lista para devolvernos una lista con las canciones
	let songPlaylist = mapList.map((tune, index) => {
		return (
			<li
				onEnded={() => {
					nextSong();
				}}
				{...tune.name}
				className="songName"
				key={index.toString()}
				onClick={() => {
					setPlaySong({
						url: tune.url,
						name: tune.name,
						position: index
					});
				}}>
				{tune.name}
			</li>
		);
	});
	// UseEffect again
	useEffect(() => {
		if (mapList.length > 0) {
			setPlaySong({ ...mapList[0], position: 0 });
		}
	}, [mapList]);

	//Declaramos nextSong para ir avanzando en nuestra lista de canciones
	const nextSong = () => {
		let position = playSong.position + 1;
		if (position < mapList.length) {
			setPlaySong({
				...mapList[position],
				position: position
			});
		} else {
			setPlaySong({
				...mapList[0],
				position: 0
			});
		}
	};

	// Declaramos previousSong para retroceder en nuestra lista
	const previousSong = () => {
		let position = playSong.position - 1;
		if (position < mapList.length) {
			setPlaySong({
				...mapList[position],
				position: position
			});
		} else {
			setPlaySong({
				...mapList[0],
				position: 0
			});
		}
	};
	// Pasamos sacar por pantalla el resultado de nuestro reproductor
	return (
		<fragment>
			<div className="container">
				<div className="row">
					<div className="playlist col-6">
						<ul>{songPlaylist}</ul>
					</div>

					<div className="player col-6 text-center">
						<div>
							<h1 className="Title">MUSIC PLAYER</h1>
						</div>
						<figure>
							<figcaption className="mysongs">
								{playSong.name}
							</figcaption>

							<audio
								src={BASE_URL.concat(playSong.url)}
								controls
								onEnded={() => nextSong()}></audio>
							<button
								className="btn "
								onClick={() => {
									previousSong();
								}}>
								<i className="fas fa-backward"></i>
							</button>
							<button
								className="btn"
								offset-4
								onClick={() => {
									nextSong();
								}}>
								<i className="fas fa-forward"></i>
							</button>
						</figure>
					</div>
				</div>
			</div>
		</fragment>
	);
};
export default Playlist;
