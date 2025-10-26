export interface EmergencyTipImage {
  src: string;
  title: string;
  alt: string;
  lastModificationDate: number;
  hash: string;
}

export interface EmergencyTipArticle {
  title: string;
  bodyText: string;
  image?: EmergencyTipImage;
  lastModificationDate: number;
}

export interface EmergencyTip {
  title: string;
  articles: EmergencyTipArticle[];
}

export interface EmergencyTipCategory {
  title: string;
  tips: EmergencyTip[];
  eventCodes: string[];
  lastModificationDate: number;
}

export interface EmergencyTipsResponse {
  category: EmergencyTipCategory[];
  lastModificationDate: number;
}

export interface FlattenedTip {
  id: string;
  categoryTitle: string;
  tipTitle: string;
  articleTitle: string;
  bodyText: string;
  image?: EmergencyTipImage;
  eventCodes: string[];
  searchableText: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
