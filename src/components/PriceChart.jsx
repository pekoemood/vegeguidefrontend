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
	console.log(prices);
	return (
		<main className="p-6 mt-4 rounded-2xl shadow-md">
			<h1 className="text-xl mb-4 text-primary font-semibold flex gap-2 items-center">
				<Activity className="w-5 h-5 text-primary" />
				1週間の価格推移
			</h1>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={prices}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="date"
						tickFormatter={(dateStr) =>
							format(parseISO(dateStr), "M月d日", { locale: ja })
						}
						tick={{ fontSize: 12 }}
					/>
					<YAxis
						domain={["dataMin - 10", "dataMax + 10"]}
						tick={{ fontSize: 12 }}
						tickLine={false}
					/>
					<Tooltip
						formatter={(value) => [`${value}円`, "価格"]}
						labelFormatter={(label) =>
							format(parseISO(label), "M月d日", { local: ja })
						}
					/>
					<Line
						type="monotone"
						dataKey="price"
						stroke="oklch(0.5892 0.199 134.6)"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</main>
	);
};

export default PriceChart;
