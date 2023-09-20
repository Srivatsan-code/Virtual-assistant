// Importing modules
import React, { useState, useEffect,useReducer } from "react";
import "./App.css";
import useSound from 'use-sound';
import startsnd from "./components/sound/start.mp3"
import Speech1 from "./components/Speech1";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		data: "Please wait ....",
	});
    const [reducerValue,forceUpdate]=useReducer(x=>x+1,0)
	// Using useEffect for single rendering
	const [startSound] = useSound(startsnd);
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		startSound()
		fetch("/data").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata({
					data: data.data,
					
				});
			})
		);
	}, [reducerValue]);
	return (
		<div className="App">
			<header className="App-header">
				<h1>Virtual Assistant</h1>
			</header>
			<Speech1 forceUpdate={forceUpdate} data={data.data} setdata={setdata}/>  
		</div>
	);
}

export default App;
