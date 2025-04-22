import RangeSlider from './RangeSlider';

const ageRange = [
  '0',
  '13',
  '19',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
  '60+',
];

const AgeSlider = () => {
  return <RangeSlider range={ageRange} />;
};

export default AgeSlider;
