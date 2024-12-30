import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";

export default function SingleWatchlist() {
	const query = `query {
  media1: Media(id: 21) {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
  }
  media2: Media(id: 163146) {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
  }
  media3: Media(id: 171018) {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
  }
}

`;
	const variables = [21, 171018, 153406];

	const { data, isLoading, error, fetchData } = useFetch();
	useEffect(() => {
		// fetchData({ query });
	}, []);

	if (!isLoading && error) {
		console.log(error);
	}

	if (!isLoading && data) {
		console.log(data);
	}

	return <div>SingleWatchlist</div>;
}
