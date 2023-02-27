import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { setUser } = useContext(UserContext);
	async function handleLoginSubmit(ev) {
		ev.preventDefault();
		if (!email || !password) {
			alert("Please enter both email and password");
			return;
		}
		try {
			const { data } = await axios.post("/login", {
				email,
				password,
			});
			setUser(data);
			alert("Login successful");
			setRedirect(true);
		} catch (e) {
			if (e.response && e.response.status === 422) {
				alert("Password is wrong");
			} else {
				alert("Login failed. Please try again later.");
			}
		}
	}

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form
					className="max-w-md mx-auto"
					onSubmit={handleLoginSubmit}
					action="
    "
				>
					<input
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(ev) => setEmail(ev.target.value)}
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(ev) => setPassword(ev.target.value)}
					/>
					<button className="primary">Login</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet?{" "}
						<Link className="underline text-black" to={"/register"}>
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
