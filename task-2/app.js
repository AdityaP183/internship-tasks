import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const users = [];

// Routes
app.get("/", (req, res) => {
	res.render("users", { users });
});

app.get("/add-user", (req, res) => {
	res.render("add-user", { errors: {} });
});

app.post("/add-user", (req, res) => {
	const { name, email, dob, phone } = req.body;
	const errors = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^\d{10}$/;

	// Checking for empty fields
	if (!name || !email || !dob || !phone) {
		errors.name = !name ? "Name is required" : "";
		errors.email = !email ? "Email is required" : "";
		errors.dob = !dob ? "Date of birth is required" : "";
		errors.phone = !phone ? "Phone is required" : "";
		return res.render("add-user", { errors });
	}

	// Checking for email format
	if (!emailRegex.test(email)) {
		errors.email = "Invalid email format";
		return res.render("add-user", { errors });
	}

	// Checking if email already exists
	if (users.some((user) => user.email === email)) {
		errors.email = "Email already exists";
		return res.render("add-user", { errors });
	}

	// Checking for phone number format
	if (!phoneRegex.test(phone)) {
		errors.phone = "Invalid phone number format";
		return res.render("add-user", { errors });
	}

	// Checking if phone number already exists
	if (users.some((user) => user.phone === phone)) {
		errors.phone = "Phone number already exists";
		return res.render("add-user", { errors });
	}

	// Checking for date of birth is a past date
	const formattedDob = new Date(dob);
	if (isNaN(formattedDob) || formattedDob >= Date.now()) {
		errors.dob = "Date of birth must be in the past";
		return res.render("add-user", { errors });
	}

	const age = Math.floor((Date.now() - formattedDob.getTime()) / 31557600000);

	users.push({
		id: Date.now(),
		name,
		email,
		dob: formattedDob.toLocaleDateString(),
		age,
		phone,
	});
	res.redirect("/");
});

app.get("/edit-user/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const user = users.find((u) => u.id === id);

    // Formatting the date to set the default value
    const formattedUser = {
        ...user,
        dob: new Date(user.dob).toISOString().split("T")[0],
    };

	res.render("edit-user", { user: formattedUser, errors: {} });
});

app.post("/edit-user/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, email, dob, phone } = req.body;
	const errors = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^\d{10}$/;

	// Checking for empty fields
	if (!name || !email || !dob || !phone) {
		errors.name = !name ? "Name is required" : "";
		errors.email = !email ? "Email is required" : "";
		errors.dob = !dob ? "Date of birth is required" : "";
		errors.phone = !phone ? "Phone is required" : "";
		return res.render("edit-user", {
			user: { name, email, dob, phone },
			errors,
		});
	}

	// Checking for email format
	if (!emailRegex.test(email)) {
		errors.email = "Invalid email format";
		return res.render("edit-user", {
			user: { name, email, dob, phone },
			errors,
		});
	}

	// Checking for phone number format
	if (!phoneRegex.test(phone)) {
		errors.phone = "Invalid phone number format";
		return res.render("edit-user", {
			user: { name, email, dob, phone },
			errors,
		});
	}

	// Checking for date of birth is a past date
	const formattedDob = new Date(dob);
	if (isNaN(formattedDob) || formattedDob >= Date.now()) {
		errors.dob = "Date of birth must be in the past";
		return res.render("edit-user", {
			user: { name, email, dob, phone },
			errors,
		});
	}

	const age = Math.floor((Date.now() - formattedDob.getTime()) / 31557600000);

	const userIndex = users.findIndex((u) => u.id === id);
	if (userIndex === -1) {
		return res.status(404).send("User not found");
	}

	users[userIndex] = {
		id,
		name,
		email,
		dob: formattedDob.toLocaleDateString(),
		age,
		phone,
	};

	res.redirect("/");
});

app.get("/delete-user/:id", (req, res) => {
	const id = parseInt(req.params.id);

	// Check if the user exists
	const existingUserIndex = users.findIndex((u) => u.id === id);

	if (existingUserIndex === -1) {
		return res.status(404).send("User not found");
	}

	users.splice(existingUserIndex, 1);
	res.redirect("/");
});

app.listen(4000, () => {
	console.log("Server started on port 4000");
});