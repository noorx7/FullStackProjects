import React, { useContext, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
function BookingWidget({ place }) {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [numberofGuests, setNumberOfGuests] = useState(1);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [redirect, setRedirect] = useState("");
	const { user } = useContext(UserContext);
	let numberofNights = 0;

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	if (checkIn && checkOut) {
		numberofNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}
	async function bookThisPlace() {
		const response = await axios.post("/booking", {
			checkIn,
			checkOut,
			numberofGuests,
			name,
			phone,
			place: place._id,
			price: numberofNights * place.price,
		});
		const bookingId = response.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<h2 className="text-2xl text-center">
				Price: ${place.price} / per night
			</h2>
			<div className="border rounded-2xl mt-4">
				<div className="flex">
					<div className="py-3 px-4">
						<label>Check In:</label>
						<input
							type="date"
							value={checkIn}
							onChange={(ev) => setCheckIn(ev.target.value)}
						/>
					</div>
					<div className="py-3 px-4 border-l">
						<label>Check Out:</label>
						<input
							type="date"
							value={checkOut}
							onChange={(ev) => setCheckOut(ev.target.value)}
						/>
					</div>
				</div>
				<div className="py-3 px-4 border-t">
					<label>Number of Guests:</label>
					<input
						type="number"
						value={numberofGuests}
						onChange={(ev) => setNumberOfGuests(ev.target.value)}
					/>
				</div>
			</div>

			{numberofNights > 0 && (
				<div className="py-3 px-4 border-t">
					<label>Your Full Name:</label>
					<input
						type="text"
						value={name}
						onChange={(ev) => setName(ev.target.value)}
					/>
					<label>Phone Number:</label>
					<input
						type="tel"
						value={phone}
						onChange={(ev) => setPhone(ev.target.value)}
					/>
				</div>
			)}

			<button onClick={bookThisPlace} className="primary mt-4">
				Book this place
				{numberofNights > 0 && <span> ${numberofNights * place.price}</span>}
			</button>
		</div>
	);
}

export default BookingWidget;
