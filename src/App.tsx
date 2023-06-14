import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { YoutubeContextProvider } from "./context/YoutubeContext";

function App() {
	return (
		<Router>
			<YoutubeContextProvider>
				<div className='content'>
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
					<Footer />
				</div>
			</YoutubeContextProvider>
		</Router>
	);
}

export default App;
