'use client';
import { MediaWithInsights } from '@/features/report/hooks/useMediaInsights';
import Image from 'next/image';

export interface InsightsTableProps {
  insights: MediaWithInsights[];
  onCreate?: () => void;
}

const formatWithSign = (n: number) => {
  if (n < 0) return '–';
  return `+${n}`;
};
export const formatDate = (dateValue: string | number | Date): string => {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
const InsightsTable = ({ insights, onCreate }: InsightsTableProps) => {
  return (
    <div className="flex-1 bg-white flex flex-col h-[635px] border rounded-20 overflow-hidden">
      {/* ─── 헤더 영역 ───────────────── */}
      <div className="overflow-x-auto">
        <table
          className="w-full table-auto text-left border-collapse"
          style={{ borderSpacing: 0 }}
        >
          <colgroup>
            <col className="w-[110px]" />
            <col className="w-100" />
            <col />
            <col className="w-60" />
            <col className="w-60" />
            <col className="w-60" />
            <col className="w-70" />
          </colgroup>
          <thead className="bg-black text-white text-center px-10">
            <tr>
              <th className="body-sm-regular py-18 pl-10">게시일</th>
              <th className="body-sm-regular py-18">플랫폼</th>
              <th className="body-sm-regular py-18">게시내용</th>
              <th className="body-sm-regular py-18">좋아요</th>
              <th className="body-sm-regular py-18">댓글수</th>
              <th className="body-sm-regular py-18">공유수</th>
              <th className="body-sm-regular py-18 pr-20">저장횟수</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* ─── 바디 영역 ──────────── */}
      <div className="overflow-auto flex-1">
        {insights.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center ">
            <div className="w-100 h-100 relative mb-25">
              <Image src="/images/shared/document.svg" fill alt="데이터 없음" />
            </div>
            <p className="body-md-regular text-font-30">게시글이 없어요</p>
            <p className="body-sm-regula text-font-20">
              마케팅 콘텐츠 생성 AI로 게시글을 작성해 보세요
            </p>

            <button
              onClick={onCreate}
              className="mt-1 text-font-20 body-sm-regular rounded-8 px-14 py-5 bg-bg-10"
            >
              생성하러 가기
            </button>
          </div>
        ) : (
          <table
            className="w-full table-auto text-left border-collapse"
            style={{ borderSpacing: 0 }}
          >
            <colgroup>
              <col className="w-[110px]" />
              <col className="w-100" />
              <col />
              <col className="w-60" />
              <col className="w-60" />
              <col className="w-60" />
              <col className="w-70" />
            </colgroup>
            <tbody className="ㄴdivide-gray-200 text-center">
              {insights.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors text-center border-b border-gray-200"
                >
                  <td className="py-17 body-sm-regular text-font-20 pl-15ㄴ">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="py-17 body-sm-regular text-font-20">
                    {item.platform}
                  </td>
                  <td className="py-17 body-sm-regular text-font-20 text-left max-w-[250px] px-15 overflow-hidden whitespace-nowrap truncate">
                    {item.caption}
                  </td>
                  <td className="py-17 body-sm-regular text-font-30">
                    {formatWithSign(item.likes)}
                  </td>
                  <td className="py-17 body-sm-regular text-font-30">
                    {formatWithSign(item.comments)}
                  </td>
                  <td className="py-17 body-sm-regular text-font-30">
                    {formatWithSign(item.shares)}
                  </td>
                  <td className="py-17 body-sm-regular text-font-30 pr-20">
                    {formatWithSign(item.saved)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InsightsTable;
