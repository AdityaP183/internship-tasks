import { useState } from "react";

export default function useFetch() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async ({ query, variables }) => {
		const url = "https://graphql.anilist.co/";

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
			}),
		};

		setIsLoading(true);
		setError(null);
		setData(null);

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const data = await response.json();
			setData(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, fetchData };
}
