import { AgeGroup, Symptom, SymptomCategory } from './types';

export const SYMPTOM_DATABASE: Symptom[] = [
  // PULMONARY
  {
    id: 'freq_lung_infections',
    label: 'Frequent Lung Infections',
    category: SymptomCategory.PULMONARY,
    weight: 7,
    description: 'Recurrent infections caused by thick, sticky mucus trapping bacteria. Common pathogens include Pseudomonas aeruginosa.',
    ageGroups: [AgeGroup.INFANT, AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  },
  {
    id: 'chronic_inflammation',
    label: 'Chronic Airway Inflammation',
    category: SymptomCategory.PULMONARY,
    weight: 6,
    description: 'Persistent inflammation leading to progressive lung disease and reduced function.',
    ageGroups: [AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT]
  },
  {
    id: 'nasal_polyps',
    label: 'Nasal Polyps',
    category: SymptomCategory.PULMONARY,
    weight: 8,
    description: 'Soft, painless, noncancerous growths on the lining of nasal passages or sinuses.',
    ageGroups: [AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  },
  {
    id: 'sinusitis',
    label: 'Chronic Sinusitis',
    category: SymptomCategory.PULMONARY,
    weight: 5,
    description: 'Inflammation or swelling of the tissue lining the sinuses.',
    ageGroups: [AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT]
  },
  {
    id: 'bronchiectasis',
    label: 'Bronchiectasis',
    category: SymptomCategory.PULMONARY,
    weight: 9,
    description: 'Damage to the airways causing them to widen and become flabby and scarred. ~1/3 of preschool-aged children with CF may show signs.',
    ageGroups: [AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  },
  {
    id: 'abpa',
    label: 'Allergic Bronchopulmonary Aspergillosis (ABPA)',
    category: SymptomCategory.PULMONARY,
    weight: 7,
    description: 'A heightened reaction to fungi in the environment, often appearing in childhood.',
    ageGroups: [AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT]
  },

  // PANCREATIC & GI
  {
    id: 'meconium_ileus',
    label: 'Meconium Ileus (Bowel Obstruction)',
    category: SymptomCategory.PANCREATIC_GI,
    weight: 10,
    description: 'Bowel obstruction occurring in neonates. Presents in up to 20% of infants with CF.',
    ageGroups: [AgeGroup.INFANT],
    isRedFlag: true
  },
  {
    id: 'failure_to_thrive',
    label: 'Failure to Thrive / Poor Weight Gain',
    category: SymptomCategory.PANCREATIC_GI,
    weight: 8,
    description: 'Inability to gain weight despite good appetite, often due to exocrine pancreatic insufficiency.',
    ageGroups: [AgeGroup.INFANT, AgeGroup.CHILD],
    isRedFlag: true
  },
  {
    id: 'pancreatic_insufficiency',
    label: 'Pancreatic Insufficiency',
    category: SymptomCategory.PANCREATIC_GI,
    weight: 9,
    description: '>85% of infants with CF are pancreatic insufficient from birth or develop it within the first year.',
    ageGroups: [AgeGroup.INFANT, AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  },
  {
    id: 'constipation',
    label: 'Chronic Constipation / DIOS',
    category: SymptomCategory.PANCREATIC_GI,
    weight: 5,
    description: 'Distal Intestinal Obstruction Syndrome (DIOS) or severe constipation.',
    ageGroups: [AgeGroup.INFANT, AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT]
  },
  {
    id: 'cfrd',
    label: 'Cystic Fibrosis-Related Diabetes (CFRD)',
    category: SymptomCategory.PANCREATIC_GI,
    weight: 9,
    description: 'A unique type of diabetes caused by scarring of the pancreas.',
    ageGroups: [AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  },
  {
    id: 'fat_malabsorption',
    label: 'Fat Malabsorption (Greasy Stools)',
    category: SymptomCategory.PANCREATIC_GI,
    weight: 7,
    description: 'Result of enzyme deficiency, leading to nutritional deficiencies (Vit A, D, E, K).',
    ageGroups: [AgeGroup.INFANT, AgeGroup.CHILD]
  },

  // LIVER
  {
    id: 'prolonged_jaundice',
    label: 'Prolonged Neonatal Jaundice',
    category: SymptomCategory.LIVER,
    weight: 4,
    description: 'Associated with cholestasis or bile duct obstruction.',
    ageGroups: [AgeGroup.INFANT]
  },
  {
    id: 'liver_disease',
    label: 'Liver Disease / Cirrhosis',
    category: SymptomCategory.LIVER,
    weight: 6,
    description: 'Blocked bile ducts can lead to liver damage and cirrhosis over time.',
    ageGroups: [AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT]
  },

  // OTHER
  {
    id: 'salty_skin',
    label: 'Salty Skin / Chloride in Sweat',
    category: SymptomCategory.OTHER,
    weight: 10,
    description: 'Abnormally high concentration of chloride in sweat due to CFTR dysfunction.',
    ageGroups: [AgeGroup.INFANT, AgeGroup.CHILD, AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  },
  {
    id: 'cbavd',
    label: 'Male Infertility (CBAVD)',
    category: SymptomCategory.OTHER,
    weight: 10,
    description: 'Congenital Bilateral Absence of the Vas Deferens. Almost universal in males with CF.',
    ageGroups: [AgeGroup.ADOLESCENT_ADULT],
    isRedFlag: true
  }
];

export const EDUCATIONAL_CONTENT = {
  EARLY_IMPACT: `CF organ damage can begin early in life. Lung damage can be observed on MRI and CT scans in early infancy and may occur before loss of lung function is detected. Most children with CF develop small airway dysfunction within the first 3 months of life.`,
  
  DIAGNOSTIC_CRITERIA: `Diagnosis is a multistep process based on:
  1. Clinical presentation (phenotype).
  2. Sweat chloride testing.
  3. Genetic testing (2 CFTR mutations).`,

  SWEAT_CHLORIDE_GUIDE: `Sweat Chloride Interpretation:
  • ≥60 mmol/L: CF Diagnosis confirmed.
  • 30-59 mmol/L: Possible CF, further analysis required.
  • ≤29 mmol/L: CF unlikely.`,

  IMPORTANCE: `Early childhood is a pivotal period for interventions. Detecting and treating CF-related manifestations at a young age could:
  • Support nutritional status.
  • Improve respiratory outcomes.
  • Postpone Pseudomonas aeruginosa infection.
  • Extend survival.`
};