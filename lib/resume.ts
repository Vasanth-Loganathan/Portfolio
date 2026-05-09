/**
 * Resume helpers — all resume behaviour lives here.
 *
 * ➜ Place your resume PDF at  /public/resume.pdf
 *
 * Download goes through /api/resume which sets the correct
 * Content-Disposition header, guaranteeing the right filename and format.
 */

/** Open the PDF in a new browser tab (inline view). */
export function viewResume() {
  window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
}

/**
 * Force a Save-As download with the correct filename.
 * The API route at /api/resume sets Content-Disposition: attachment,
 * so the browser always saves it as "Vasanth_Loganathan_Resume.pdf".
 */
export function downloadResume() {
  const link = document.createElement('a');
  link.href = '/api/resume';                              // API route → correct headers
  link.download = 'Vasanth_Loganathan_Resume.pdf';       // forces Save-As with correct filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
