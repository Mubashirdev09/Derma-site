"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { Progress } from "./Progress";
import DataTable from "./DataTable";
import CalendlyEmbed from "./CalendlyEmbed";
import { getSummary } from "@/lib/openai";

const calendlyCode = process.env.NEXT_PUBLIC_CALENDLY;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const UploadDropzone = () => {
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [Data, setData] = useState<Object>({});
	const [appointment, setAppointment] = useState(false);
	const [Summary, setSummary] = useState<String | null>();

	const { startUpload } = useUploadThing("imageUploader", {
		onClientUploadComplete: async (file) => {
			setUploadProgress(50);
			const data = file[0].serverData;
			try {
				const res = await fetch(
					"https://api-inference.huggingface.co/models/varun1505/face-characteristics",
					{
						headers: {
							Authorization: `Bearer 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`,
						},
						method: "POST",
						body: data,
					}
				);
				setUploadProgress(70);

				setTimeout(async () => {
					const results = await res.json();
					setData(results);
					setUploadProgress(90);
					const sum = getSummary(results);
					setSummary(await sum);
				}, 10000);

				// console.log(await sum);
			} catch (error) {
				window.alert(`An error occured, please try again ${error}`);
			}
		},
		onUploadError: (error) => {
			setIsUploading(false);
			window.alert(error);
		},
		onUploadBegin: () => {
			setUploadProgress(10);
		},
	});

	return (
		<>
			{!Summary && !appointment ? (
				<>
					<p className="pt-3 text-center font-bold">
						Get AI Skin Evaluation
					</p>
					<Dropzone
						multiple={false}
						onDrop={async (acceptedFile) => {
							setIsUploading(true);

							// handle file uploading
							startUpload(acceptedFile);

							setUploadProgress(0);
						}}
					>
						{({ getRootProps, getInputProps, acceptedFiles }) => (
							<div
								{...getRootProps()}
								className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
							>
								<div className="flex items-center justify-center h-full w-full">
									<label
										htmlFor="dropzone-file"
										className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
									>
										{!isUploading && (
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<Cloud className="h-6 w-6 text-zinc-500 mb-2" />
												<p className="mb-2 text-sm text-zinc-700">
													<span className="font-semibold">
														Click to upload
													</span>{" "}
													or drag and drop
												</p>
											</div>
										)}

										{acceptedFiles && acceptedFiles[0] ? (
											<div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
												<div className="px-3 py-2 h-full grid place-items-center">
													<File className="h-4 w-4 text-blue-500" />
												</div>
												<div className="px-3 py-2 h-full text-sm truncate">
													{acceptedFiles[0].name}
												</div>
											</div>
										) : null}

										{isUploading ? (
											<div className="w-full mt-4 max-w-xs mx-auto">
												<Progress
													indicatorColor="bg-blue-700"
													value={uploadProgress}
													className="h-1 w-full bg-zinc-200"
												/>
												{uploadProgress < 50 ? (
													<div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
														<Loader2 className="h-3 w-3 animate-spin" />
														Uploading...
													</div>
												) : uploadProgress >= 50 &&
												  uploadProgress < 90 ? (
													<div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
														<Loader2 className="h-3 w-3 animate-spin" />
														Analysing...
													</div>
												) : uploadProgress >= 90 ? (
													<div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
														<Loader2 className="h-3 w-3 animate-spin" />
														Summarizing...
													</div>
												) : null}
											</div>
										) : null}

										<input
											{...getInputProps()}
											type="file"
											id="dropzone-file"
											accept="image/*"
											className="hidden"
										/>
									</label>
								</div>
							</div>
						)}
					</Dropzone>
				</>
			) : Summary && !appointment ? (
				<>
					<DataTable
						Data={Data}
						Summary={Summary}
					/>
					<Button
						className="mt-3"
						onClick={() => setAppointment(true)}
					>
						Book Appointment
					</Button>
				</>
			) : (
				<CalendlyEmbed url={calendlyCode} />
			)}
		</>
	);
};
