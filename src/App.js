import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage";
import Login from "./Components/Screens/Login/Login";

function App() {
	const [success, setSuccess] = useState(false);
	const [info, setInfo] = useState();

	console.log(info);

	return success ? <MainPage /> : <Login setInfo={setInfo} />;
}

export default App;
