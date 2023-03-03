import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

function PlacesPage(props) {
	return (
		<div>
			<AccountNav />

			<div className="text-center">
				List Of All places
				<br />
				<Link
					className="items-center inline-flex gap-2  bg-primary  text-white py-2 px-6 rounded-full"
					to={"/account/places/new"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
					</svg>
					Add a new place
				</Link>
			</div>
		</div>
	);
}

export default PlacesPage;
