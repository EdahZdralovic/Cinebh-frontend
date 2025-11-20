export interface FilterProps {
  location?: { id: number };
  cityId?: { id: number };
  id: number;
  name: string;
}

type Filters = {
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
