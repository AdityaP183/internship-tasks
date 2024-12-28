import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "./lib/utils";
import MainLoader from "./components/app/main-loader";
import NotFound from "./pages/not-found";

const Home = lazy(() => import("./pages/home"));
const AppLayout = lazy(() => import("./components/app/app-layout"));
const AnimeInfo = lazy(() => import("./pages/anime-info"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<MainLoader />}>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="/anime/:id" element={<AnimeInfo />} />
					</Route>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
			<Toaster toastOptions={toastOptions} />
		</BrowserRouter>
	);
}
