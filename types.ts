
export type Language = 'en' | 'ru' | 'kk';

export type Subject = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'Medicine' | 'Engineering' | 'History' | 'Computer Science' | 'Law' | 'Economics';
export type Level = 'School' | 'Bachelor' | 'Master' | 'Professor' | 'Specialist' | 'Universal' | 'Expert';
export type InteractionType = 'TextStep' | 'SpotTheError' | 'Sequence' | 'Simulation';

export interface UserStats {
  logical: number;
  computational: number;
  carelessness: number;
  strategy: number;
  attention: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  stats: UserStats;
  solvedTaskIds: string[];
  failedTaskIds: string[];
  placementCompleted: boolean;
  assignedGrade: number;
  assignedLevel: Level;
}

export interface VisualMetadata {
  assetDescription?: string;
  hotspots?: Array<{ x: number; y: number; radius: number; id: string; label: string }>;
  sequenceItems?: Array<{ id: string; content: string }>;
}

export interface TaskContent {
  question: string;
  solution: string;
  hint: string;
  visualAsset?: string;
}

export interface Task {
  id: string;
  level: Level;
  subject: Subject;
  topic: string;
  interactionType: InteractionType;
  content: Record<Language, TaskContent>;
  visualMetadata?: VisualMetadata;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  grade?: number;
}

export interface Step {
  content: string;
  timestamp: number;
  duration: number;
  metadata?: any;
}

export interface FormulaCalculatorConfig {
  variables: Array<{ id: string; label: string; unit: string; min?: number; max?: number }>;
  calculate: (values: Record<string, number>) => number;
}

export interface Material {
  id: string;
  subject: Subject;
  level: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  category: 'Formulas' | 'Charts' | 'Protocols' | 'ISO' | 'Medical' | 'Legal';
  calculator?: FormulaCalculatorConfig;
}

export interface KnowledgeNote {
  id: string;
  userId: string;
  text: string;
  folder: string;
  timestamp: number;
}
