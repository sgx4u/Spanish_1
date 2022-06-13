import { useState } from "react";

import "./App.css";
import MainPage from "./Components/MainPage";
import Login from "./Components/Screens/Login/Login";

function App() {
	const [success, setSuccess] = useState(false);
	const [filterPages, setFilterPages] = useState();

	// useEffect(() => {
	// 	const response = localStorage.getItem("login");
	// 	if (response === null || response === false) setSuccess(false);
	// 	return () => {};
	// }, []);

	return success ? <MainPage setSuccess={setSuccess} filterPages={filterPages} /> : <Login setSuccess={setSuccess} setFilterPages={setFilterPages} />;
}

export default App;
