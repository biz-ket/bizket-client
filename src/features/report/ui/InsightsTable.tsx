'use client';
import { MediaWithInsights } from '@/features/report/hooks/useMediaInsights';

export interface InsightsTableProps {
  insights: MediaWithInsights[];
}

const InsightsTable = ({ insights }: InsightsTableProps) => {
  return (
    <div className="w-2/3 bg-white flex flex-col">
      <div className="overflow-x-auto">
        <table
          className="w-full table-auto text-left border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead className="bg-black text-white text-center">
            <tr>
              <th className="body-sm-regular p-3">게시일</th>
              <th className="body-sm-regular p-3">플랫폼</th>
              <th className="body-sm-regular p-3">게시내용</th>
              <th className="body-sm-regular p-3">좋아요</th>
              <th className="body-sm-regular p-3">댓글수</th>
              <th className="body-sm-regular p-3">공유수</th>
              <th className="body-sm-regular p-3">저장횟수</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {insights.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors text-center"
              >
                <td className="p-3">
                  {new Date(item.timestamp).toLocaleDateString()}
                </td>
                <td className="p-3">{item.platform}</td>
                <td className="p-3 max-w-xs overflow-hidden whitespace-nowrap truncate">
                  {item.caption}
                </td>
                <td className="p-3">+{item.likes}</td>
                <td className="p-3">+{item.comments}</td>
                <td className="p-3">+{item.shares}</td>
                <td className="p-3">+{item.saved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsightsTable;
