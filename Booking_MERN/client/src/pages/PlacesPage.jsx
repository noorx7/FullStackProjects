import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
function PlacesPage(props) {
	const { action } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [photoLink, setPhotoLink] = useState("");
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);

	function inputHeader(text) {
		return <h2 className="text-2xl mt-4">{text}</h2>;
	}
	function inputDescription(text) {
		return <p className="text-gray-500 text-sm">{text}</p>;
	}
	function preInput(header, description) {
		return (
			<>
				{inputHeader(header)}
				{inputDescription(description)}
			</>
		);
	}
	async function addPhotoByLink(ev) {
		ev.preventDefault();
		const { data: filename } = await axios.post("/upload-by-link", {
			link: photoLink,
		});
		setAddedPhotos((prev) => {
			return [...prev, filename];
		});
		setPhotoLink("");
	}
	return (
		props.page === "places" && (
			<div>
				{action !== "new" && (
					<div className="text-center">
						<Link
							className="items-center inline-flex gap-2  bg-primary  text-white py-2 px-6 rounded-full"
							to={"/account/places/new"}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
							</svg>
							Add a new place
						</Link>
					</div>
				)}
				{action === "new" && (
					<form
						action="
                    "
					>
						{preInput("Title", "a catchy short descriptive title can go here!")}
						<input
							type="text"
							value={title}
							onChange={(ev) => setTitle(ev.target.value)}
							placeholder="text, for example: My lovely apt"
						/>
						{preInput(
							"Address",
							"let's put in an address not get our guests lost!"
						)}

						<input
							type="text"
							value={address}
							onChange={(ev) => setAddress(ev.target.value)}
							placeholder="address, for example: 109 Newtown Road"
						/>
						{preInput(
							"Photos",
							"Upload quality realistic pictures for your soon to be Airbnb! Remember the more the better."
						)}

						<div className="flex gap-2">
							<input
								type="text"
								value={photoLink}
								onChange={(ev) => setPhotoLink(ev.target.value)}
								placeholder="Add using a link"
							/>
							<button
								onClick={addPhotoByLink}
								className="bg-gray-200 px-4 rounded-2xl "
							>
								Add&nbsp;photo
							</button>
						</div>
						<div className="mt-3 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
							{addedPhotos.length > 0 &&
								addedPhotos.map((link) => (
									<div>
										<img
											className="rounded-2xl"
											src={"http://localhost:4000/uploads/" + link}
											alt=""
										/>
									</div>
								))}
							<button className=" flex gap-1 justify-center items-center 	border bg-transparent rounded-2xl p-2 text-xl text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
									/>
								</svg>
								Upload
							</button>
						</div>
						{preInput("Description", "A little story about your place!")}
						<textarea
							value={description}
							onChange={(ev) => setDescription(ev.target.value)}
						/>
						{preInput("Perks", "Select all the perks of your place.")}
						<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
							<Perks selected={perks} onChange={setPerks} />
						</div>
						{preInput("Extra Info", "House rules, etc")}
						<textarea
							value={extraInfo}
							onChange={(ev) => setExtraInfo(ev.target.value)}
						/>
						{preInput(
							"Check in and Check out times",
							"Add check in and out times, remember to have some time window for cleaning the room between guests"
						)}

						<div className="grid gap-2 sm:grid-cols-3">
							<div>
								<h3 className="mt-2 -mb-1">Check in time</h3>
								<input
									type="text"
									value={checkIn}
									onChange={(ev) => setCheckIn(ev.target.value)}
									placeholder="14"
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1">Check out time</h3>
								<input
									type="text"
									value={checkOut}
									onChange={(ev) => setCheckOut(ev.target.value)}
									placeholder="20"
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1">Max Guests</h3>
								<input
									value={maxGuests}
									onChange={(ev) => setMaxGuests(ev.target.value)}
									type="number"
								/>
							</div>
						</div>
						<div>
							<button className="primary my-4">Submit</button>
						</div>
					</form>
				)}
			</div>
		)
	);
}

export default PlacesPage;
