import { translate } from '@/i18n';
import type { FlattenedTip } from '../types';
import { cleanHtmlText } from '../utils/textProcessing';
import { detectEmergencyType } from './emergencyKeywords';

export const generateContextualResponse = (query: string, tips: FlattenedTip[]): string => {
    const emergencyType = detectEmergencyType(query);
    let response = '';

    // Add emergency-specific introduction
    if (emergencyType === 'emergency') {
        response = translate('emergencyAssistant:responses.emergency') + '\n\n';
    } else if (emergencyType === 'firstAid') {
        response += translate('emergencyAssistant:responses.firstAid') + '\n\n';
    } else if (emergencyType === 'fire') {
        response += translate('emergencyAssistant:responses.fire') + '\n\n';
    } else if (emergencyType === 'weather') {
        response += translate('emergencyAssistant:responses.weather') + '\n\n';
    } else {
        response += translate('emergencyAssistant:responses.general') + '\n\n';
    }

    // Add the most relevant tips
    tips.slice(0, 3).forEach((tip, index) => {
        const cleanText = cleanHtmlText(tip.bodyText);
        response += `${index + 1}. **${tip.tipTitle}**\n${cleanText}\n\n`;
    });

    // Add helpful closing
    response += translate('emergencyAssistant:responses.moreInfo');

    return response;
};

export const generateFallbackResponse = (query: string): string => {
    const emergencyType = detectEmergencyType(query);

    switch (emergencyType) {
        case 'emergency112':
            return translate('emergencyAssistant:responses.fallback112');
        case 'police':
            return translate('emergencyAssistant:responses.fallbackPolice');
        case 'poison':
            return translate('emergencyAssistant:responses.fallbackPoison');
        default:
            return translate('emergencyAssistant:responses.fallbackGeneral');
    }
};