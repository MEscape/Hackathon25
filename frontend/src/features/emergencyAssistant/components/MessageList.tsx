import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import type { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { LoadingIndicator } from './LoadingIndicator';
import { styles } from '../styles/styles';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
                                                          messages,
                                                          isLoading
                                                        }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    // Only auto-scroll to bottom for the first message or when user hasn't manually scrolled
    if (shouldAutoScroll && messages.length <= 1) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
    // Return undefined for the else case to satisfy TypeScript
    return undefined;
  }, [messages, shouldAutoScroll]);

  const handleScrollBeginDrag = () => {
    setIsUserScrolling(true);
    setShouldAutoScroll(false);
  };

  const handleScrollEndDrag = () => {
    setIsUserScrolling(false);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.messagesContainer}
      contentContainerStyle={styles.messagesContent}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      showsVerticalScrollIndicator={true}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
    </ScrollView>
  );
};