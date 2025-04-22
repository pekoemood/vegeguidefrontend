import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { format, parseISO } from 'date-fns';
import ja from 'date-fns/locale/ja';

// const data = [
//   { name: '1月', value: 30 },
//   { name: '2月', value: 45 },
//   { name: '3月', value: 25 },
// ];

const PriceChart = ({ prices }) => {
  console.log(prices);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={prices}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(dateStr) => format(parseISO(dateStr), 'M月d日(E)', { locale: ja})} />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey="price" stroke='#10B981' strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceChart;