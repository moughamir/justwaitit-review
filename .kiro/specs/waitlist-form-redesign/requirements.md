# Requirements Document: Waitlist Form Redesign

## Introduction

This document specifies the requirements for the waitlist form system, covering both the current single-step implementation and planned multi-step enhancements. The system shall provide robust form validation, user-friendly error handling, responsive design, and seamless integration with the backend. The current implementation focuses on a comprehensive single-step form experience, with progressive disclosure through multi-step flow planned for future enhancement. The system aims to maximize conversion rates while maintaining excellent user experience across all device types and interaction patterns.

## Glossary

- **Form_Manager**: The system component responsible for managing form state, validation, and user interactions (currently single-step, with multi-step planned)
- **Validator**: The system component responsible for validating form field inputs according to defined rules
- **Step_Navigator**: The system component responsible for handling transitions between form steps (planned for multi-step implementation)
- **Progress_Indicator**: The UI component that displays current step position and completion status (planned for multi-step implementation)
- **Form_Submitter**: The system component responsible for submitting complete form data to the backend
- **Animation_Controller**: The system component responsible for managing step transition animations (planned for multi-step implementation)
- **Field**: An individual input element within the form (text, email, or select type)
- **Step**: A logical grouping of related form fields presented together (currently all fields in one step)
- **Form_Data**: The complete collection of user-entered values across all form fields
- **Validation_Result**: An object containing validation status and error messages for form fields
- **Form_State**: The current state of the form including field values, errors, loading status, and submission state
- **Source_Parameter**: A tracking parameter that identifies where the form submission originated from
- **Form_Variant**: Configuration option that determines which fields are displayed ("simple" or "full")
- **Success_State**: The UI state displayed after successful form submission with confirmation message
- **Loading_State**: The UI state during form submission with disabled inputs and loading indicators

## Requirements

### Requirement 1: Multi-Step Form Navigation

**User Story:** As a user, I want to progress through the form one step at a time, so that I can focus on related information without feeling overwhelmed.

#### Acceptance Criteria

1. WHEN the form initializes, THE Form_Manager SHALL display step 1 of the configured steps
2. WHEN a user clicks the next button, THE Form_Manager SHALL validate the current step before allowing progression
3. WHEN the current step is valid, THE Form_Manager SHALL advance to the next step
4. WHEN a user clicks the previous button, THE Form_Manager SHALL navigate to the previous step without validation
5. WHEN navigating between steps, THE Form_Manager SHALL preserve all previously entered form data
6. THE Form_Manager SHALL maintain the current step index within the valid range of 1 to total steps

**Note:** Current implementation uses single-step form. Multi-step functionality is planned for future enhancement.

### Requirement 1A: Single-Step Form Implementation (Current State)

**User Story:** As a user, I want to complete the waitlist form in a single view, so that I can quickly provide all necessary information.

#### Acceptance Criteria

1. THE Form_Manager SHALL display all form fields in a single view without step navigation
2. WHEN the form loads, THE Form_Manager SHALL present all fields in a logical, grouped layout
3. THE Form_Manager SHALL validate all fields before allowing form submission
4. THE Form_Manager SHALL maintain consistent styling and behavior across all fields in the single view
5. THE Form_Manager SHALL support both full and simple variants within the single-step approach

### Requirement 2: Form Field Validation

**User Story:** As a user, I want immediate feedback on my input, so that I can correct errors before submitting the form.

#### Acceptance Criteria

1. WHEN a required field is empty, THE Validator SHALL return an error indicating the field is required
2. WHEN an email field contains an invalid email format, THE Validator SHALL return an error indicating invalid email format
3. WHEN a text field contains fewer than 2 characters, THE Validator SHALL return an error indicating the input is too short
4. WHEN all required fields in a step contain valid values, THE Validator SHALL return a validation result with isValid true
5. WHEN validation fails, THE Validator SHALL return descriptive error messages for each invalid field
6. THE Validator SHALL not mutate the input form data during validation

### Requirement 3: Step Progression Control

**User Story:** As a user, I want to be prevented from skipping required information, so that I complete the form correctly.

#### Acceptance Criteria

1. WHEN the current step has validation errors, THE Step_Navigator SHALL prevent advancement to the next step
2. WHEN the current step is valid, THE Step_Navigator SHALL enable the next button
3. WHEN on the first step, THE Step_Navigator SHALL disable the previous button
4. WHEN on the last step, THE Step_Navigator SHALL display a submit button instead of a next button
5. WHILE an animation is in progress, THE Step_Navigator SHALL disable all navigation controls

### Requirement 4: Data Persistence Across Steps

**User Story:** As a user, I want my entered information to be remembered when I navigate between steps, so that I don't have to re-enter data.

#### Acceptance Criteria

1. WHEN a user enters data in a field and navigates to another step, THE Form_Manager SHALL preserve the entered value
2. WHEN a user navigates back to a previous step, THE Form_Manager SHALL display all previously entered values
3. WHEN a user navigates forward to a step they previously visited, THE Form_Manager SHALL display all previously entered values
4. FOR ALL form fields, THE Form_Manager SHALL maintain data consistency across all step transitions

### Requirement 5: Progress Indication

**User Story:** As a user, I want to see my progress through the form, so that I know how many steps remain.

#### Acceptance Criteria

1. THE Progress_Indicator SHALL display the current step number and total number of steps
2. WHEN the current step changes, THE Progress_Indicator SHALL update to reflect the new current step
3. WHEN displaying step status, THE Progress_Indicator SHALL visually distinguish between completed, current, and upcoming steps
4. WHEN a step is completed, THE Progress_Indicator SHALL mark that step with a completed visual state
5. WHEN transitioning between steps, THE Progress_Indicator SHALL animate the state change smoothly

### Requirement 6: Form Submission

**User Story:** As a user, I want to submit my completed form, so that I can join the waitlist.

#### Acceptance Criteria

1. WHEN a user completes required fields and clicks submit, THE Form_Submitter SHALL validate all form data
2. WHEN all form data is valid, THE Form_Submitter SHALL submit the data to the backend server action
3. WHEN the backend returns success, THE Form_Submitter SHALL display a success state to the user
4. WHEN the backend returns an error, THE Form_Submitter SHALL display the error message to the user
5. WHILE submission is in progress, THE Form_Submitter SHALL disable the submit button and show loading state
6. WHEN submission fails, THE Form_Submitter SHALL preserve all form data for retry

### Requirement 6A: Current Submission Implementation

**User Story:** As a user, I want immediate feedback during and after form submission, so that I understand what's happening.

#### Acceptance Criteria

1. WHEN form submission starts, THE Form_Manager SHALL change submit button text to "Securing your spot..." or "Joining..."
2. WHEN form submission is successful, THE Form_Manager SHALL replace the entire form with a success message and checkmark icon
3. WHEN form submission is successful, THE Form_Manager SHALL reset the form fields for potential future use
4. WHEN form submission fails, THE Form_Manager SHALL display error message below the submit button
5. THE Form_Manager SHALL use React transitions to handle form submission state changes

### Requirement 7: Step Transition Animations

**User Story:** As a user, I want smooth transitions between steps, so that the form feels polished and professional.

#### Acceptance Criteria

1. WHEN navigating forward, THE Animation_Controller SHALL animate the current step exiting to the left and the next step entering from the right
2. WHEN navigating backward, THE Animation_Controller SHALL animate the current step exiting to the right and the previous step entering from the left
3. WHEN an animation starts, THE Animation_Controller SHALL set the animation duration to 400 milliseconds
4. WHEN an animation is in progress, THE Animation_Controller SHALL prevent user interaction with form controls
5. WHEN an animation completes, THE Animation_Controller SHALL re-enable user interaction with form controls

### Requirement 8: Error Display

**User Story:** As a user, I want to see clear error messages when I make mistakes, so that I know how to fix them.

#### Acceptance Criteria

1. WHEN a field has a validation error, THE Form_Manager SHALL display the error message below the field
2. WHEN a user modifies a field with an error, THE Form_Manager SHALL clear the error message for that field
3. WHEN a field is blurred with invalid content, THE Form_Manager SHALL display the validation error
4. WHEN a server error occurs, THE Form_Manager SHALL display the error message at the form level
5. WHEN displaying errors, THE Form_Manager SHALL only show errors for fields the user has interacted with

### Requirement 9: Form Variant Support

**User Story:** As a developer, I want to configure different form variants, so that I can use the form in different contexts with appropriate complexity.

#### Acceptance Criteria

1. WHEN the variant is "full", THE Form_Manager SHALL display all configured fields in their designated layout
2. WHEN the variant is "simple", THE Form_Manager SHALL display only the email field with inline submit button
3. WHEN the variant is "simple", THE Form_Manager SHALL populate hidden fields with default values
4. THE Form_Manager SHALL accept a source parameter to track form submission origin
5. THE Form_Manager SHALL accept a className parameter for custom styling

### Requirement 9A: Current Form Field Layout

**User Story:** As a user, I want form fields organized logically, so that I can efficiently complete the form.

#### Acceptance Criteria

1. WHEN using full variant, THE Form_Manager SHALL display name and email fields in a two-column grid on desktop
2. WHEN using full variant, THE Form_Manager SHALL display the role selection field as a full-width dropdown
3. WHEN using full variant, THE Form_Manager SHALL display company and revenue fields in a two-column grid
4. WHEN using full variant, THE Form_Manager SHALL display aesthetic preference as a full-width dropdown
5. THE Form_Manager SHALL stack all fields vertically on mobile devices for optimal touch interaction

### Requirement 10: Field Type Handling

**User Story:** As a user, I want appropriate input controls for different types of information, so that I can enter data efficiently.

#### Acceptance Criteria

1. WHEN a field type is "text", THE Form_Manager SHALL render a text input element
2. WHEN a field type is "email", THE Form_Manager SHALL render an email input element with email validation
3. WHEN a field type is "select", THE Form_Manager SHALL render a dropdown with the configured options
4. WHEN a field is required, THE Form_Manager SHALL display a visual indicator on the field label
5. WHEN a field has a placeholder, THE Form_Manager SHALL display the placeholder text in the input

### Requirement 10A: Specific Field Configurations

**User Story:** As a user, I want appropriate options for each field type, so that I can select values that match my situation.

#### Acceptance Criteria

1. WHEN displaying the role field, THE Form_Manager SHALL provide options: "Fashion Brand / Retailer", "Stylist / Creative", "E-Commerce Seller", "Other"
2. WHEN displaying the revenue_range field, THE Form_Manager SHALL provide options: "0 - 10k DH", "10k - 50k DH", "50k - 250k DH", "250k DH+"
3. WHEN displaying the aesthetic field, THE Form_Manager SHALL provide options: "Modern Minimalist", "Traditional Moroccan", "Luxury Editorial", "Streetwear", "Avant-Garde"
4. THE Form_Manager SHALL display appropriate placeholder text for each field type
5. THE Form_Manager SHALL mark required fields (name, email, role) with proper visual indicators

### Requirement 11: Form State Management

**User Story:** As a developer, I want centralized form state management, so that the form behavior is predictable and maintainable.

#### Acceptance Criteria

1. THE Form_Manager SHALL maintain the current step index
2. THE Form_Manager SHALL maintain the total number of steps
3. THE Form_Manager SHALL maintain a record of all form field values
4. THE Form_Manager SHALL maintain a record of validation errors for each field
5. THE Form_Manager SHALL maintain a record of which fields have been touched by the user
6. THE Form_Manager SHALL maintain the form submission status (idle, submitting, success, error)

### Requirement 12: Email Sanitization

**User Story:** As a system administrator, I want email addresses to be normalized, so that duplicate detection works correctly.

#### Acceptance Criteria

1. WHEN an email is submitted, THE Form_Submitter SHALL convert the email to lowercase
2. WHEN an email is submitted, THE Form_Submitter SHALL trim whitespace from the beginning and end
3. WHEN processing email input, THE Form_Submitter SHALL preserve the sanitized format in form data

### Requirement 13: Accessibility Support

**User Story:** As a user with accessibility needs, I want the form to be keyboard navigable and screen reader friendly, so that I can complete it independently.

#### Acceptance Criteria

1. WHEN a user presses Tab, THE Form_Manager SHALL move focus to the next interactive element in logical order
2. WHEN a user presses Enter on a field in a non-final step, THE Form_Manager SHALL trigger the next button action
3. WHEN a user presses Enter on a field in the final step, THE Form_Manager SHALL trigger the submit button action
4. THE Form_Manager SHALL associate error messages with their corresponding fields for screen readers
5. THE Progress_Indicator SHALL provide aria labels indicating current step and total steps

### Requirement 14: Performance Optimization

**User Story:** As a user, I want the form to respond quickly to my interactions, so that the experience feels smooth and responsive.

#### Acceptance Criteria

1. WHEN a user types in a field, THE Form_Manager SHALL debounce validation by 300 milliseconds
2. WHEN rendering step components, THE Form_Manager SHALL memoize step configurations to prevent unnecessary re-renders
3. WHEN animating transitions, THE Animation_Controller SHALL use only transform and opacity properties for optimal performance
4. WHEN loading the form, THE Form_Manager SHALL preload the next step content during current step interaction

### Requirement 15: Server Error Handling

**User Story:** As a user, I want helpful error messages when something goes wrong, so that I know what to do next.

#### Acceptance Criteria

1. WHEN the server returns a duplicate email error, THE Form_Manager SHALL display "This email is already on the waitlist!"
2. WHEN the server returns a generic error, THE Form_Manager SHALL display "Something went wrong. Please try again."
3. WHEN a network error occurs, THE Form_Submitter SHALL implement retry with exponential backoff
4. WHEN displaying server errors, THE Form_Manager SHALL maintain all form data for user correction
5. WHEN a user modifies the form after a server error, THE Form_Manager SHALL clear the server error message

### Requirement 16: Form Reset and State Management

**User Story:** As a user, I want the form to reset after successful submission, so that I can submit another entry if needed.

#### Acceptance Criteria

1. WHEN form submission is successful, THE Form_Manager SHALL reset all form fields to their initial empty state
2. WHEN form submission is successful, THE Form_Manager SHALL clear all validation errors
3. WHEN form submission is successful, THE Form_Manager SHALL reset the touched field tracking
4. THE Form_Manager SHALL maintain form state consistency throughout the component lifecycle
5. WHEN the component unmounts, THE Form_Manager SHALL properly clean up any pending operations

### Requirement 17: Loading State Management

**User Story:** As a user, I want clear feedback when the form is processing, so that I know my submission is being handled.

#### Acceptance Criteria

1. WHEN form submission begins, THE Form_Manager SHALL disable all form inputs to prevent modification
2. WHEN form submission begins, THE Form_Manager SHALL update the submit button text to indicate processing
3. WHEN form submission begins, THE Form_Manager SHALL disable the submit button to prevent duplicate submissions
4. WHILE form submission is in progress, THE Form_Manager SHALL maintain the loading state consistently
5. WHEN form submission completes (success or error), THE Form_Manager SHALL re-enable form interactions

### Requirement 18: Form Field Interaction Feedback

**User Story:** As a user, I want visual feedback when I interact with form fields, so that I understand the system is responding to my input.

#### Acceptance Criteria

1. WHEN a form field receives focus, THE Form_Manager SHALL apply focus styling with brand colors
2. WHEN a form field loses focus, THE Form_Manager SHALL remove focus styling smoothly
3. WHEN a user types in a field, THE Form_Manager SHALL provide immediate visual feedback
4. WHEN a field has an error, THE Form_Manager SHALL apply error styling to the field border
5. WHEN a field error is cleared, THE Form_Manager SHALL remove error styling with smooth transition

### Requirement 19: Form Variant Configuration

**User Story:** As a developer, I want flexible form configuration, so that I can use the form component in different contexts with appropriate field sets.

#### Acceptance Criteria

1. WHEN variant is "full", THE Form_Manager SHALL render all configured fields in their designated layout
2. WHEN variant is "simple", THE Form_Manager SHALL render only the email field with hidden defaults
3. WHEN using simple variant, THE Form_Manager SHALL automatically populate full_name with "Early Access User"
4. WHEN using simple variant, THE Form_Manager SHALL automatically populate role with "Other"
5. THE Form_Manager SHALL accept and pass through the source parameter for analytics tracking

### Requirement 20: Success State Display

**User Story:** As a user, I want clear confirmation when my submission is successful, so that I know I've been added to the waitlist.

#### Acceptance Criteria

1. WHEN form submission succeeds, THE Form_Manager SHALL display a success animation with checkmark icon
2. WHEN displaying success state, THE Form_Manager SHALL show a congratulatory message
3. WHEN displaying success state, THE Form_Manager SHALL include the server response message
4. WHEN in success state, THE Form_Manager SHALL hide the form fields and show only the success content
5. THE Form_Manager SHALL animate the transition from form to success state smoothly

### Requirement 21: Input Field Styling and Branding

**User Story:** As a user, I want the form to match the site's visual design, so that it feels integrated and professional.

#### Acceptance Criteria

1. THE Form_Manager SHALL apply glass morphism styling to form containers with backdrop blur
2. THE Form_Manager SHALL use brand colors (aq-blue) for focus states and primary actions
3. THE Form_Manager SHALL apply consistent border radius (rounded-xl) to all form elements
4. THE Form_Manager SHALL use appropriate typography hierarchy with proper font weights
5. THE Form_Manager SHALL maintain visual consistency with the overall site design system

### Requirement 21A: Current Styling Implementation

**User Story:** As a user, I want consistent and attractive form styling, so that the form feels polished and trustworthy.

#### Acceptance Criteria

1. THE Form_Manager SHALL apply h-12 height to input fields and h-14 height to buttons for consistent sizing
2. THE Form_Manager SHALL use bg-background/40 with border-white/10 for input field backgrounds
3. THE Form_Manager SHALL apply focus:border-aq-blue/50 styling when fields receive focus
4. THE Form_Manager SHALL use uppercase, tracking-widest, text-xs styling for field labels
5. THE Form_Manager SHALL apply shadow-lg shadow-aq-blue/20 to the primary submit button

### Requirement 22: Form Layout Responsiveness

**User Story:** As a user on different devices, I want the form to work well on my screen size, so that I can complete it regardless of device.

#### Acceptance Criteria

1. WHEN viewed on mobile devices, THE Form_Manager SHALL stack form fields vertically for optimal touch interaction
2. WHEN viewed on desktop, THE Form_Manager SHALL arrange fields in a grid layout where appropriate
3. WHEN screen size changes, THE Form_Manager SHALL adapt the layout smoothly without breaking
4. THE Form_Manager SHALL ensure all interactive elements meet minimum touch target sizes on mobile
5. THE Form_Manager SHALL maintain proper spacing and alignment across all screen sizes

### Requirement 23: Form Submission Analytics

**User Story:** As a product manager, I want to track form submission sources, so that I can understand which channels are most effective.

#### Acceptance Criteria

1. THE Form_Manager SHALL include the source parameter in all form submissions
2. THE Form_Manager SHALL validate that source parameter is provided and non-empty
3. WHEN source is not provided, THE Form_Manager SHALL use "unknown" as the default value
4. THE Form_Manager SHALL pass source data to the server action without modification
5. THE Form_Manager SHALL ensure source tracking works for both full and simple variants

### Requirement 24: Form Security and Validation

**User Story:** As a system administrator, I want robust input validation, so that only valid data enters our system.

#### Acceptance Criteria

1. THE Form_Manager SHALL sanitize all text inputs by trimming whitespace
2. THE Form_Manager SHALL validate email format using standard email regex patterns
3. THE Form_Manager SHALL prevent submission of forms with invalid required fields
4. THE Form_Manager SHALL escape any special characters in user input before display
5. THE Form_Manager SHALL work with server-side validation to ensure data integrity

### Requirement 25: Error Recovery and User Guidance

**User Story:** As a user who encounters an error, I want clear guidance on how to fix it, so that I can successfully complete the form.

#### Acceptance Criteria

1. WHEN a validation error occurs, THE Form_Manager SHALL display the error message immediately below the relevant field
2. WHEN multiple errors exist, THE Form_Manager SHALL display all relevant error messages simultaneously
3. WHEN an error is displayed, THE Form_Manager SHALL focus the user's attention on the first invalid field
4. THE Form_Manager SHALL provide specific, actionable error messages rather than generic ones
5. WHEN a user corrects an error, THE Form_Manager SHALL immediately remove the error message for that field

### Requirement 26: Component Integration and Context

**User Story:** As a developer, I want the form to integrate seamlessly with the existing page layout, so that it feels like a natural part of the user experience.

#### Acceptance Criteria

1. THE Form_Manager SHALL integrate with the WaitlistSection component without layout conflicts
2. THE Form_Manager SHALL work within the existing glass-strong container styling
3. THE Form_Manager SHALL maintain proper z-index layering with the noise-overlay background
4. THE Form_Manager SHALL respect the existing responsive grid layout (lg:col-span-3)
5. THE Form_Manager SHALL work alongside the incentives content without visual interference

### Requirement 27: Form Accessibility and Usability

**User Story:** As a user with accessibility needs, I want the form to be fully accessible, so that I can complete it using assistive technologies.

#### Acceptance Criteria

1. THE Form_Manager SHALL provide proper label associations for all form fields using htmlFor attributes
2. THE Form_Manager SHALL ensure all interactive elements are keyboard accessible
3. THE Form_Manager SHALL provide appropriate ARIA labels for screen readers
4. THE Form_Manager SHALL maintain proper focus management throughout form interactions
5. THE Form_Manager SHALL ensure sufficient color contrast for all text and interactive elements
