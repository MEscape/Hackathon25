package com.hackathon25.safenet.infrastructure.adapter.web.exception;

import com.hackathon25.safenet.domain.exception.friend.*;
import com.hackathon25.safenet.domain.exception.user.UserNotFoundException;
import jakarta.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

/**
 * Global exception handler for the SafeNet application.
 *
 * <p>This class provides centralized exception handling across the entire application, ensuring
 * consistent error responses, proper logging, and security-conscious error messaging. It implements
 * the Cross-Cutting Concerns pattern to handle exceptions that may occur in any layer of the
 * hexagonal architecture.
 *
 * <h3>Key Features</h3>
 *
 * <ul>
 *   <li><strong>Consistent Error Format:</strong> All errors follow the same {@link ErrorResponse}
 *       structure
 *   <li><strong>Security-Aware:</strong> Sensitive information is never exposed in error messages
 *   <li><strong>Comprehensive Logging:</strong> All exceptions are logged with appropriate levels
 *   <li><strong>HTTP Status Mapping:</strong> Proper HTTP status codes for different exception
 *       types
 *   <li><strong>Validation Support:</strong> Detailed field-level validation error reporting
 * </ul>
 *
 * <h3>Exception Categories Handled</h3>
 *
 * <ul>
 *   <li><strong>Validation Errors:</strong> {@code @Valid} annotation failures and constraint
 *       violations
 *   <li><strong>Authentication Errors:</strong> JWT validation failures and missing credentials
 *   <li><strong>Authorization Errors:</strong> Access denied and insufficient permissions
 *   <li><strong>Cryptographic Errors:</strong> HMAC validation and encryption failures
 *   <li><strong>Not Found Errors:</strong> Missing endpoints and resources
 *   <li><strong>Business Logic Errors:</strong> Domain-specific validation failures
 *   <li><strong>System Errors:</strong> Unexpected exceptions with sanitized messages
 * </ul>
 *
 * <h3>Security Considerations</h3>
 *
 * <ul>
 *   <li>Stack traces are never exposed to clients
 *   <li>Internal system details are logged but not returned
 *   <li>Authentication failures use generic messages to prevent enumeration
 *   <li>Cryptographic errors are logged with full details but return generic messages
 * </ul>
 *
 * <h3>Error Response Format</h3>
 *
 * <p>All error responses follow this consistent structure:
 *
 * <pre>{@code
 * {
 *   "timestamp": "2024-01-15T10:30:00",
 *   "status": 400,
 *   "error": "Validation Failed",
 *   "message": "Request validation failed",
 *   "path": "/api/v1/users",
 *   "details": {
 *     "field": "error message"
 *   }
 * }
 * }</pre>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 * @see ErrorResponse
 * @see RestControllerAdvice
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  /**
   * Handles validation errors from {@code @Valid} annotation on request bodies.
   *
   * <p>This method processes validation failures that occur when Spring Boot's validation framework
   * encounters constraint violations in request DTOs. It extracts field-level errors and formats
   * them into a user-friendly response.
   *
   * <h4>Common Validation Scenarios</h4>
   *
   * <ul>
   *   <li>Required fields missing ({@code @NotNull}, {@code @NotBlank})
   *   <li>Invalid email formats ({@code @Email})
   *   <li>String length violations ({@code @Size})
   *   <li>Pattern mismatches ({@code @Pattern})
   * </ul>
   *
   * @param ex the validation exception containing field errors
   * @param request the web request context
   * @return ResponseEntity with 400 status and detailed field error information
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(
      MethodArgumentNotValidException ex, WebRequest request) {

    Map<String, String> fieldErrors = new HashMap<>();
    ex.getBindingResult()
        .getFieldErrors()
        .forEach(error -> fieldErrors.put(error.getField(), error.getDefaultMessage()));

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("error.validation.failed")
            .message("Request validation failed")
            .path(getPath(request))
            .details(fieldErrors)
            .build();

    log.warn("Validation error: {}", fieldErrors);
    return ResponseEntity.badRequest().body(errorResponse);
  }

  /** Handle constraint violation exceptions */
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolationException(
      ConstraintViolationException ex, WebRequest request) {

    Map<String, String> violations = new HashMap<>();
    ex.getConstraintViolations()
        .forEach(
            violation ->
                violations.put(violation.getPropertyPath().toString(), violation.getMessage()));

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("error.constraint.violation")
            .message("Request constraints violated")
            .path(getPath(request))
            .details(violations)
            .build();

    log.warn("Constraint violation: {}", violations);
    return ResponseEntity.badRequest().body(errorResponse);
  }

  /** Handle authentication exceptions */
  @ExceptionHandler({
    AuthenticationException.class,
    AuthenticationCredentialsNotFoundException.class
  })
  public ResponseEntity<ErrorResponse> handleAuthenticationException(
      Exception ex, WebRequest request) {

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.UNAUTHORIZED.value())
            .error("error.authentication.failed")
            .message("Authentication credentials are missing or invalid")
            .path(getPath(request))
            .build();

    log.warn("Authentication error: {}", ex.getMessage());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
  }

  /** Handle authorization exceptions */
  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ErrorResponse> handleAccessDeniedException(
      AccessDeniedException ex, WebRequest request) {

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.FORBIDDEN.value())
            .error("error.authorization.denied")
            .message("You don't have permission to access this resource")
            .path(getPath(request))
            .build();

    log.warn("Access denied: {}", ex.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
  }

  /** Handle 404 Not Found exceptions */
  @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(
      NoHandlerFoundException ex, WebRequest request) {

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error("error.resource.not_found")
            .message("The requested resource was not found")
            .path(getPath(request))
            .build();

    log.warn("Resource not found: {}", ex.getRequestURL());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
  }

  /** Handle illegal argument exceptions */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
      IllegalArgumentException ex, WebRequest request) {

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("error.invalid.argument")
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    log.warn("Invalid argument: {}", ex.getMessage());
    return ResponseEntity.badRequest().body(errorResponse);
  }

  /**
   * Handle friend request not found exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with NOT_FOUND status
   */
  @ExceptionHandler(FriendRequestNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleFriendRequestNotFound(
      FriendRequestNotFoundException ex, WebRequest request) {
    log.warn("Friend request not found: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  /**
   * Handle duplicate friend request exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with CONFLICT status
   */
  @ExceptionHandler(DuplicateFriendRequestException.class)
  public ResponseEntity<ErrorResponse> handleDuplicateFriendRequest(
      DuplicateFriendRequestException ex, WebRequest request) {
    log.warn("Duplicate friend request: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
  }

  /**
   * Handle invalid friend request operation exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with BAD_REQUEST status
   */
  @ExceptionHandler(InvalidFriendRequestOperationException.class)
  public ResponseEntity<ErrorResponse> handleInvalidFriendRequestOperation(
      InvalidFriendRequestOperationException ex, WebRequest request) {
    log.warn("Invalid friend request operation: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  /**
   * Handle friendship not found exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with NOT_FOUND status
   */
  @ExceptionHandler(FriendshipNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleFriendshipNotFound(
      FriendshipNotFoundException ex, WebRequest request) {
    log.warn("Friendship not found: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  /**
   * Handle general friendship exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with BAD_REQUEST status
   */
  @ExceptionHandler(FriendshipException.class)
  public ResponseEntity<ErrorResponse> handleFriendshipException(
      FriendshipException ex, WebRequest request) {
    log.warn("Friendship exception: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  /**
   * Handle user not found exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with NOT_FOUND status
   */
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleUserNotFound(
      UserNotFoundException ex, WebRequest request) {
    log.warn("User not found: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  /**
   * Handle invalid friend request status exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with BAD_REQUEST status
   */
  @ExceptionHandler(InvalidFriendRequestStatusException.class)
  public ResponseEntity<ErrorResponse> handleInvalidFriendRequestStatus(
      InvalidFriendRequestStatusException ex, WebRequest request) {
    log.warn("Invalid friend request status: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  /**
   * Handle already friends exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with CONFLICT status
   */
  @ExceptionHandler(AlreadyFriendsException.class)
  public ResponseEntity<ErrorResponse> handleAlreadyFriends(
      AlreadyFriendsException ex, WebRequest request) {
    log.warn("Already friends: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
  }

  /**
   * Handle self friend request exceptions.
   *
   * @param ex the exception
   * @param request the web request
   * @return error response with BAD_REQUEST status
   */
  @ExceptionHandler(SelfFriendRequestException.class)
  public ResponseEntity<ErrorResponse> handleSelfFriendRequest(
      SelfFriendRequestException ex, WebRequest request) {
    log.warn("Self friend request: {}", ex.getMessage());

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error(ex.getErrorCode())
            .message(ex.getMessage())
            .path(getPath(request))
            .build();

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  /** Handle database transaction exceptions */
  @ExceptionHandler(TransactionSystemException.class)
  public ResponseEntity<ErrorResponse> handleTransactionSystemException(
      TransactionSystemException ex, WebRequest request) {

    String message = "Database transaction failed";
    String errorCode = "error.transaction.failed";

    // Try to extract more specific error information
    Throwable rootCause = ex.getRootCause();
    if (rootCause instanceof ConstraintViolationException) {
      message = "Data validation constraints violated";
      errorCode = "error.constraint.violation";
    } else if (rootCause != null && rootCause.getMessage() != null) {
      if (rootCause.getMessage().contains("duplicate key")
          || rootCause.getMessage().contains("unique constraint")) {
        message = "Duplicate data detected - record already exists";
        errorCode = "error.duplicate.data";
      }
    }

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error(errorCode)
            .message(message)
            .path(getPath(request))
            .build();

    log.error("Transaction system exception: {}", ex.getMessage(), ex);
    return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
  }

  /** Handle database integrity constraint violations */
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(
      DataIntegrityViolationException ex, WebRequest request) {

    String message = "Data integrity constraint violated";
    String errorCode = "error.data.integrity";

    if (ex.getMessage() != null) {
      if (ex.getMessage().contains("duplicate key")
          || ex.getMessage().contains("unique constraint")) {
        message = "Duplicate data detected - record already exists";
        errorCode = "error.duplicate.data";
      } else if (ex.getMessage().contains("not-null constraint")) {
        message = "Required field is missing";
        errorCode = "error.required.field";
      }
    }

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error(errorCode)
            .message(message)
            .path(getPath(request))
            .build();

    log.error("Data integrity violation: {}", ex.getMessage(), ex);
    return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
  }

  /** Handle all other exceptions */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, WebRequest request) {

    ErrorResponse errorResponse =
        ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .error("error.internal")
            .message("An unexpected error occurred")
            .path(getPath(request))
            .build();

    log.error("Unexpected error: ", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
  }

  /** Extract the request path from WebRequest */
  private String getPath(WebRequest request) {
    return request.getDescription(false).replace("uri=", "");
  }
}
