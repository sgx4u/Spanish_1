import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage";
import Login from "./Components/Screens/Login/Login";

function App() {
	const [success, setSuccess] = useState(false);
	const [info, setInfo] = useState();

	useEffect(() => {
		const response = localStorage.getItem("login");
		if (response === null || response === false) setSuccess(false);
		return () => {};
	}, []);

	return success ? <MainPage /> : <Login />;
}

export default App;
