import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path="/shop" element={<Shop/>}/>
			</Route>
		</Routes>
	);
}

const Shop = () => <h1>This is shop</h1>

export default App;