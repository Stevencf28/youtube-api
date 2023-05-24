import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Home from "./pages/Home";
import Aboutme from "./pages/Aboutme";

function App() {
	return (
		<Router>
			<NavBar />
			<div className='min-h-full w-full'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/aboutme' element={<Aboutme />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
