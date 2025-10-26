import { z } from 'zod';

export const PoliceAlertSchema = z.object({
  id: z.string(),
  version: z.number(),
  startDate: z.string(),
  severity: z.string(),
  type: z.string(),
  i18nTitleDe: z.string(),
});

export const PoliceAlertsResponseSchema = z.object({
  items: z.array(PoliceAlertSchema),
});

export type PoliceAlert = z.infer<typeof PoliceAlertSchema>;
export type PoliceAlertsResponse = z.infer<typeof PoliceAlertsResponseSchema>;
