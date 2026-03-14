import { act, renderHook } from '@testing-library/react';
import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { FormStep } from '@/lib/types/waitlist-form';

import { useMultiStepForm } from '@/hooks/use-multi-step-form';

const mockSteps: FormStep[] = [
  {
    id: 1,
    title: 'Step 1',
    description: '',
    fields: [
      { name: 'full_name', type: 'text', label: 'Name', required: true },
    ],
  },
  {
    id: 2,
    title: 'Step 2',
    description: '',
    fields: [{ name: 'email', type: 'email', label: 'Email', required: true }],
  },
  {
    id: 3,
    title: 'Step 3',
    description: '',
    fields: [
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        required: true,
        options: [{ value: 'brand', label: 'Brand' }],
      },
    ],
  },
];

describe('useMultiStepForm', () => {
  // Behaviour 23
  it('initialises with currentStep === 1', () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    expect(result.current.currentStep).toBe(1);
  });

  // Behaviour 24
  it('initialises with empty formData {}', () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    expect(result.current.formData).toEqual({});
  });

  // Behaviour 25 — next() advances step only when current step is valid
  // We pre-fill a valid value so validateCurrentStep passes
  it('next() increments currentStep from 1 to 2 when step is valid', () => {
    const { result } = renderHook(() =>
      useMultiStepForm(mockSteps, { full_name: 'Amina' })
    );
    act(() => {
      result.current.next();
    });
    expect(result.current.currentStep).toBe(2);
  });

  // Behaviour 26
  it('next() does NOT increment past totalSteps (stays at 3 when already at 3)', () => {
    const { result } = renderHook(() =>
      useMultiStepForm(mockSteps, {
        full_name: 'Amina',
        email: 'a@b.com',
        role: 'brand',
      })
    );
    act(() => result.current.next()); // → 2
    act(() => result.current.next()); // → 3
    act(() => result.current.next()); // attempt → 4, should stay at 3
    expect(result.current.currentStep).toBe(3);
  });

  // Behaviour 27
  it('previous() decrements currentStep from 2 to 1', () => {
    const { result } = renderHook(() =>
      useMultiStepForm(mockSteps, { full_name: 'Amina' })
    );
    act(() => result.current.next()); // → 2
    act(() => result.current.previous()); // → 1
    expect(result.current.currentStep).toBe(1);
  });

  // Behaviour 28
  it('previous() does NOT decrement below 1 (stays at 1 when already at 1)', () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    act(() => result.current.previous());
    expect(result.current.currentStep).toBe(1);
  });

  // Behaviour 29
  it("updateField('full_name', 'Amina') sets formData.full_name to 'Amina'", () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    act(() => result.current.updateField('full_name', 'Amina'));
    expect(result.current.formData.full_name).toBe('Amina');
  });

  // Behaviour 30
  it('formData set in step 1 is still present after navigating to step 2 via next()', () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    act(() => result.current.updateField('full_name', 'Amina'));
    act(() => result.current.next()); // valid because full_name is set
    expect(result.current.formData.full_name).toBe('Amina');
    expect(result.current.currentStep).toBe(2);
  });

  // Behaviour 31
  it('formData set in step 2 is still present after navigating back to step 1 via previous()', () => {
    const { result } = renderHook(() =>
      useMultiStepForm(mockSteps, { full_name: 'Amina' })
    );
    act(() => result.current.next()); // → 2
    act(() => result.current.updateField('email', 'amina@brand.ma'));
    act(() => result.current.previous()); // → 1
    expect(result.current.formData.email).toBe('amina@brand.ma');
  });

  // Behaviour 32
  it('validateCurrentStep() returns false when a required field in the current step is empty', () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    let valid: boolean;
    act(() => {
      valid = result.current.validateCurrentStep();
    });
    expect(valid!).toBe(false);
  });

  // Behaviour 33
  it('validateCurrentStep() returns false AND sets the errors object with the field name', () => {
    const { result } = renderHook(() => useMultiStepForm(mockSteps));
    act(() => {
      result.current.validateCurrentStep();
    });
    expect(result.current.errors).toHaveProperty('full_name');
  });

  // Behaviour 34
  it('validateCurrentStep() returns true when all required fields in the current step have valid values', () => {
    const { result } = renderHook(() =>
      useMultiStepForm(mockSteps, { full_name: 'Amina' })
    );
    let valid: boolean;
    act(() => {
      valid = result.current.validateCurrentStep();
    });
    expect(valid!).toBe(true);
  });

  // Behaviour 35 — property-based test
  it('currentStep always stays within [1, totalSteps] after any sequence of next()/previous() calls', () => {
    fc.assert(
      fc.property(
        fc.array(fc.oneof(fc.constant('next'), fc.constant('prev')), {
          maxLength: 50,
        }),
        (actions) => {
          const { result } = renderHook(() =>
            useMultiStepForm(mockSteps, {
              full_name: 'Amina',
              email: 'a@b.com',
              role: 'brand',
            })
          );
          actions.forEach((action) => {
            if (action === 'next') act(() => result.current.next());
            else act(() => result.current.previous());
          });
          const { currentStep, totalSteps } = result.current;
          return currentStep >= 1 && currentStep <= totalSteps;
        }
      )
    );
  });
});
