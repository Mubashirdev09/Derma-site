"use client";
import React, { useEffect } from "react";

const CalendlyEmbed = ({ url }) => {
	useEffect(() => {
		const head = document.querySelector("head");
		const script = document.createElement("script");
		script.setAttribute(
			"src",
			"https://assets.calendly.com/assets/external/widget.js"
		);
		head?.appendChild(script);
	}, []);

	return (
		<div className="container h-[500px]">
			<h1 className=" font-bold text-center">Schedule an Appointment</h1>
			<div
				className="calendly-inline-widget h-full w-[100%]"
				data-url={url}
			></div>
		</div>
	);
};

export default CalendlyEmbed;
