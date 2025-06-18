const Meta = ({ title, description }) => {
	return (
		<>
			<title>{`${title} | VegeGuide`}</title>
			<meta name="description" content={description} />
		</>
	);
};

export default Meta;
