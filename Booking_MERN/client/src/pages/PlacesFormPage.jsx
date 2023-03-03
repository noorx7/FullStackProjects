import { useState } from "react";
import AccountNav from "../AccountNav";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { Navigate } from "react-router-dom";
import axios from "axios";
function PlacesFormPage() {
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [redirect, setRedirect] = useState(false);
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

	async function addNewPlace(ev) {
		ev.preventDefault();

		await axios.post("/places", {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
		});
		setRedirect(true);
	}

	if (redirect) {
		return <Navigate to={"/account/places"} />;
	}
	return (
		<div>
			<AccountNav />
			<form onSubmit={addNewPlace}>
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
				<PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
		</div>
	);
}

export default PlacesFormPage;
