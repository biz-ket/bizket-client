'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from './Card';

const data: {
  name: string;
  data: number;
}[] = [
  {
    name: '2024-10',
    data: 700000,
  },
  {
    name: '2024-11',
    data: 400000,
  },
  {
    name: '2024-12',
    data: 600000,
  },
  {
    name: '2025-01',
    data: 1000000,
  },
  {
    name: '2025-02',
    data: 1100000,
  },
  {
    name: '2025-03',
    data: 1000000,
  },
];

const MonthlySearchTrendChart = () => {
  return (
    <Card className="w-full h-[530px] px-35 py-40 flex-col">
      <div className="w-full flex flex-row mb-40 items-center justify-between">
        <Legend
          payload={[
            {
              value: '키워드',
              id: 'data',
              color: '#FF7900',
            },
          ]}
          content={<CustomLegend />}
          wrapperStyle={{
            position: 'relative',
          }}
        />
        <span className="body-md-regular text-font-20">
          *검색 트렌드 관심도 (최근 6개월)
        </span>
      </div>
      <div className="w-full flex-1">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <AreaChart data={data} margin={{ left: 40, bottom: 15 }}>
            <XAxis
              dataKey="name"
              className="text-font-20 body-md-light"
              tickLine={false}
              axisLine={{ stroke: '#dddddd' }}
              tickMargin={25}
            />
            <YAxis
              className="text-font-20 body-md-light"
              tickLine={false}
              axisLine={{ stroke: '#dddddd' }}
              tickFormatter={(value) => value.toLocaleString()}
              tickMargin={20}
            />
            <CartesianGrid verticalPoints={[0]} stroke="#f1f1f1" />
            <Tooltip />
            <Area
              name="키워드"
              dataKey="data"
              stroke="#FF7900"
              fill="url(#areaGradient_orange)"
              type="natural"
              dot={{ r: 2.5, fillOpacity: 1, fill: '#FF7900' }}
            />
            <defs>
              <linearGradient
                id="areaGradient_orange"
                x1="1"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FF7900" />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-row gap-25 text-font-40">
      {payload.map((entry: any, index: number) => (
        <div
          key={entry.id ?? `item-${index}`}
          className="flex flex-row gap-8 items-center"
        >
          <div
            className="w-12 h-12 rounded-[50%]"
            style={{
              backgroundColor: entry.color,
            }}
          />
          <span className="body-md-regular">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default MonthlySearchTrendChart;
