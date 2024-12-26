import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatDate(date) {
	return `${date.day}/${date.month}/${date.year}`;
}

export function passwordValidation(password) {}
