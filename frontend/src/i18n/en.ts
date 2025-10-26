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
      emergencyTips: {
        title: 'Emergency Tips',
        subtitle: 'Safety advice'
      }
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
      sections: {
        police: 'Police Alerts',
        weather: 'Weather Alerts',
      },
      search: {
        titleLabel: 'Search by title',
        titlePlaceholder: 'Type a title…',
        locationLabel: 'Filter by location',
        locationPlaceholder: 'Type a region or place…',
      },
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

  emergencyAssistant: {
    title: 'Emergency Assistant',
    subtitle: 'Ask questions about emergency situations',
    placeholder: 'What should I do during an earthquake?',
    searchButton: 'Search',
    searching: 'Searching...',
    noResults: 'No matching emergency tips found.',
    tryDifferentQuery: 'Try a different question.',
    offlineMode: 'Offline Mode',
    onlineMode: 'Online Mode',
    lastUpdated: 'Last updated',
    updateAvailable: 'Update available',
    refresh: 'Refresh',
    loading: 'Loading...',
    error: 'Error loading emergency tips',
    retry: 'Try again',
    aiInitializing: 'Initializing AI model...',
    aiError: 'AI service unavailable',
    fallbackSearch: 'Using simple text search',
    relevanceScore: 'Relevance',
    category: 'Category',
    exampleQuestions: {
      title: 'Example questions:',
      earthquake: 'What to do during an earthquake?',
      fire: 'How to behave during a fire?',
      flood: 'What to do during a flood?',
      storm: 'How to prepare for a storm?',
      firstAid: 'First aid basics?',
      evacuation: 'How does evacuation work?',
      powerOutage: 'What to do during a power outage?',
    },
    tips: {
      noImage: 'No image available',
      readMore: 'Read more',
      readLess: 'Show less',
    },
    modelLoading: 'AI model loading',
    modelReady: 'Welcome to the Emergency Assistant!\n Please type your emergency question, describe your situation, or enter one word like "flood" or "storm" to get quick, helpful tips.',
    systemReady: 'Welcome to the Emergency Assistant!\n Please type your emergency question, describe your situation, or enter one word like "flood" or "storm" to get quick, helpful tips.',
    generating: 'Generating response...',
    inputPlaceholder: 'Ask about emergency tips...',
    responses: {
      emergency: '🚨 EMERGENCY: If you are in an acute emergency, call 112 immediately!',
      firstAid: 'Here is important first aid information:',
      fire: 'Important fire safety information:',
      weather: 'Weather emergency guidelines:',
      general: 'Based on your query, I found the following information:',
      moreInfo: 'For more information or in acute emergencies, call 112.',
      noResults: 'Unfortunately, I could not find specific information for your query.',
      emergencyNumbers: '**General Emergency Numbers:**\n🚨 Fire/Rescue: 112\n🚔 Police: 110\n☠️ Poison Control: 030 19240',
      reformulate: 'Please rephrase your question or use terms like "first aid", "fire", "weather emergency" or "accident".',
      fallback112: 'If in doubt or in acute emergencies, call 112 immediately.',
      fallbackPolice: 'For crimes or urgent safety issues, call the police at 110.',
      fallbackPoison: 'In suspected poisoning, contact poison control immediately: 030 19240.',
      fallbackGeneral: 'If you cannot find information, rephrase your question or call 112.',
      call112: {
        title: '🚨 **Emergency Call 112**',
        description: '112 is the European emergency number for fire department and rescue services. It is free and available 24/7.',
        whatToSay: '**What to say on the phone:**\n- Where did something happen?\n- What happened?\n- How many people are affected?\n- What kind of injuries?\n- Wait for follow-up questions!',
      },
      police: {
        title: '🚔 **Police Emergency 110**',
        description: 'Call 110 for:\n- Crimes\n- Traffic accidents with injuries\n- When you need help\n\nFor general inquiries, use your local police station.',
      },
      poison: {
        title: '☠️ **Poison Control**',
        description: 'In case of poisoning:\n- Contact poison control immediately\n- Stay calm\n- Keep vomit\n- If unconscious: 112',
        numbers: '**Poison Control Centers:**\nBerlin: 030 19240\nBonn: 0228 19240',
      },
    },
    noData: 'No data',
  },
}

export default en;
export type Translations = typeof en;
