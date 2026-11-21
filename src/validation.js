export function normalizeCourse(course) {
  const normalized = String(course ?? "").trim().toUpperCase();
  if (!normalized) {
    throw new Error("Course name is required");
  }
  return normalized;
}

export function parseGrade(grade) {
  const numeric = Number(grade);
  if (!Number.isInteger(numeric) || numeric < 0 || numeric > 100) {
    throw new Error("Grade must be an integer from 0 to 100");
  }
  return numeric;
}
