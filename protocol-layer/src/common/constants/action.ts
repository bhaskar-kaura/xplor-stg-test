// Define an enumeration for different types of actions that can be performed
export enum Action {
  search = 'search', // Action to initiate a search
  on_search = 'on_search', // Action to handle a search request
  init = 'init', // Action to initialize a process or component
  on_init = 'on_init', // Action to handle an initialization request
  confirm = 'confirm', // Action to confirm an operation or request
  on_confirm = 'on_confirm', // Action to handle a confirmation request
  status = 'status', // Action to request the status of a process or component
  on_status = 'on_status', // Action to handle a status request
}

// Define constants for response codes
export const NACK = 'NACK'; // Negative acknowledgment, indicating an error or failure
export const ACK = 'ACK'; // Positive acknowledgment, indicating success
export const CONTEXT_ERROR = 'CONTEXT_ERROR'; // Error code for context-related errors
export const ERROR_CODE_CONTEXT = '625519'; // Specific error code for context errors
