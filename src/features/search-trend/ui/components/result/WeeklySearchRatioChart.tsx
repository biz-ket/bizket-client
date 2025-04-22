'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../shared/Card';

const data: {
  name: string;
  ratio: number;
}[] = [
  { name: '월', ratio: 10 },
  { name: '화', ratio: 28 },
  { name: '수', ratio: 24 },
  { name: '목', ratio: 13 },
  { name: '금', ratio: 14 },
  { name: '토', ratio: 7 },
  { name: '일', ratio: 9 },
];

const WeeklySearchRatioChart = () => {
  return (
    <Card className="flex-1 flex flex-col h-[616px] p-30">
      <div className="w-full">
        <span className="body-lg-semibold">요일별 검색 비율</span>
      </div>

      <div className="bg-line-30 w-full h-[0.5px] mt-15 mb-30" />

      <div className="flex-1 w-full">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#dddddd' }}
              className="body-md-regular text-font-20"
              tickMargin={17}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#dddddd' }}
              className="body-md-regular text-font-20"
              tickMargin={18}
            />
            <CartesianGrid verticalPoints={[0]} stroke="#f1f1f1" />
            <Tooltip />
            <Bar
              dataKey="ratio"
              fill="url(#barGradient)"
              shape={<CustomBar />}
            />
            <defs>
              <linearGradient id="barGradient" x1="1" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF7900" />
                <stop offset="100%" stopColor="#FFAE00" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const getPath = (x: number, y: number, width: number, height: number) => {
  return `
    M${x},${y + height}
    L${x},${y + 5}
    a5,5 0 0,1 5,-5
    L${x + width - 5},${y}
    a5,5 0 0,1 5,5
    L${x + width},${y + height}
    Z`;
};

const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return (
    <path
      d={getPath(x, y, width, height)}
      stroke="none"
      fill={fill}
      className="opacity-50 hover:opacity-100"
    />
  );
};

export default WeeklySearchRatioChart;
