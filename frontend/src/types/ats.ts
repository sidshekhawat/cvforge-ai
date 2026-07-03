export interface ATSAnalysis {
  overall_match: number;
  verdict: string;

  analysis_summary: string;
  improvement_report: string;

  strengths: string[];
  weaknesses: string[];

  skills_match: number;
  experience_match: number;
  project_match: number;
  education_match: number;
  certification_match: number;

  matched_skills: string[];
  missing_skills: string[];

  recommendations: string[];
  improvement_suggestions: string[];
}