import { z } from 'zod';

export const EmergencyContactSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().email(),
  status: z.enum(['online', 'offline']),
  lastSeen: z.string().optional(),
});

export const DiscoverableUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  mutualFriends: z.number(),
  requestStatus: z.enum(['none', 'sent', 'received', 'friends']),
});

export const EmergencyContactsResponseSchema = z.object({
  contacts: z.array(EmergencyContactSchema),
});

export const DiscoverableUsersResponseSchema = z.object({
  users: z.array(DiscoverableUserSchema),
});

export const FriendRequestResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

// Type exports
export type EmergencyContact = z.infer<typeof EmergencyContactSchema>;
export type DiscoverableUser = z.infer<typeof DiscoverableUserSchema>;
export type FriendRequestResponse = z.infer<typeof FriendRequestResponseSchema>;
