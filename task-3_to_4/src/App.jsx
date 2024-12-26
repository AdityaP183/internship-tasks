import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/home"));
const AppLayout = lazy(() => import("./components/app/app-layout"));
const AnimeInfo = lazy(() => import("./pages/anime-info"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="/anime/:id" element={<AnimeInfo />} />
					</Route>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<h1>404</h1>} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
