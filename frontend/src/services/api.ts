import { ATSAnalysis } from "@/src/types/ats";

const API_BASE_URL = "http://localhost:8000";

export async function analyzeResume(
  resume: string,
  jobDescription: string
): Promise<ATSAnalysis> {
  const response = await fetch(
    `${API_BASE_URL}/skill-gap/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume,
        job_description: jobDescription,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  return response.json();
}

export async function uploadResume(
  file: File
): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/upload-resume/`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload resume");
  }

  const data = await response.json();

  return data.text;
}