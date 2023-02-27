import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
function AccountPage() {
	const { ready, user, setUser } = useContext(UserContext);
	const [redirect, setRedirect] = useState(null);
	let { subpage } = useParams();
	if (subpage === undefined) {
		subpage = "profile";
	}

	async function logout() {
		await axios.post("/logout");
		setRedirect("/");
		setUser(null);
	}

	if (!ready) {
		return "Loading ... ";
	}
	if (!user && ready && !redirect) {
		return <Navigate to={"/login"} />;
	}

	function linkClasses(type = null) {
		let classes = "inline-flex items-center gap-1 py-2 px-6 rounded-full";
		if (type === subpage) {
			classes += " bg-primary text-white ";
		} else {
			classes += " bg-gray-200";
		}
		return classes;
	}
	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div>
			<nav className="w-full flex justify-center mt-4 gap-2 mb-8">
				<Link className={linkClasses("profile")} to={"/account"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
					My Profile
				</Link>
				<Link className={linkClasses("bookings")} to={"/account/bookings"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
						/>
					</svg>
					My Bookings
				</Link>
				<Link className={linkClasses("places")} to={"/account/places"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
						/>
					</svg>
					My Accommodation
				</Link>
			</nav>
			{subpage === "profile" && (
				<div className="text=center max-w-lg mx-auto">
					Logged in as {user.name} {user.email} <br />
					<button onClick={logout} className="primary max-w-sm mt-2">
						Logout
					</button>
				</div>
			)}
			<PlacesPage page={subpage} />
		</div>
	);
}

export default AccountPage;
