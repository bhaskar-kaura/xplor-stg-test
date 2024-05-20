// Define an enumeration for different types of actions that can be performed
export enum Action {
  search = 'search', // Trigger a search operation
  on_search = 'on_search', // Handle the result of a search operation
  select = 'select', // Trigger a select operation
  on_select = 'on_select', // Handle the result of a select operation
  init = 'init', // Initialize a process or component
  on_init = 'on_init', // Handle the initialization of a process or component
  confirm = 'confirm', // Confirm an action or process
  on_confirm = 'on_confirm', // Handle the confirmation of an action or process
  status = 'status', // Check the status of a process or component
  on_status = 'on_status', // Handle the status update of a process or component
}

// Define constants for response codes
export const NACK = 'NACK'; // Negative acknowledgment, indicating an error or failure
export const ACK = 'ACK'; // Positive acknowledgment, indicating success
export const CONTEXT_ERROR = 'CONTEXT_ERROR'; // Error code for context-related errors
export const ERROR_CODE_CONTEXT = '625519'; // Specific error code for context errors
