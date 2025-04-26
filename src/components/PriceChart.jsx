import { format, parseISO } from "date-fns";
import ja from "date-fns/locale/ja";
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
				<Tooltip />
				<Line
					type="monotone"
					dataKey="price"
					stroke="#10B981"
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default PriceChart;
