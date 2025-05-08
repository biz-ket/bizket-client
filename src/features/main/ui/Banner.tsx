'use client';

import Flex from '@/shared/ui/layout/Flex';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      style={{ backgroundImage: "url('/images/main/main-banner.png')" }}
      className="relative w-full h-[1080px] bg-bottom bg-cover -mt-60 -z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Flex
          direction="col"
          align="center"
          gap={25}
          className="relative pt-[225px]"
        >
          <div className="text-white rounded-full px-25 py-7 title-xl-semibold bg-primary-30">
            BIZKET
          </div>
          <h2 className="text-center text-black heading-lg">
            마케팅의 모든 것<br />
            비즈킷에서 쉽고 빠르게!
          </h2>
          <p className="title-lg text-font-30">
            소상공인을 위한 AI기반 마케팅 도우미
          </p>
        </Flex>
      </motion.div>
    </div>
  );
};

export default Banner;
