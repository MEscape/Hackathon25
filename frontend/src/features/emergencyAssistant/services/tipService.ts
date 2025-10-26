import type { EmergencyTipsResponse, FlattenedTip } from '../types';

export const flattenTips = (
  response: EmergencyTipsResponse
): FlattenedTip[] => {
  const flattened: FlattenedTip[] = [];
  let idCounter = 0;

  response.category.forEach(category => {
    category.tips.forEach(tip => {
      tip.articles.forEach(article => {
        const searchableText = [
          category.title,
          tip.title,
          article.title,
          article.bodyText.replace(/<[^>]*>/g, ''),
        ]
          .join(' ')
          .toLowerCase();

        flattened.push({
          id: `tip_${idCounter++}`,
          categoryTitle: category.title,
          tipTitle: tip.title,
          articleTitle: article.title,
          bodyText: article.bodyText,
          image: article.image,
          eventCodes: category.eventCodes,
          searchableText,
        });
      });
    });
  });

  return flattened;
};

export const findRelevantTips = (
  query: string,
  tips: FlattenedTip[],
  maxResults = 3
): FlattenedTip[] => {
  const searchTerms = query
    .toLowerCase()
    .split(' ')
    .filter(term => term.length > 2);

  const scoredTips = tips.map(tip => {
    let score = 0;
    searchTerms.forEach(term => {
      if (tip.searchableText.includes(term)) {
        score += 1;
      }
      // Boost score for matches in titles
      if (tip.categoryTitle.toLowerCase().includes(term)) score += 2;
      if (tip.tipTitle.toLowerCase().includes(term)) score += 2;
      if (tip.articleTitle.toLowerCase().includes(term)) score += 1;
    });
    return { tip, score };
  });

  return scoredTips
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.tip);
};
