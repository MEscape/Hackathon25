import { useState, useMemo } from 'react';

import type {
  EmergencyContact,
  DiscoverableUser,
} from '../schemas/emergency.schema';

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query);
}

export function useContactSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterContacts = useMemo(
    () => (contacts: EmergencyContact[]) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return contacts;

      return contacts.filter(
        c =>
          matchesQuery(c.firstName, query) ||
          matchesQuery(c.lastName, query) ||
          matchesQuery(c.username, query) ||
          matchesQuery(c.email, query)
      );
    },
    [searchQuery]
  );

  const filterUsers = useMemo(
    () => (users: DiscoverableUser[]) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return users;

      return users.filter(
        u => matchesQuery(u.username, query) || matchesQuery(u.email, query)
      );
    },
    [searchQuery]
  );

  const clearSearch = () => setSearchQuery('');

  return {
    searchQuery,
    setSearchQuery,
    filterContacts,
    filterUsers,
    clearSearch,
  };
}
