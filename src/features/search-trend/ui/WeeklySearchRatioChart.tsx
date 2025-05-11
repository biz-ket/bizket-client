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
import Card from './Card';
import { UseQueryResult } from '@tanstack/react-query';
import { WeeklySearchRatio } from '../api/fetchWeeklySearchRatio';
import AlertIcon from './AlertIcon';
import { formatNumber } from '../utils/formatNumber';

function transformData(data: WeeklySearchRatio) {
  type Day = keyof typeof data.ratioByDay;
  const dayMap: Record<Day, string> = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };
  return Object.entries(data.ratioByDay).map((entry) => {
    const [key, value] = entry;
    const dayStr = dayMap[key as Day];
    return {
      name: dayStr,
      ratio: value,
    };
  });
}

interface WeeklySearchRatioChartProps {
  result: UseQueryResult<WeeklySearchRatio>;
}

const WeeklySearchRatioChart = ({ result }: WeeklySearchRatioChartProps) => {
  const { data, isError } = result;

  return (
    <Card className="flex-1 flex flex-col h-[616px] p-30">
      <div className="w-full">
        <span className="body-lg-semibold">요일별 키워드 관심도</span>
      </div>

      <div className="bg-line-30 w-full h-[0.5px] mt-15 mb-30" />

      {isError || !data ? (
        <div className="w-full flex-1 flex flex-col justify-center items-center">
          <AlertIcon />
          <div className="mt-9">
            <p>에러가 발생하였습니다.</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full">
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <BarChart data={transformData(data)}>
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
              <Tooltip
                formatter={(value) => `${formatNumber(value as number)}%`}
                cursor={false}
              />
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
      )}
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
