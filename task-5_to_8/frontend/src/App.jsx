import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "./lib/utils";
import MainLoader from "./components/app/main-loader";
import NotFound from "./pages/not-found";
import { AuthProvider } from "./context/auth-context";
import Logout from "./pages/logout";
import Watchlist from "./pages/watchlist";
import SingleWatchlist from "./pages/single-watchlist";

const Home = lazy(() => import("./pages/home"));
const AppLayout = lazy(() => import("./components/app/app-layout"));
const AnimeInfo = lazy(() => import("./pages/anime-info"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Suspense fallback={<MainLoader />}>
					<Routes>
						<Route path="/" element={<AppLayout />}>
							<Route index element={<Home />} />
							<Route path="/anime/:id" element={<AnimeInfo />} />
							<Route path="/watchlist" element={<Watchlist />} />
							<Route
								path="/watchlist/:id"
								element={<SingleWatchlist />}
							/>
							<Route path="/logout" element={<Logout />} />
						</Route>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
				<Toaster toastOptions={toastOptions} />
			</BrowserRouter>
		</AuthProvider>
	);
}
