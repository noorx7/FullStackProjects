import Movie from "./Movie";

export default async function Home() {
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
	);
	const res = await data.json();
	return (
		<main>
			<p className="text-lg py-2 m-4">Hello Next.13</p>
			<div className="grid gap-16 grid-cols-fluid">
				{res.results.map((movie) => (
					<Movie
						key={movie.id}
						id={movie.id}
						title={movie.title}
						poster_path={movie.poster_path}
						release_date={movie.release_date}
					/>
				))}
			</div>
		</main>
	);
}
