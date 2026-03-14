import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { FormField, FormStep } from '@/lib/types/waitlist-form';

import { FormStep as FormStepComponent } from '@/components/sections/form-step';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props}>{children}</h2>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useReducedMotion: () => false,
  useScroll: () => ({ scrollYProgress: { on: vi.fn(), get: () => 0 } }),
  useTransform: (_: unknown, __: unknown, output: unknown[]) => output[0],
}));

// ── Fixtures ───────────────────────────────────────────────────────────────────

const textField: FormField = {
  name: 'full_name',
  type: 'text',
  label: 'Name',
  placeholder: 'Your name',
  required: true,
};

const emailField: FormField = {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'you@example.com',
  required: true,
};

const selectField: FormField = {
  name: 'role',
  type: 'select',
  label: 'Role',
  placeholder: 'Select role',
  required: true,
  options: [
    { value: 'brand', label: 'Fashion Brand' },
    { value: 'stylist', label: 'Stylist' },
  ],
};

function makeStep(fields: FormField[]): FormStep {
  return { id: 1, title: 'Test Step', description: 'desc', fields };
}

const defaultProps = {
  formData: {},
  errors: {},
  onChange: vi.fn(),
  onBlur: vi.fn(),
  disabled: false,
};

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('FormStep', () => {
  // Behaviour 36
  it("renders an <input type='text'> when field.type is 'text'", () => {
    render(
      <FormStepComponent {...defaultProps} step={makeStep([textField])} />
    );
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveAttribute(
      'type',
      'text'
    );
  });

  // Behaviour 37
  it("renders an <input type='email'> when field.type is 'email'", () => {
    render(
      <FormStepComponent {...defaultProps} step={makeStep([emailField])} />
    );
    // email inputs don't have an implicit role — query by label
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute('type', 'email');
  });

  // Behaviour 38
  it("renders a <select> when field.type is 'select'", () => {
    render(
      <FormStepComponent {...defaultProps} step={makeStep([selectField])} />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  // Behaviour 39
  it('renders all option elements inside the select with correct values and labels', () => {
    render(
      <FormStepComponent {...defaultProps} step={makeStep([selectField])} />
    );
    expect(
      screen.getByRole('option', { name: 'Fashion Brand' })
    ).toHaveAttribute('value', 'brand');
    expect(screen.getByRole('option', { name: 'Stylist' })).toHaveAttribute(
      'value',
      'stylist'
    );
  });

  // Behaviour 40
  it('calls onChange prop with (fieldName, newValue) when user types in a text input', () => {
    const onChange = vi.fn();
    render(
      <FormStepComponent
        {...defaultProps}
        step={makeStep([textField])}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Amina' },
    });
    expect(onChange).toHaveBeenCalledWith('full_name', 'Amina');
  });

  // Behaviour 41
  it('calls onBlur prop with (fieldName) when user blurs a field', () => {
    const onBlur = vi.fn();
    render(
      <FormStepComponent
        {...defaultProps}
        step={makeStep([textField])}
        onBlur={onBlur}
      />
    );
    fireEvent.blur(screen.getByRole('textbox', { name: /name/i }));
    expect(onBlur).toHaveBeenCalledWith('full_name');
  });

  // Behaviour 42
  it('renders the error message string below the field when errors prop contains an entry for that field', () => {
    render(
      <FormStepComponent
        {...defaultProps}
        step={makeStep([textField])}
        errors={{ full_name: 'Name is required' }}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });

  // Behaviour 43
  it('does NOT render an error element when errors prop has no entry for that field', () => {
    render(
      <FormStepComponent {...defaultProps} step={makeStep([textField])} />
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // Behaviour 44
  it('all input/select elements have the HTML disabled attribute when disabled prop is true', () => {
    render(
      <FormStepComponent
        {...defaultProps}
        step={makeStep([textField, emailField, selectField])}
        disabled={true}
      />
    );
    const textInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByLabelText(/email/i);
    const select = screen.getByRole('combobox');
    expect(textInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(select).toBeDisabled();
  });
});
