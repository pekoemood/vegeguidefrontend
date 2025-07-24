const Meta = ({
	title,
	description,
}: { title: string; description: string }) => {
	return (
		<>
			<title>{`${title} | VegeGuide`}</title>
			<meta name="description" content={description} />
		</>
	);
};

export default Meta;
