export const cleanHtmlText = (text: string, maxLength?: number): string => {
  const cleaned = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return maxLength ? cleaned.substring(0, maxLength) : cleaned;
};

export const extractSearchTerms = (query: string, minLength = 2): string[] => {
  return query
    .toLowerCase()
    .split(' ')
    .filter(term => term.length > minLength);
};
