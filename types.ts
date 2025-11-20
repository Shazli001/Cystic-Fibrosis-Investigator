export enum AgeGroup {
  INFANT = 'Infant (< 2 years)',
  CHILD = 'Child (2-12 years)',
  ADOLESCENT_ADULT = 'Adolescent/Adult (> 12 years)'
}

export enum SymptomCategory {
  PULMONARY = 'Pulmonary',
  PANCREATIC_GI = 'Pancreatic & GI',
  LIVER = 'Liver',
  OTHER = 'Other Systemic',
  TEST_RESULTS = 'Clinical Tests'
}

export interface Symptom {
  id: string;
  label: string;
  category: SymptomCategory;
  weight: number; // 1-10 scale of specificity to CF
  description: string; // Educational context
  ageGroups: AgeGroup[];
  isRedFlag?: boolean; // Highly specific symptom (e.g., Meconium Ileus)
}

export interface PatientProfile {
  age: number; // in years. For infants < 1, use decimals (e.g. 0.5)
  isMale: boolean;
  symptoms: string[]; // IDs of selected symptoms
  sweatChlorideLevel?: number; // Optional known value
}

export interface AnalysisResult {
  probabilityScore: number; // 0-100
  severityLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  matchedSymptoms: Symptom[];
  missingRedFlags: string[];
  recommendations: string[];
  educationalContent: {
    title: string;
    content: string;
  }[];
}