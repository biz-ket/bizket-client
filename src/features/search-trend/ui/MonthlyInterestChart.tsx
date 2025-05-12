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
import { UseQueryResult } from '@tanstack/react-query';
import { MonthlyInterest } from '../api/fetchMonthlyInterest';
import AlertIcon from './AlertIcon';
import { formatNumber } from '../utils/formatNumber';
import { getErrorData } from '../utils/monthlyInterestChartUtils';

interface MonthlyInterestChartProps {
  result: UseQueryResult<MonthlyInterest[]>;
  keyword: string;
}

const MonthlyInterestChart = ({
  result,
  keyword,
}: MonthlyInterestChartProps) => {
  const { data, isError } = result;

  const showAlert = isError || data === undefined || data.length === 0;

  return (
    <Card className="w-full h-[530px] px-35 py-40 flex-col">
      <div className="w-full flex flex-row mb-40 items-center justify-between">
        <Legend
          payload={[
            {
              value: keyword,
              id: 'searchVolume',
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

      <div className="w-full flex-1 relative">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <AreaChart
            data={showAlert ? getErrorData() : data}
            margin={{ left: 40, bottom: 15 }}
          >
            <XAxis
              dataKey="yearMonth"
              className="text-font-20 body-md-light"
              tickLine={false}
              axisLine={{ stroke: '#dddddd' }}
              tickMargin={25}
            />
            <YAxis
              dataKey="searchVolume"
              className="text-font-20 body-md-light"
              tickLine={false}
              axisLine={{ stroke: '#dddddd' }}
              tickFormatter={(value) => value.toLocaleString()}
              tickMargin={20}
              domain={[0, 100]}
            />
            <CartesianGrid verticalPoints={[0]} stroke="#f1f1f1" />
            {!showAlert && (
              <Tooltip
                formatter={(value) => `${formatNumber(value as number)}%`}
              />
            )}
            <Area
              name={keyword}
              dataKey="searchVolume"
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

        {showAlert && (
          <div className="absolute top-[calc(50%-25px-15px)] left-[calc(40px+20px+50%)] -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <AlertIcon />
            <div className="flex flex-col gap-2 items-center mt-9">
              {isError || data === undefined ? (
                <p>에러가 발생하였습니다.</p>
              ) : (
                <>
                  <p className="body-md-regular text-font-30">
                    표시할 데이터가 없습니다.
                  </p>
                  <p className="body-sm-regular text-font-20">
                    데이터가 부족하여 표시되지 않습니다.
                    <br />
                    다른 키워드를 검색해 주세요.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
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

export default MonthlyInterestChart;
