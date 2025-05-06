'use client';

import { useEffect, useState } from 'react';
import { useMediaInsights } from '@/features/insight/hooks/useMediaInsights';
import { useBusinessProfile } from '@/features/insight/hooks/useBusinessProfile';
import Container from '@/shared/ui/layout/Container';
import Image from 'next/image';
import Flex from '@/shared/ui/layout/Flex';

export default function InsightPage() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const {
    data: insights = [],
    isLoading: loadingInsights,
    isError: errorInsights,
    error: insightError,
  } = useMediaInsights();

  const {
    data: profile,
    isLoading: loadingProfile,
    isError: errorProfile,
    error: profileError,
  } = useBusinessProfile();

  useEffect(() => {
    console.log('▶️ insights:', insights);
  }, [insights]);

  useEffect(() => {
    console.log('▶️ profile:', profile);
  }, [profile]);

  // ─── 페이지네이션 세팅 ────────────────────────────────────
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(insights.length / pageSize);
  const visibleInsights = insights.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  if (!hasMounted) {
    return (
      <Container>
        <h1 className="text-2xl font-bold mb-4">미디어 인사이트</h1>
        {insights.length === 0 && <p>표시할 인사이트가 없습니다.</p>}
      </Container>
    );
  }

  if (loadingInsights || loadingProfile) {
    return (
      <Container>
        <p>인사이트 불러오는 중…</p>
      </Container>
    );
  }
  if (errorInsights || errorProfile) {
    const msg =
      insightError?.message || profileError?.message || '알 수 없는 오류';
    return (
      <Container>
        <p className="text-red-500">인사이트 로드 실패: {msg}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Flex gap={36} className="pt-90 pb-80">
        {/* ── 왼쪽: 프로필 카드 ─────────────────────────────── */}
        <div className="relative w-[400px] h-[635px] px-30 py-45 bg-gradient-to-br from-primary-50 to-primary-30 text-white p-6 rounded-20 relative overflow-hidden">
          <p className="text-primary-10 mb-40">고객 프로필</p>
          <Flex align="center" gap={13} className="mb-15">
            <h2 className="title-xl2-semibold">{profile?.placeName}</h2>
            <p className="rounded-20 bg-white px-10 py-5 text-primary-50 label-sm-semibold">
              {profile?.businessSubCategoryName}
            </p>
          </Flex>
          <Flex gap={10} className="mb-10">
            <p className="body-md-regular">
              {profile?.customerAgeGroupLabel} 고객층
            </p>
            <p className="text-primary-10 body-md-regular">
              {profile?.openDate} 오픈
            </p>
          </Flex>
          <p className="body-md-regular border-b border-white border-solid mb-18 pb-15">
            {profile?.address}
          </p>
          <div>
            <p className="body-md-regular mb-8">
              <span className="text-primary-10 w-[70px] inline-block mr-15">
                팔로워
              </span>
              {profile?.followerCount}
            </p>
            <p className="body-md-regular">
              <span className="text-primary-10 w-[70px] inline-block mr-15">
                인스타그램
              </span>
              {profile?.instagramAccountId}
            </p>
          </div>

          <Image
            src="/images/shared/insight-profile.svg"
            alt="프로필 카드 배경"
            fill
            className="absolute !bottom-[-9px] !top-auto right-0"
          />
        </div>

        {/* ── 오른쪽: 인사이트 테이블 ───────────────────────── */}
        <div className="w-2/3 bg-white flex flex-col">
          <div className="overflow-x-auto">
            <table
              className="w-full table-auto text-left border-separate"
              style={{ borderSpacing: 0 }}
            >
              <thead className="bg-black text-white">
                <tr className="bg-black text-white text-center">
                  <th className="body-sm-regular p-3 ">게시일</th>
                  <th className="p-3 body-sm-regular">플랫폼</th>
                  <th className="p-3 body-sm-regular">게시내용</th>
                  <th className="p-3 body-sm-regular">좋아요</th>
                  <th className="p-3 body-sm-regular">댓글수</th>
                  <th className="p-3 body-sm-regular">공유수</th>
                  <th className="p-3 body-sm-regular">저장횟수</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleInsights.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors text-center"
                  >
                    <td className="p-3">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-3">{item.platform}</td>
                    <td className="p-3 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis truncate">
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

          {/* ── 페이지네이션 ───────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-auto flex justify-center gap-2 py-4 text-sm text-gray-600">
              {[...Array(totalPages)].map((_, idx) => {
                const num = idx + 1;
                return (
                  <button
                    key={num}
                    className={`
              px-3 py-1 rounded  
              ${
                page === num
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700'
              }
              hover:bg-gray-300
              transition
            `}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Flex>
    </Container>
  );
}
