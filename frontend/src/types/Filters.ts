import type { ReactNode } from 'react';

export interface FilterProps {
  location?: { id: number };
  cityId?: { id: number };
  id: number;
  name: string;
}

export type Filters = {
  cityId: number[];
  venueId: number[];
  genreIds: number[];
  fromDate: string | null;
  toDate: string | null;
  q: string;
};

export type DatePickerProps = {
  value: { fromDate: string | null; toDate: string | null };
  onApply: (patch: { fromDate: string | null; toDate: string | null }) => void;
};

export interface FilterTypeProps {
  endpoint: string;
  params?: object;
  placeholder: string;
  value: number[];
  onApply: (ids: number[], allElements?: FilterProps[]) => void;
  labelKey?: string;
  icon: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}
export type UpcomingFilterProps = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
};
