import { Progress } from "./Progress";
import React from "react";
import { TableCaption, TableBody, TableRow, TableCell } from "./ui/table";

interface DataTableProps {
	Data: object;
	Summary: String;
}

const DataTable: React.FC<DataTableProps> = ({ Data, Summary }) => {
	return (
		<>
			<TableCaption className=" text-lg font-bold text-black text-center">
				Your Skin Evaluation Summary
			</TableCaption>
			<p className=" text-center">{Summary}</p>
			<TableBody>
				{Object.values(Data).map((item) => {
					return (
						<TableRow key={item.label}>
							<TableCell className="font-medium">
								{item.label}
							</TableCell>
							<TableCell className="  w-full">
								<Progress
									value={item.score * 100}
									indicatorColor="bg-blue-700"
									className="h-1 w-full bg-zinc-200 "
								/>
							</TableCell>
							<TableCell className=" w-6 text-right">
								{(parseFloat(item.score) * 100).toFixed(2)}%
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>

			{/* <p className="mt-3">
				<em>
					<strong className=" text-red-800">DISCLAIMER:</strong>
					This is just an estimate to give you an idea of your current
					skin health. The doctor will properly evaluate you during
					the appointment, but this can give you a indication of what
					issue might be prevalant.
				</em>
			</p> */}
		</>
	);
};

export default DataTable;
