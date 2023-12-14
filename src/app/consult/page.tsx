"use client";
import UploadButton from "@/components/UploadButton";
import React from "react";
import CalendlyEmbed from "../../components/CalendlyEmbed";

const page = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center ">
			{/* Dermatology Consultation Section */}
			<section
				className="py-16 text-center bg-gray-200 rounded-xl max-w-[1000px] "
				id="consult"
			>
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8">
						Free Dermatology Consultation
					</h2>
					<p className="text-xl leading-relaxed mb-8">
						Ready to take the first step towards healthier skin?
						Schedule a free immediate consultation by uploading a
						picture. Our advanced AI technology will analyze your
						skin and provide us with useful insights. It&apos;s
						quick, easy, and the first step to a more radiant you.
					</p>

					<UploadButton />
				</div>
			</section>
		</div>
	);
};

export default page;
