import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { YoutubeProvider } from "./context/YoutubeContext";

function App() {
	return (
		<Router>
			<YoutubeProvider>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</div>
				<Footer />
			</YoutubeProvider>
		</Router>
	);
}

export default App;
