const en = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    noData: 'No data available',
    loading: 'Loading...',
    lastSeen: 'Last seen',
    save: 'Save',
    error: 'Error'
  },

  home: {
    title: 'Home',
    greeting: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    status: {
      allNormal: 'All systems normal',
      lastUpdated: 'Last updated just now',
    },
    quickActions: {
      title: 'Quick Actions',
      emergency: {
        title: 'Emergency Contacts',
        subtitle: 'Quickly reach your trusted contacts.',
      },
      shareLocation: {
        title: 'Share Location',
        subtitle: 'Share your current location instantly.',
      },
    },
    features: {
      title: 'Features',
      emergencyMap: {
        title: 'Emergency Map',
        subtitle: 'View nearby incidents and safe zones.',
      },
      emergencyContacts: {
        title: 'Emergency Contacts',
        subtitle: 'Quickly reach your trusted contacts.',
      },
      safetyAlerts: {
        title: 'Safety Alerts',
        subtitle: 'Receive important safety notifications.',
      },
      profile: {
        title: 'Profile',
        subtitle: 'View and edit your personal details.',
      }
    },
    info: {
      title: 'Did you know?',
      tip: 'You can quickly access features from the Home screen.',
    },
  },

  map: {
    title: 'Map',
  },

  actions: {
    safetyAlerts: {
      title: 'Safety Alerts',
      subtitle: 'Receive and manage alerts in your area.',
    },
    profile: {
      title: 'Profile',
      subtitle: 'View and edit your personal information.',
    },
    shareLocation: {
      title: 'Share Location',
      subtitle: 'Share your location with trusted contacts.',
    },
    settings: {
      title: 'Settings'
    }
  },

  profile: {
    title: 'Profile',
    subtitle: 'Manage your personal information',
    sections: {
      basicInfo: 'Basic Information',
      medicalInfo: 'Medical Information',
      personalInfo: 'Personal Information',
    },
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      address: 'Address',
      bloodType: 'Blood Type',
      allergies: 'Allergies',
      medications: 'Current Medications',
      preExistingConditions: 'Pre-existing Conditions',
      vaccinationStatus: 'Vaccination Status',
      emergencyContact: 'Emergency Contact',
      jobTitle: 'Job Title',
      company: 'Company',
      department: 'Department',
    },
    placeholders: {
      firstName: 'Enter your first name',
      lastName: 'Enter your last name',
      phone: 'Enter your phone number',
      dateOfBirth: 'Select your date of birth',
      address: 'Enter your address',
      bloodType: 'Select your blood type',
      allergies: 'List any allergies',
      medications: 'List current medications',
      preExistingConditions: 'List any pre-existing conditions',
      vaccinationStatus: 'Enter vaccination status',
      emergencyContact: 'Enter emergency contact',
      jobTitle: 'Enter your job title',
      company: 'Enter your company',
      department: 'Enter your department',
      enterValue: 'Enter value',
    },
    actions: {
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      update: 'Update Profile',
    },
    messages: {
      loading: 'Loading profile...',
      updateSuccess: 'Profile updated successfully',
      updateError: 'Failed to update profile',
      noData: 'No information available',
      metadataUpdated: 'Profile information updated',
      bloodTypeUpdated: 'Blood type updated',
      jobUpdated: 'Job information updated',
      allergiesUpdated: 'Allergies updated',
      conditionsUpdated: 'Pre-existing conditions updated',
      medicationUpdated: 'Medication information updated',
      vaccinationUpdated: 'Vaccination status updated',
    }
  },

  welcome: {
    title: 'Welcome',
    subtitle: 'Your companion for safety, alerts, and rapid response.',
    features: {
      evacuation: {
        title: 'Evacuation Routes',
        description: 'Find safe and efficient evacuation paths.',
      },
      status: {
        title: 'Area Status',
        description: 'Get real-time updates on safety conditions.',
      },
      alerts: {
        title: 'Emergency Alerts',
        description: 'Stay informed with timely notifications.',
      },
    },
    cta: {
      footer: 'Continue to explore features and get started.',
      signingIn: 'Signing in...',
      signIn: 'Sign in',
    },
  },

  emergencyContacts: {
    title: 'Emergency Contacts',
    subtitle: 'Manage trusted contacts and requests.',
    search: {
      placeholder: 'Search contacts or users…',
    },
    tabs: {
      contacts: 'Contacts',
      discover: 'Discover',
      requests: 'Requests',
    },
    empty: {
      contactsMessage: 'No emergency contacts yet',
      contactsDescription: 'Add trusted contacts to quickly reach them in emergencies.',
      discoverMessage: 'No users found',
      discoverDescription: 'Try adjusting your search or check back later.',
      requestsMessage: 'No pending requests',
      requestsDescription: 'Incoming contact requests will appear here.',
    },
    actions: {
      remove: 'Remove',
      sendRequest: 'Send request',
      accept: 'Accept',
      decline: 'Decline',
    },
    status: {
      sent: 'Request sent',
      friends: 'Friends',
      online: 'Online',
      offline: 'Offline',
    },
    labels: {
      newRequest: 'New request',
    },
    mutualFriends: 'Mutual friends: {{count}}',
    toasts: {
      friendRequestSent: 'Friend request sent',
      friendRequestSentError: 'Failed to send friend request',
      friendRequestAccepted: 'Friend request accepted',
      friendRequestAcceptError: 'Failed to accept friend request',
      friendRequestDeclined: 'Friend request declined',
      friendRequestDeclineError: 'Failed to decline friend request',
      contactRemoved: 'Contact removed',
      contactRemoveError: 'Failed to remove contact',
    },
  },

  errorFallback: {
    title: 'Oops, something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    technicalDetails: 'Technical details',
    tryAgain: 'Try again',
    reportIssue: 'Report issue',
    footer: 'If the problem persists, contact support.',
  },

  toast: {
    authSuccess: 'Signed in successfully',
    logoutSuccess: 'Signed out successfully',
    badRequest: 'Bad request',
    forbidden: 'Access forbidden',
    notFound: 'Resource not found',
    requestTimeout: 'Request timed out',
    serverError: 'Server error',
    networkError: 'Network error',
    sessionExpired: 'Session expired. Please sign in again.',
    tokenRefreshFailed: 'Session refresh failed. Please sign in again.',
  },
}

export default en;
export type Translations = typeof en;
