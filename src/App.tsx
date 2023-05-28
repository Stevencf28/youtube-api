import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<Router>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
