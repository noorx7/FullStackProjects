import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useState } from "react";
import axios from "axios";
function PlacesPage(props) {
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios.get("/places").then(({ data }) => {
			setPlaces(data);
		});
	}, []);
	return (
		<div>
			<AccountNav />

			<div className="text-center">
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
				<div className="mt-4">
					{places.length > 0 &&
						places.map((place) => (
							<Link
								to={"/account/places/" + place._id}
								className="flex cursor-pointer gap-4 bg-gray-100 rounded-2xl p-4 "
							>
								<div className="flex w-32 h-32 bg-gray-300">
									{place.photos.length && (
										<img
											className="object-cover"
											src={"http://localhost:4000/uploads/" + place.photos[0]}
											alt=""
										/>
									)}
								</div>
								<div className="">
									<h2 className="text-xl">{place.title}</h2>
									<p className="text-sm mt-2">{place.description}</p>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}

export default PlacesPage;
