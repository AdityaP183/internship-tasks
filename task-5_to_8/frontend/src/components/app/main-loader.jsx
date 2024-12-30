import { HashLoader } from "react-spinners";

export default function MainLoader() {
	return (
		<div className="flex items-center justify-center h-[80vh] sm:h-screen">
			<HashLoader color="#cd1c45" size={80} />
		</div>
	);
}
