export interface Page {
  title: string;
  id?: string;
  topics: Topic[];
  references?: Link[];
}

export interface Topic {
  name?: string;
  id?: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  groups: Group[];
}

export interface Group {
  type: 'permanent' | 'visible' | 'hidden';
  name?: string;
  style?: string;
  divisions: Division[];
}

export interface Division {
  type: 'side-by-side' | 'middle';
  areas: Area[];
}

export interface Area {
  side: 'runner' | 'corp' | 'neutral';
  rules: EntryGroup[];
}

export interface EntryGroup {
  id?: string;
  entry: (TextData | Detail | Interact)[];
}

export interface TextData {
  id?: string;
  text: string;
  style?: string;
}

export interface Detail {
  id?: string;
  type: 'detail' | 'detail-open';
  summary: TextData;
  expanded: TextData[];
}

export interface Interact {
  id?: string;
  type: 'interact';
  message?: TextData;
  composition?: 'center' | 'vertical' | 'horizontal';
  links?: Link[];
}

export interface Link {
  id?: string;
  target?: string;
  answer?: string;
  action?: string;
}
