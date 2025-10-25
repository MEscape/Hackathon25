package com.hackathon25.safenet.domain.exception.friend;

import lombok.Getter;

/**
 * Base exception class for friendship-related operations.
 * 
 * <p>This exception serves as the parent class for all friendship-specific
 * exceptions in the SafeNet application. It provides a consistent error
 * handling mechanism for friendship operations.</p>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Getter
public class FriendshipException extends RuntimeException {

    private final String errorCode;
    private final Object[] messageArgs;
    
    /**
     * Constructs a new friendship exception with the specified detail message.
     * 
     * @param message the detail message
     */
    public FriendshipException(String message) {
        super(message);
        this.errorCode = "FRIENDSHIP_ERROR";
        this.messageArgs = new Object[0];
    }
    
    /**
     * Constructs a new friendship exception with error code and message arguments.
     * 
     * @param errorCode the error code for i18n lookup
     * @param messageArgs arguments for message formatting
     */
    public FriendshipException(String errorCode, Object... messageArgs) {
        super(errorCode);
        this.errorCode = errorCode;
        this.messageArgs = messageArgs;
    }
}