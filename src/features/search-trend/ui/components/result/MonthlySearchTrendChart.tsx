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
import Card from '../shared/Card';

const data: {
  name: string;
  v1: number;
  v2: number;
}[] = [
  {
    name: '2024-06',
    v1: 1100000,
    v2: 1000000,
  },
  {
    name: '2024-07',
    v1: 1000000,
    v2: 700000,
  },
  {
    name: '2024-08',
    v1: 1100000,
    v2: 400000,
  },
  {
    name: '2024-09',
    v1: 1200000,
    v2: 500000,
  },
  {
    name: '2024-10',
    v1: 700000,
    v2: 300000,
  },
  {
    name: '2024-11',
    v1: 400000,
    v2: 200000,
  },
  {
    name: '2024-12',
    v1: 600000,
    v2: 200000,
  },
  {
    name: '2025-01',
    v1: 1000000,
    v2: 500000,
  },
  {
    name: '2025-02',
    v1: 1100000,
    v2: 800000,
  },
  {
    name: '2025-03',
    v1: 1000000,
    v2: 800000,
  },
];

const MonthlySearchTrendChart = () => {
  return (
    <Card className="w-full h-[530px] px-35 py-40 flex-col">
      <div className="w-full flex flex-row mb-40 items-center">
        <span className="flex-1 block body-lg-regular">월간 검색 트렌드</span>
        <Legend
          payload={[
            {
              value: '트렌드 검색어1',
              id: 'v1',
              color: '#FFC300',
            },
            {
              value: '트렌드 검색어2',
              id: 'v2',
              color: '#FF7900',
            },
          ]}
          content={<CustomLegend />}
          wrapperStyle={{
            position: 'relative',
          }}
        />
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
              name="트렌드 검색어1"
              dataKey="v1"
              stroke="#FFC300"
              fill="url(#areaGradient_yellow)"
            />
            <Area
              name="트렌드 검색어2"
              dataKey="v2"
              stroke="#FF7900"
              fill="url(#areaGradient_orange)"
            />
            <defs>
              <linearGradient
                id="areaGradient_yellow"
                x1="1"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="43%" stopColor="#FFE590" />
                <stop offset="100%" stopColor="#FFC300" />
              </linearGradient>
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
