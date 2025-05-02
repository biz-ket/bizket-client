import AgeCheckbox from '@/features/create-marketing/AgeCheckbox';

interface AgeSelectBoxProps {
  age: string;
  handleClick: (age: string) => void;
}

const AgeSelectBox = ({ age, handleClick }: AgeSelectBoxProps) => {
  return (
    <div className="flex flex-wrap justify-between w-full px-20 py-16 gap-y-12">
      <div className="w-1/2">
        <AgeCheckbox
          label="10대 이하"
          onClick={() => handleClick('10대 이하')}
          isChecked={age === '10대 이하'}
        />
      </div>
      <div className="w-1/2">
        <AgeCheckbox
          label="20대"
          onClick={() => handleClick('20대')}
          isChecked={age === '20대'}
        />
      </div>
      <div className="w-1/2">
        <AgeCheckbox
          label="30대"
          onClick={() => handleClick('30대')}
          isChecked={age === '30대'}
        />
      </div>
      <div className="w-1/2">
        <AgeCheckbox
          label="40대"
          onClick={() => handleClick('40대')}
          isChecked={age === '40대'}
        />
      </div>
    </div>
  );
};

export default AgeSelectBox;
