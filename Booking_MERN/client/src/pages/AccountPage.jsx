import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
function ProfilePage() {
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

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div>
			<AccountNav />
			{subpage === "profile" && (
				<div className="text=center max-w-lg mx-auto">
					Logged in as {user.name} {user.email} <br />
					<button onClick={logout} className="primary max-w-sm mt-2">
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default ProfilePage;
