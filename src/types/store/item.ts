export type Item = {
  createdby: string;
  date: string;
  fonticon: string;
  icon: string;
  index?: number;
  isScrolling: boolean;
  item: string;
  lastupdated: string;
  name: string;
  selected: boolean;
};

export type ClassAssignment = {
  uploaded: boolean;
} & Item;

export type Media = {
  check: boolean;
} & Omit<Item, 'date'>;

export type SharedItem = {
  id: number;
  createddate: string;
  status: string;
} & Omit<Item, 'date' | 'fonticon'>;
