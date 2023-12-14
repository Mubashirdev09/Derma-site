"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { UploadDropzone } from "./UploadDropzone";

const UploadButton = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setIsOpen(v);
				}
			}}
		>
			<DialogTrigger
				onClick={() => setIsOpen(true)}
				asChild
			>
				<Button className="bg-black text-white py-3 px-6 rounded-full  hover:bg-blue-700 hover:text-white transition duration-300">
					Upload Image
				</Button>
			</DialogTrigger>
			<DialogContent>
				<UploadDropzone />
			</DialogContent>
		</Dialog>
	);
};

export default UploadButton;
