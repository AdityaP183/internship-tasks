import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatDate(date) {
	return `${date.day}/${date.month}/${date.year}`;
}

export const listOptions = [
	"Watching",
	"Completed",
	"On Hold",
	"Dropped",
	"Planning",
];

export function passwordValidation(password) {
	const hasLowercase = /[a-z]/;
	const hasUppercase = /[A-Z]/;
	const hasDigit = /\d/;
	const hasSymbol = /\W/;

	const passwordStrength = [];

	if (password.length < 6) {
		passwordStrength.push("length");
	}

	if (!hasLowercase.test(password)) {
		passwordStrength.push("lowercase");
	}

	if (!hasUppercase.test(password)) {
		passwordStrength.push("uppercase");
	}

	if (!hasDigit.test(password)) {
		passwordStrength.push("digit");
	}

	if (!hasSymbol.test(password)) {
		passwordStrength.push("symbol");
	}

	return passwordStrength;
}

export const toastOptions = {
	duration: 3000,
	style: {
		background: "hsl(var(--secondary))",
		color: "hsl(var(--secondary-foreground))",
	},
	success: {
		style: {
			border: "2px solid hsl(var(--success))",
		},
		iconTheme: {
			primary: "hsl(var(--success))",
			secondary: "hsl(var(--success-foreground))",
		},
	},
	error: {
		style: {
			border: "2px solid #ff4b4b",
		},
	},
};

export const animeVariables = () => {
	const currentDate = new Date();
	const seasons = ["SPRING", "SUMMER", "FALL", "WINTER"];
	const currentSeason =
		currentDate.getMonth() < 3
			? "WINTER"
			: currentDate.getMonth() < 6
			? "SPRING"
			: currentDate.getMonth() < 9
			? "SUMMER"
			: "FALL";

	const vars = {
		nextSeason: seasons[seasons.indexOf(currentSeason) + 1],
		nextYear: currentDate.getFullYear() + 1,
		season: currentSeason,
		seasonYear: currentDate.getFullYear(),
		type: "ANIME",
	};

	return vars;
};

export const watchlistQueryBuilder = (idArray) => {
	let query = "";

	idArray.forEach((id, index) => {
		query += `anime${index + 1}: Media(id: ${id}) {
            id
            title {
              userPreferred
            }
            coverImage {
              extraLarge
              large
              color
            }
          }`;
	});

	return `query{
        ${query}
    }`;
};