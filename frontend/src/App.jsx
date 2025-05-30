import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import GuessTheMovie from "./components/GuessTheMovie";
import NotFoundPage from "./pages/404";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import { useAuthStore } from "./store/authUser";
import WatchMood from "./components/WatchMood";

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				<Route path="/guess-the-movie" element={<GuessTheMovie />} />
				<Route path="/watch-page" element={<WatchMood />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	);
}

export default App;
