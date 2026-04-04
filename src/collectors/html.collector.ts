export interface HtmlCollectorResult {
  html: string;
  bodyLength: number;
}

export function collectHtmlDocument(html: string): HtmlCollectorResult {
  return {
    html,
    bodyLength: html.length,
  };
}
