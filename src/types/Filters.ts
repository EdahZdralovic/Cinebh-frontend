import type { ReactNode } from 'react';

export interface FilterProps {
  location: { id: number };
  cityId: { id: number };
  id: number;
  name: string;
}
export type Filters = {
  cityId: number[];
  venueId: number[];
  genreIds: number[];
  fromDate: string | null;
  toDate: string | null;
  selectedDate: string | null;
  projectionTimes: string[] | null;
  selectedProjectionId?: number;
  q: string;
};

export type DatePickerProps = {
  value: { fromDate: string | null; toDate: string | null };
  onApply: (patch: { fromDate: string | null; toDate: string | null }) => void;
  onToggle?: () => void;
};

export type UpcomingFilterProps = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
};

export interface FilterTypeProps {
  endpoint: string;
  params?: Record<string, any>;
  placeholder: string;
  value: (string | number)[];
  valueType?: 'number' | 'string';
  onApply: (ids: any[], allElements?: FilterProps[]) => void;
  icon: ReactNode;
  labelKey?: string;
  valueKey?: string;
  customClassNameHeader?: string;
  customClassNameToggle?: string;
  singleSelect?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export type FilterParams = {
  venueIds?: number[];
  cityId?: number[];
};
