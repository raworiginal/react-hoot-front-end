// src/App.jsx
import { useContext, useState } from "react";
import { Routes, Route } from "react-router"; // Import React Router
import { UserContext } from "./contexts/UserContext";

import NavBar from "./components/NavBar/NavBar";
// Import the SignUpForm component
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
	const { user } = useContext(UserContext);

	return (
		<>
			<NavBar />
			{/* Add the Routes component to wrap our individual routes*/}
			<Routes>
				<Route path="/" element={user ? <Dashboard /> : <Landing />} />
				<Route path="/sign-up" element={<SignUpForm />} />
				<Route path="/sign-in" element={<SignInForm />} />
			</Routes>
		</>
	);
};

export default App;
