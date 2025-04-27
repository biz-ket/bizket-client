import { IndexRange } from '@/features/search-trend/model/types';
import clsx from 'clsx';
import React, {
  createContext,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type RangeSliderContextType = {
  range: string[] | number[];
  sliderRef: RefObject<HTMLDivElement | null>;
  minIndex: number;
  setMinIndex: (index: number) => void;
  maxIndex: number;
  setMaxIndex: (index: number) => void;
};

const RangeSliderContext = createContext<RangeSliderContextType | null>(null);

const useRangeSliderContext = () => {
  const context = useContext(RangeSliderContext);
  if (!context) {
    throw new Error('You must use within RangeSliderContext.Provider.');
  }
  return context;
};

interface RangeSliderProps {
  range: string[] | number[];
  value?: IndexRange;
  onValueChange?: (range: IndexRange) => void;
  pointSize?: number;
  thumbSize?: number;
}

const RangeSlider = ({
  range,
  value,
  onValueChange,
  pointSize,
  thumbSize,
}: RangeSliderProps) => {
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(range.length - 1);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setMinIndex(value.minIndex);
      setMaxIndex(value.maxIndex);
    }
  }, [value, setMinIndex, setMaxIndex]);

  useEffect(() => {
    onValueChange?.({
      minIndex: minIndex,
      maxIndex: maxIndex,
    });
  }, [minIndex, maxIndex]);

  return (
    <RangeSliderContext.Provider
      value={{
        range,
        sliderRef,
        minIndex,
        setMinIndex,
        maxIndex,
        setMaxIndex,
      }}
    >
      <div
        ref={sliderRef}
        className="w-full relative bg-line-30 h-3 overflow-visible select-none"
      >
        {/* 선택 가능한 지점 */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
          {range.map((point) => (
            <Point
              key={`slider-point-${point}`}
              label={point}
              size={pointSize}
            />
          ))}
        </div>

        {/* 선택 범위 */}
        <SelectedRange />

        {/* 최소값 */}
        <Thumb size={thumbSize} type="min" />
        {/* 최대값 */}
        <Thumb size={thumbSize} type="max" />
      </div>
    </RangeSliderContext.Provider>
  );
};

interface PointProps {
  label: string | number;
  size?: number;
}

const Point = memo(({ label, size }: PointProps) => {
  return (
    <div className="relative">
      <div
        style={{
          width: `${size ?? 5}px`,
          height: `${size ?? 5}px`,
        }}
        className="rounded-[50%] bg-line-30 relative"
      />
      {/* 라벨 */}
      <Label className="absolute left-1/2 top-9 -translate-x-1/2">
        {label}
      </Label>
    </div>
  );
});

const SelectedRange = () => {
  const { minIndex, maxIndex, range } = useRangeSliderContext();

  const left = (minIndex / (range.length - 1)) * 100;
  const width = ((maxIndex - minIndex) / (range.length - 1)) * 100;

  return (
    <div
      style={{
        left: `${left}%`,
        width: `${width}%`,
      }}
      className="bg-primary-50 absolute h-3"
    />
  );
};

interface LabelProps {
  children: ReactNode;
  className?: string;
}

const Label = ({ children, className }: LabelProps) => {
  return (
    <span className={clsx('body-sm-regular text-font-20', className)}>
      {children}
    </span>
  );
};

interface ThumbProps {
  type: 'min' | 'max';
  size?: number;
}

const Thumb = ({ type, size }: ThumbProps) => {
  const { sliderRef, range, minIndex, setMinIndex, maxIndex, setMaxIndex } =
    useRangeSliderContext();

  const isDragging = useRef(false);

  const handleDrag = useCallback(
    (ev: MouseEvent) => {
      const sliderRect = sliderRef.current?.getBoundingClientRect();
      if (!sliderRect) {
        return;
      }

      const x = ev.clientX - sliderRect.left;
      const stepWidth = sliderRect.width / (range.length - 1);
      let index = Math.round(x / stepWidth);
      index = Math.min(index, range.length - 1);
      index = Math.max(0, index);

      if (type === 'min') {
        index = Math.min(index, maxIndex - 1);
        setMinIndex(index);
      } else {
        index = Math.max(index, minIndex + 1);
        setMaxIndex(index);
      }
    },
    [type, sliderRef, minIndex, setMinIndex, maxIndex, setMaxIndex],
  );

  const onMouseMove = useCallback(
    (ev: MouseEvent) => {
      handleDrag(ev);
    },
    [handleDrag],
  );

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  const left =
    ((type === 'min' ? minIndex : maxIndex) / (range.length - 1)) * 100;

  return (
    <div
      style={{
        width: `${size ?? 9}px`,
        height: `${size ?? 9}px`,
        left: `${left}%`,
      }}
      className="rounded-[50%] bg-primary-50 absolute cursor-grab top-1/2 -translate-x-1/2 -translate-y-1/2"
      onMouseDown={handleMouseDown}
    />
  );
};

export default RangeSlider;
