import { format, parseISO } from "date-fns";
import ja from "date-fns/locale/ja";
import { Activity, ArchiveIcon, ChartColumnIncreasing } from "lucide-react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const PriceChart = ({ prices }) => {
	console.log("price",prices);

	const groupedData = {};

	prices.forEach(({ month, average_price }) => {
		const [year, mon] = month.split("-");
		if (!groupedData[mon]) groupedData[mon] = { month: mon };
		groupedData[mon][year] = average_price;
	});
	console.log("group:",groupedData);

	const chartData = Object.values(groupedData).sort(
		(a, b) => a.month - b.month,
	);
	console.log("chart:",chartData);

	return (
		<main className="p-6 mt-4 rounded-2xl shadow-md">
			<h1 className="text-xl mb-4 text-primary font-semibold flex gap-2 items-center">
				<Activity className="w-5 h-5 text-primary" />
				年度別価格推移
			</h1>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="month"
						tickFormatter={(monthStr) => `${Number.parseInt(monthStr)}月`}
						tick={{ fontSize: 12 }}
					/>
					<YAxis
						domain={["dataMin - 10", "dataMax + 10"]}
						tick={{ fontSize: 12 }}
						tickLine={false}
					/>
					<Tooltip
						formatter={(value, name) => [`${value}円`, `${name}年`]}
						labelFormatter={(label) => `${Number.parseInt(label)}月`}
					/>
					<Line
						type="monotone"
						dataKey="2024"
						stroke="oklch(55.6% 0 0)"
						strokeWidth={2}
						name="2024"
					/>
					<Line
						type="monotone"
						dataKey="2025"
						stroke="oklch(0.5892 0.199 134.6)"
						strokeWidth={2}
						name="2025"
					/>
				</LineChart>
			</ResponsiveContainer>
		</main>
	);
};

export default PriceChart;
