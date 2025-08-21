import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { UserContext } from "./contexts/UserContext";
import * as hootService from "./services/hootService";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";
import NavBar from "./components/NavBar/NavBar";
import HootForm from "./components/HootForm/HootForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const [hoots, setHoots] = useState([]);

	const handleAddHoot = async (hootFormData) => {
		const newHoot = await hootService.create(hootFormData);
		setHoots([newHoot, ...hoots]);
		navigate("/hoots");
	};

	const handleUpdateHoot = async (hootId, hootFormData) => {
		const updatedHoot = await hootService.update(hootId, hootFormData);
		setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
		navigate(`/hoots/${hootId}`);
	};

	const handleDeleteHoot = async (hootId) => {
		const deletedHoot = await hootService.deleteHoot(hootId);
		setHoots(hoots.filter((hoot) => hoot._id !== hootId));
		navigate("/hoots");
	};

	useEffect(() => {
		const fetchAllHoots = async () => {
			const hootsData = await hootService.index();
			setHoots(hootsData);
		};
		if (user) fetchAllHoots();
	}, [user]);
	return (
		<>
			<header className="container">
				<NavBar />
			</header>
			<main className="container">
				<Routes>
					<Route path="/" element={user ? <Dashboard /> : <Landing />} />
					{user ? (
						<>
							{/* Protected routes (available only to signed-in users) */}
							<Route path="/hoots" element={<HootList hoots={hoots} />} />
							<Route
								path="/hoots/new"
								element={<HootForm handleAddHoot={handleAddHoot} />}
							/>
							<Route
								path="hoots/:hootId/edit"
								element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
							/>
							<Route
								path="/hoots/:hootId"
								element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
							/>
						</>
					) : (
						<>
							{/* Non-user routes (available only to guests) */}
							<Route path="/sign-up" element={<SignUpForm />} />
							<Route path="/sign-in" element={<SignInForm />} />
						</>
					)}
				</Routes>
			</main>
		</>
	);
};

export default App;
