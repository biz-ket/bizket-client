import Flex from '@/shared/ui/layout/Flex';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ServiceCardProps {
  category: string;
  title: string | ReactNode;
  link: string;
  imgUrl: string;
}

const ServiceCard = ({ category, title, link, imgUrl }: ServiceCardProps) => {
  return (
    <Link
      style={{ backgroundImage: `url(${imgUrl})` }}
      href={link}
      className="w-[280px] h-[363px] rounded-20 px-26 py-30"
    >
      <Flex direction="col" justify="between" className="h-full">
        <Flex direction="col" gap={19}>
          <p className="text-white body-md-regular">{category}</p>
          <h5 className="text-white title-sm">{title}</h5>
        </Flex>
        <p className="text-white body-md-regular">바로가기 &gt;</p>
      </Flex>
    </Link>
  );
};

export default ServiceCard;
