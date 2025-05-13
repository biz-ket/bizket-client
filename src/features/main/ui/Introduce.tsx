'use client';

import ContentSubTitle from '@/features/main/ui/ContentSubTitle';
import ContentTitle from '@/features/main/ui/ContentTitle';
import ServiceCard from '@/features/main/ui/ServiceCard';
import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Introduce = () => {
  return (
    <Flex direction="col" className="w-full">
      <Container>
        <Flex
          direction="col"
          gap={200}
          className="w-full pt-[125px] pb-[160px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Flex direction="col" gap={60} className="w-full">
              <Flex gap={134} className="w-full">
                <Flex direction="col" gap={10}>
                  <ContentSubTitle fontSize={20} title="Category" />
                  <ContentTitle title="소상공인을 위한 AI 마케팅 서비스" />
                </Flex>
                <div className="w-[590px] mt-48">
                  <ContentSubTitle title="상품 설명부터 마케팅 글, 이미지 목업 제작까지, 이제 복잡하게 고민할 필요 없습니다. AI로 똑똑하게 마케팅을 관리하고, 우리 가게의 성장을 자연스럽게 이끌어보세요." />
                </div>
              </Flex>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <Flex justify="between" align="center" className="w-full">
                  <ServiceCard
                    category="마이페이지"
                    title={
                      <>
                        우리 가게의 정보와
                        <br />
                        사용 이력 관리하기
                      </>
                    }
                    link="/my"
                    imgUrl="/images/main/card1.png"
                  />
                  <ServiceCard
                    category="마케팅 콘텐츠 생성 AI"
                    title={
                      <>
                        브랜드 톤에 맞는
                        <br /> 콘텐츠를 즉시 제작
                      </>
                    }
                    link="/create"
                    imgUrl="/images/main/card2.png"
                  />
                  <ServiceCard
                    category="비즈니스 보고서"
                    title={
                      <>
                        우리 가게의 마케팅
                        <br />
                        데이터를 한눈에 확인
                      </>
                    }
                    link="/report"
                    imgUrl="/images/main/card3.png"
                  />
                  <ServiceCard
                    category="검색어 트렌드"
                    title={
                      <>
                        트렌드 키워드 검색으로
                        <br />
                        마케팅 인사이트 찾기
                      </>
                    }
                    link="/search-trend"
                    imgUrl="/images/main/card4.png"
                  />
                </Flex>
              </motion.div>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Flex direction="col" gap={60} className="w-full">
              <Flex gap={134} className="w-full">
                <Flex direction="col" gap={10}>
                  <ContentSubTitle title="서비스 소개" />
                  <ContentTitle title="빠르고 쉽게 우리 가게 마케팅하기" />
                </Flex>
                <div className="w-[590px] mt-48">
                  <ContentSubTitle title="비즈킷에서 AI로 상품 설명, 마케팅 글, 이미지 생성까지 한 번에! 우리 가게의 성장을 위해 마케팅 콘텐츠를 간편하게 생성해 보세요!" />
                </div>
              </Flex>
              <div className="relative w-full">
                <Image
                  style={{ width: '100%' }}
                  width={1200}
                  height={800}
                  src="/images/main/introduce2.png"
                  alt="서비스소개 이미지"
                />
                <div className="absolute -right-70 bottom-30">
                  <Image
                    width={313}
                    height={327}
                    src="/images/main/introduce2-1.png"
                    alt="소개 이미지2"
                  />
                </div>
              </div>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Flex justify="between" align="center" className="w-full">
              <Flex direction="col" gap={50}>
                <Flex direction="col" gap={18}>
                  <ContentTitle
                    title={
                      <>
                        트렌드 키워드 검색으로
                        <br />
                        효과적인 콘텐츠를 생성해 보세요
                      </>
                    }
                  />
                  <ContentSubTitle
                    title={
                      <>
                        트렌드 키워드를 통해 소비자의 관심과 행동을 파악하고,
                        <br />
                        마케팅 전략에 인사이트를 더해보세요.
                      </>
                    }
                  />
                </Flex>
                <Link
                  href="/search-trend"
                  className="py-12 text-white bg-black rounded-full px-28 label-xl-semibold"
                >
                  더 알아보기
                </Link>
              </Flex>
              <Image
                width={654}
                height={404}
                src="/images/main/introduce3.png"
                alt="서비스 소개 이미지지"
              />
            </Flex>
          </motion.div>
        </Flex>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <Flex
          justify="center"
          align="center"
          gap={170}
          className="w-full h-[825px] bg-[#F8F8F8]"
        >
          <Image
            width={580}
            height={500}
            src="/images/main/introduce4.png"
            alt="서비스 소개 이미지"
          />
          <Flex direction="col" gap={50}>
            <Flex direction="col" gap={18}>
              <ContentTitle
                title={
                  <>
                    한눈에 내 브랜드 성과를
                    <br />
                    확인해 보세요
                  </>
                }
              />
              <ContentSubTitle
                title={
                  <>
                    다양한 채널의 마케팅 데이터를 한눈에 확인하고,
                    <br />
                    마케팅 효과를 쉽게 분석할 수 있도록 도와줍니다.
                  </>
                }
              />
            </Flex>
            <Link
              href="/report"
              className="py-12 text-white bg-black rounded-full px-28 label-xl-semibold"
            >
              더 알아보기
            </Link>
          </Flex>
        </Flex>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <Flex
          justify="center"
          align="center"
          gap={170}
          className="w-full h-[825px] bg-[#fff]"
        >
          <Flex direction="col" gap={50}>
            <Flex direction="col" gap={18}>
              <ContentTitle
                title={
                  <>
                    우리 가게의 정보와
                    <br />
                    서비스 사용 이력을 확인하세요
                  </>
                }
              />
              <ContentSubTitle
                title={
                  <>
                    매장 정보부터 콘텐츠 생성 이력까지 확인할 수 있어
                    <br />
                    운영 현황을 쉽고 편리하게 관리할 수 있습니다.
                  </>
                }
              />
            </Flex>
            <Link
              href="/my"
              className="py-12 text-white bg-black rounded-full px-28 label-xl-semibold"
            >
              더 알아보기
            </Link>
          </Flex>
          <Image
            width={580}
            height={500}
            src="/images/main/introduce5.png"
            alt="서비스 소개 이미지"
          />
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default Introduce;
