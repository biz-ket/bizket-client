import Card from './Card';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  description: string;
  data: string | number;
  icon: ReactNode;
}

const MetricCard = ({
  title,
  subtitle,
  description,
  data,
  icon,
}: MetricCardProps) => {
  return (
    <Card className="flex flex-col px-26 pt-21 pb-30">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div className="body-lg-semibold text-font-50">{title}</div>
          {subtitle && (
            <div className="body-sm-regular text-font-50">{subtitle}</div>
          )}
        </div>
        <div className="label-sm-medium text-font-20">{description}</div>
      </div>

      <div className="flex w-full items-center mt-43">
        <div className="w-37 h-37 bg-primary-10 rounded-12 flex justify-center items-center">
          {icon}
        </div>
        <div className="flex-1 text-right heading-sm text-font-50">{data}</div>
      </div>
    </Card>
  );
};

export default MetricCard;
