# Implementation Plan: Waitlist Form Redesign

## Overview

Transform the existing single-step waitlist form into a modern, multi-step experience with progressive disclosure, smooth animations, and enhanced user experience. The implementation will maintain all existing functionality while introducing step-by-step navigation, data persistence, and improved visual design. The form will integrate seamlessly with the existing joinWaitlist server action and maintain compatibility with both full and simple variants.

## Tasks

- [x] 1. Create core TypeScript interfaces and types
  - Create `lib/types/waitlist-form.ts` with FormStep, FormField, FormState, and ValidationResult interfaces
  - Define step configurations for full variant (3 steps) and simple variant (1 step)
  - Export types for use across form components
  - _Requirements: 9.1, 9.2, 9.3, 10.1, 10.2, 10.3, 10A.1, 10A.2, 10A.3_

- [ ] 2. Implement form validation utilities
  - [x] 2.1 Create `lib/utils/form-validation.ts` with validation functions
    - Implement validateStep function with email, text, and required field validation
    - Implement validateEmail helper using standard email regex
    - Implement sanitizeEmail helper (lowercase, trim)
    - Return structured ValidationResult with isValid flag and errors map
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 12.1, 12.2, 12.3_
  - [ ]\* 2.2 Write property tests for validation utilities
    - **Property 4: Validation Completeness**
    - **Property 5: Validation Purity**
    - **Property 13: Required Field Validation**
    - **Validates: Requirements 2.1, 2.4, 2.6, 6.1**

- [ ] 3. Build useMultiStepForm custom hook
  - [x] 3.1 Create `hooks/use-multi-step-form.ts` hook
    - Implement state management for currentStep, formData, errors, touched fields
    - Implement next(), previous(), goToStep() navigation functions
    - Implement updateField() and validateCurrentStep() functions
    - Ensure data persistence across step transitions
    - Maintain step index bounds [1, totalSteps]
    - _Requirements: 1.1, 1.5, 1.6, 4.1, 4.2, 4.3, 4.4, 11.1, 11.2, 11.3, 11.4, 11.5_
  - [ ]\* 3.2 Write property tests for useMultiStepForm hook
    - **Property 1: Step Progression Invariant**
    - **Property 2: Data Persistence**
    - **Property 3: Step Index Bounds**
    - **Validates: Requirements 1.2, 1.3, 1.5, 1.6, 3.1, 4.1, 4.2, 4.3, 4.4**

- [x] 4. Create ProgressIndicator component
  - Create `components/ui/progress-indicator.tsx` component
  - Display step dots with connecting lines
  - Style active step with aq-blue color and glow effect
  - Show completed, current, and upcoming step states
  - Animate state transitions smoothly using Framer Motion
  - Add ARIA labels for accessibility
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 13.5_

- [ ] 5. Create FormStep component
  - [x] 5.1 Create `components/sections/form-step.tsx` component
    - Render fields based on FormStep configuration (text, email, select types)
    - Handle onChange and onBlur events for each field
    - Display inline validation errors below fields
    - Apply existing input styling from current waitlist-form.tsx
    - Support disabled state during form submission
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 10.1, 10.2, 10.3, 10.4, 10.5, 18.1, 18.2, 18.3, 18.4, 18.5_
  - [ ]\* 5.2 Write unit tests for FormStep component
    - Test field rendering for each type (text, email, select)
    - Test error display and clearing behavior
    - Test disabled state handling
    - _Requirements: 8.1, 8.2, 10.1, 10.2, 10.3_

- [ ] 6. Implement step transition animations
  - [x] 6.1 Create `components/sections/step-transition.tsx` wrapper component
    - Use Framer Motion AnimatePresence for step transitions
    - Implement forward animation (exit left, enter right)
    - Implement backward animation (exit right, enter left)
    - Set duration to 400ms with cubic-bezier easing
    - Disable form interactions during animation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 14.3_
  - [ ]\* 6.2 Write property tests for animations
    - **Property 6: Animation Consistency**
    - **Property 14: Animation Direction Consistency**
    - **Validates: Requirements 3.5, 7.1, 7.2, 7.4**

- [ ] 7. Checkpoint - Core components complete
  - Verify all components render correctly in isolation
  - Test hook functionality with mock data
  - Ensure animations work smoothly
  - Ask the user if questions arise

- [ ] 8. Refactor WaitlistForm to use multi-step system
  - [x] 8.1 Update `components/sections/waitlist-form.tsx` for full variant
    - Integrate useMultiStepForm hook with 3-step configuration
    - Replace current form fields with FormStep component wrapped in StepTransition
    - Add ProgressIndicator above form steps
    - Implement next/previous button logic with validation
    - Keep existing success state rendering unchanged
    - Maintain existing useTransition and status state management
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.1, 3.2, 3.3, 3.4, 9.1_
  - [x] 8.2 Preserve simple variant functionality
    - Keep simple variant as single-step inline form (no changes needed)
    - Ensure hidden fields (full_name, role) still populate correctly
    - Maintain existing styling and behavior for simple variant
    - _Requirements: 9.2, 9.3, 19.2, 19.3, 19.4_
  - [x] 8.3 Integrate form submission with existing server action
    - Call joinWaitlist server action on final step submission
    - Pass complete formData to server action
    - Handle success/error responses from server
    - Display server errors at form level
    - Reset form on success and show success state
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6A.1, 6A.2, 6A.3, 6A.4, 15.1, 15.2, 15.3, 15.4, 15.5_
  - [ ]\* 8.4 Write property tests for form submission
    - **Property 9: Submission Data Preservation**
    - **Property 10: Email Sanitization**
    - **Validates: Requirements 6.6, 12.1, 12.2, 12.3, 15.4**

- [ ] 9. Enhance error handling and user experience
  - [x] 9.1 Implement comprehensive error display
    - Show inline errors only for touched fields
    - Clear field errors immediately on field change
    - Display server errors below submit button
    - Clear server errors when user modifies form
    - Style errors with destructive color
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 15.5, 25.1, 25.2, 25.3, 25.4, 25.5_
  - [x] 9.2 Add keyboard navigation and accessibility
    - Implement Tab navigation through fields
    - Handle Enter key to trigger next/submit actions
    - Add proper htmlFor label associations
    - Ensure ARIA labels for screen readers
    - Associate error messages with fields using aria-describedby
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 27.1, 27.2, 27.3, 27.4, 27.5_
  - [ ]\* 9.3 Write property tests for error handling
    - **Property 7: Error State Clarity**
    - **Property 8: Error Clearing on Change**
    - **Validates: Requirements 8.2, 8.5**

- [ ] 10. Apply visual design and styling enhancements
  - [x] 10.1 Enhance glass morphism styling
    - Apply backdrop-blur-[30px] to form container
    - Add subtle noise overlay with opacity-[0.03]
    - Ensure consistent rounded-xl borders on all elements
    - Apply shadow-lg shadow-aq-blue/20 to submit button
    - Maintain existing h-12 input and h-14 button heights
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21A.1, 21A.2, 21A.3, 21A.4, 21A.5_
  - [x] 10.2 Add performance optimizations
    - Debounce field validation by 300ms using useDebouncedCallback or custom hook
    - Memoize step configurations with useMemo
    - Wrap FormStep and ProgressIndicator with React.memo
    - Use only transform and opacity in animations
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 11. Final integration and testing
  - [x] 11.1 Test complete user flows
    - Test full variant: navigate through all 3 steps and submit
    - Test simple variant: ensure single-step submission still works
    - Test validation: trigger errors and verify display/clearing
    - Test server errors: verify duplicate email and generic error handling
    - Test success state: verify form reset and success message display
    - _Requirements: 6A.1, 6A.2, 6A.3, 6A.4, 20.1, 20.2, 20.3, 20.4, 20.5_
  - [x] 11.2 Verify responsive behavior
    - Test on mobile: verify vertical stacking and touch targets
    - Test on desktop: verify grid layout for name/email and company/revenue
    - Test layout transitions between breakpoints
    - _Requirements: 9A.1, 9A.2, 9A.3, 9A.4, 9A.5, 22.1, 22.2, 22.3, 22.4, 22.5_
  - [ ]\* 11.3 Write integration property tests
    - **Property 11: Progress Indicator Synchronization**
    - **Property 12: Field Type Rendering**
    - **Property 15: Keyboard Navigation**
    - **Validates: Requirements 5.1, 5.2, 10.1, 10.2, 10.3, 13.1, 13.2, 13.3**

- [ ] 12. Final checkpoint - Complete system validation
  - Verify all functionality works end-to-end
  - Test both variants in different scenarios
  - Ensure no regressions in existing functionality
  - Confirm accessibility and performance requirements met
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation maintains full compatibility with the existing joinWaitlist server action
- Simple variant remains unchanged as a single-step inline form
- Full variant transforms into a 3-step progressive disclosure experience
- All existing styling patterns and brand colors are preserved
- Property tests validate universal correctness properties from the design document
