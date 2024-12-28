export default function InfoBox({ title, value }) {
	return (
		<div className="flex flex-col w-full h-full gap-2 p-2 border rounded-lg bg-background/60 border-border">
			<h4 className="text-lg font-medium">{title}</h4>
			<span className="text-sm text-muted-foreground">{value}</span>
		</div>
	);
}
