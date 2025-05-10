'use client';
import { MediaWithInsights } from '@/features/report/hooks/useMediaInsights';

export interface InsightsTableProps {
  insights: MediaWithInsights[];
}

const InsightsTable = ({ insights }: InsightsTableProps) => {
  return (
    <div className="flex-1 bg-white flex flex-col h-[635px] border rounded-20 overflow-hidden ">
      <div className="overflow-x-auto">
        <table
          className="w-full table-auto text-left border-collapse"
          style={{ borderSpacing: 0 }}
        >
          <colgroup>
            <col className="w-100" />
            <col className="w-90" />
            <col />
            <col className="w-60" />
            <col className="w-60" />
            <col className="w-60" />
            <col className="w-70" />
          </colgroup>
          <thead className="bg-black text-white text-center px-10">
            <tr>
              <th className="body-sm-regular py-18 pl-20">게시일</th>
              <th className="body-sm-regular py-18">플랫폼</th>
              <th className="body-sm-regular py-18">게시내용</th>
              <th className="body-sm-regular py-18">좋아요</th>
              <th className="body-sm-regular py-18">댓글수</th>
              <th className="body-sm-regular py-18">공유수</th>
              <th className="body-sm-regular py-18 pr-20">저장횟수</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200 ">
            {insights.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors text-center border-b border-gray-200"
              >
                <td className="py-15 body-sm-regular  text-font-20 pl-20">
                  {new Date(item.timestamp).toLocaleDateString()}
                </td>
                <td className="py-15 body-sm-regular  text-font-20">
                  {item.platform}
                </td>
                <td className="py-15 body-sm-regular  text-font-20 max-w-[250px] pr-40 overflow-hidden whitespace-nowrap truncate">
                  {item.caption}
                </td>
                <td className="py-15 body-sm-regular  text-font-30">
                  +{item.likes}
                </td>
                <td className="py-15 body-sm-regular  text-font-30">
                  +{item.comments}
                </td>
                <td className="py-15 body-sm-regular  text-font-30">
                  +{item.shares}
                </td>
                <td className="py-15 body-sm-regular  text-font-30 pr-20">
                  +{item.saved}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsightsTable;
