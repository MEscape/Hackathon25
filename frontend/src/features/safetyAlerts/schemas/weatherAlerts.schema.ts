import { z } from 'zod';

export const WeatherAlertSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  guid: z.string(),
  pubDate: z.string(),
  region: z.string(),
  awarenessLevel: z.number(),
  awarenessType: z.number(),
  validFrom: z.string(),
  validUntil: z.string(),
  language: z.string(),
});

export type WeatherAlert = z.infer<typeof WeatherAlertSchema>;

export const WeatherAlertsResponseSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  language: z.string(),
  ttl: z.number(),
  items: z.array(WeatherAlertSchema),
});

export type WeatherAlertsResponse = z.infer<typeof WeatherAlertsResponseSchema>;
