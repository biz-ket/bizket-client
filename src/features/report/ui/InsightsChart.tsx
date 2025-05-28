import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts';
import { MediaWithInsights } from '../hooks/useMediaInsights';
import { formatDate } from '@/shared/utils/formatDate';

function transformData(data: MediaWithInsights[]) {
  return data.slice(0, 25).map((insight) => {
    const { caption, likes, comments, timestamp, platform } = insight;
    return {
      caption,
      platform,
      좋아요: likes,
      댓글: comments,
      timestamp,
    };
  });
}

interface InsightsChartProps {
  insights: MediaWithInsights[];
}

const InsightsChart = ({ insights }: InsightsChartProps) => {
  return (
    <div className="w-full border rounded-20 overflow-hidden bg-white p-30 flex flex-col gap-30">
      <Legend
        payload={[
          {
            value: '좋아요',
            id: 'likes',
            color: '#FFEA8B',
          },
          {
            value: '댓글',
            id: 'comments',
            color: '#FF7900',
          },
        ]}
        content={<CustomLegend />}
        wrapperStyle={{
          position: 'relative',
        }}
      />
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={transformData(insights)}>
          <YAxis
            type="number"
            domain={[0, 10]}
            tickLine={false}
            axisLine={{ stroke: '#dddddd' }}
            className="body-md-regular text-font-20"
            tickMargin={18}
          />
          <CartesianGrid verticalPoints={[0]} stroke="#f1f1f1" />
          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Bar
            dataKey="좋아요"
            maxBarSize={100}
            fill="url(#barGradient)"
            shape={<CustomBar />}
          />
          <Line dataKey="댓글" stroke="#FF7900" />

          <defs>
            <linearGradient id="barGradient" x1="1" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC300" />
              <stop offset="100%" stopColor="#FFE590" />
            </linearGradient>
          </defs>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
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

const CustomTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const insight = payload[0].payload;

    const likes = payload[0].value as number;
    const comments = payload[1].value as number;

    return (
      <div className="max-w-[300px] bg-white border border-[rgb(204,204,204)] p-10">
        <p className="line-clamp-2 ">{insight.caption}</p>
        <div className="flex gap-5 text-font-20">
          <p>{formatDate(insight.timestamp)}</p>
          <span>·</span>
          <p>{insight.platform}</p>
        </div>
        <p className="color-[#FFEA8B]">{`좋아요 : ${likes.toLocaleString()}`}</p>
        <p className="color-[#FF7900]">{`댓글 : ${comments.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
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

export default InsightsChart;
