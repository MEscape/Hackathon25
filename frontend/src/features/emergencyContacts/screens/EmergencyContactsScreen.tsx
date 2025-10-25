import React, { useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { EmptyState } from '@/components/EmptyState';
import { useAppTheme } from '@/theme/context';
import { translate } from '@/i18n';
import type { ThemedStyle } from '@/theme/types';
import type { ViewStyle } from 'react-native';

import { useEmergencyContacts } from '../hooks/useEmergencyContacts';
import { useContactSearch } from '../hooks/useContactSearch';
import { SearchBar, TabBar, SkeletonList } from '../components';
import { ContactCard } from '../components/ContactCard';
import { DiscoverCard } from '../components/DiscoverCard';
import { RequestCard } from '../components/RequestCard';

export type TabType = 'contacts' | 'discover' | 'requests';

export function EmergencyContactsScreen() {
  const { themed } = useAppTheme();
  const [activeTab, setActiveTab] = useState<TabType>('contacts');

  const {
    contacts,
    discoverableUsers,
    pendingRequests,
    isLoading,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeEmergencyContact,
  } = useEmergencyContacts();

  const { searchQuery, setSearchQuery, filterContacts, filterUsers, clearSearch } = useContactSearch();

  const handleSendRequest = async (id: string) => {
    const result = await sendFriendRequest(id);
    if (result.success) {
      Toast.show({ type: 'success', text1: translate('emergencyContacts:toasts.friendRequestSent') });
    } else {
      Toast.show({ type: 'error', text1: translate('emergencyContacts:toasts.friendRequestSentError'), text2: result.error });
    }
  };

  const handleAcceptRequest = async (id: string) => {
    const result = await acceptFriendRequest(id);
    if (result.success) {
      Toast.show({ type: 'success', text1: translate('emergencyContacts:toasts.friendRequestAccepted') });
    } else {
      Toast.show({ type: 'error', text1: translate('emergencyContacts:toasts.friendRequestAcceptError'), text2: result.error });
    }
  };

  const handleDeclineRequest = async (id: string) => {
    const result = await declineFriendRequest(id);
    if (result.success) {
      Toast.show({ type: 'success', text1: translate('emergencyContacts:toasts.friendRequestDeclined') });
    } else {
      Toast.show({ type: 'error', text1: translate('emergencyContacts:toasts.friendRequestDeclineError'), text2: result.error });
    }
  };

  const handleRemoveContact = async (id: string) => {
    const result = await removeEmergencyContact(id);
    if (result.success) {
      Toast.show({ type: 'success', text1: translate('emergencyContacts:toasts.contactRemoved') });
    } else {
      Toast.show({ type: 'error', text1: translate('emergencyContacts:toasts.contactRemoveError'), text2: result.error });
    }
  };

  const renderContacts = () => {
    const items = filterContacts(contacts);
    if (isLoading) return <SkeletonList count={5} />;
    if (items.length === 0) {
      return (
          <EmptyState
              icon="people"
              message={translate('emergencyContacts:empty.contactsMessage')}
              description={translate('emergencyContacts:empty.contactsDescription')}
          />
      );
    }

    return (
        <View style={themed($list)}>
          {items.map((contact) => (
              <ContactCard
                  key={contact.id}
                  contact={contact}
                  onRemove={() => handleRemoveContact(contact.id)}
              />
          ))}
        </View>
    );
  };

  const renderDiscover = () => {
    const items = filterUsers(discoverableUsers);
    if (isLoading) return <SkeletonList count={5} />;
    if (items.length === 0) {
      return (
          <EmptyState
              icon="search"
              message={translate('emergencyContacts:empty.discoverMessage')}
              description={translate('emergencyContacts:empty.discoverDescription')}
          />
      );
    }

    return (
        <View style={themed($list)}>
          {items.map((user) => (
              <DiscoverCard
                  key={user.id}
                  user={user}
                  onSendRequest={() => handleSendRequest(user.id)}
                  onAcceptRequest={() => handleAcceptRequest(user.id)}
                  onDeclineRequest={() => handleDeclineRequest(user.id)}
              />
          ))}
        </View>
    );
  };

  const renderRequests = () => {
    const items = pendingRequests;
    if (isLoading) return <SkeletonList count={4} />;
    if (items.length === 0) {
      return (
          <EmptyState
              icon="mail-open"
              message={translate('emergencyContacts:empty.requestsMessage')}
              description={translate('emergencyContacts:empty.requestsDescription')}
          />
      );
    }

    return (
        <View style={themed($list)}>
          {items.map((request) => (
              <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={() => handleAcceptRequest(request.id)}
                  onDecline={() => handleDeclineRequest(request.id)}
              />
          ))}
        </View>
    );
  };

  return (
      <Screen preset="scroll" contentContainerStyle={themed($screenContent)}>
        <View style={themed($header)}>
          <Text preset="heading" weight="bold" tx="emergencyContacts:title" />
          <Text preset="formHelper" tx="emergencyContacts:subtitle" />
        </View>

        <View style={themed($searchContainer)}>
          <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={clearSearch}
          />
        </View>

        <TabBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            contactsCount={contacts.length}
            requestsCount={pendingRequests.length}
        />

        {activeTab === 'contacts' && renderContacts()}
        {activeTab === 'discover' && renderDiscover()}
        {activeTab === 'requests' && renderRequests()}
      </Screen>
  );
}

const $screenContent: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.md,
});

const $header: ThemedStyle<ViewStyle> = (theme) => ({
  gap: theme.spacing.xs,
});

const $searchContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.xs,
  marginBottom: theme.spacing.xs,
});

const $list: ThemedStyle<ViewStyle> = (theme) => ({
  gap: theme.spacing.xs,
  paddingTop: theme.spacing.xs,
});