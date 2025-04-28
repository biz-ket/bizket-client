export type IndexRange = {
  minIndex: number;
  maxIndex: number;
};

export type AgeCategory =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11';

export type Ages = AgeCategory[] | undefined;

export type TrendSearchFormValues = {
  keyword: string;
  dateRange: {
    from: Date;
    to?: Date;
  };
  device: 'pc' | 'mo' | 'all';
  gender: 'm' | 'f' | 'all';
  ages: IndexRange;
};

export type TrendSearchParams = {
  keyword: string;
  startDate: string;
  endDate: string;
  device: 'pc' | 'mo' | undefined;
  gender: 'm' | 'f' | undefined;
  ages: Ages;
}
