# UI Component Library Documentation

A collection of reusable, accessible React UI components built with TypeScript.

## Table of Contents

1. [Installation](#installation)
2. [Components](#components)
   - [Button](#button)
   - [Card](#card)
   - [Modal](#modal)
   - [Input](#input)
   - [Select](#select)
   - [Alert](#alert)
3. [Accessibility](#accessibility)
4. [Responsive Design](#responsive-design)
5. [Styling Guidelines](#styling-guidelines)

---

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Components

### Button

A versatile button component with multiple variants, sizes, and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content (required) |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `fullWidth` | `boolean` | `false` | Makes button full width |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `onClick` | `function` | - | Click event handler |
| `ariaLabel` | `string` | - | Accessible label |
| `className` | `string` | `''` | Additional CSS classes |

#### Usage Examples

```tsx
import { Button } from './components';

// Basic usage
<Button>Click Me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button fullWidth>Full Width</Button>

// With click handler
<Button onClick={() => console.log('clicked')}>Click Me</Button>
```

#### Accessibility Features
- Uses native `<button>` element
- Supports `aria-label` for screen readers
- `aria-busy` attribute when loading
- Visible focus states

---

### Card

A flexible card component with header, body, footer, and image sections.

#### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Card content (required) |
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Card style variant |
| `hoverable` | `boolean` | `false` | Enables hover animation |
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Content padding |
| `onClick` | `function` | - | Click handler (makes card interactive) |
| `className` | `string` | `''` | Additional CSS classes |

#### Sub-components

- `CardHeader` - Header section with title styling
- `CardBody` - Main content area
- `CardFooter` - Footer with action buttons (supports `align` prop)
- `CardImage` - Image with lazy loading (supports `position` and `height` props)

#### Usage Examples

```tsx
import { Card, CardHeader, CardBody, CardFooter, CardImage } from './components';

// Basic card
<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    Card content goes here.
  </CardBody>
  <CardFooter align="right">
    <Button>Action</Button>
  </CardFooter>
</Card>

// Elevated card with hover effect
<Card variant="elevated" hoverable>
  <CardBody>Elevated content</CardBody>
</Card>

// Card with image
<Card>
  <CardImage src="/image.jpg" alt="Description" height="200px" />
  <CardBody>Image card content</CardBody>
</Card>

// Clickable card
<Card onClick={() => navigate('/details')}>
  <CardBody>Click anywhere</CardBody>
</Card>
```

#### Accessibility Features
- Uses semantic `<article>` element
- Clickable cards include `role="button"` and keyboard support
- Focus visible states for interactive cards

---

### Modal

An accessible modal dialog with overlay, animations, and keyboard support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility (required) |
| `onClose` | `function` | - | Close callback (required) |
| `children` | `ReactNode` | - | Modal content (required) |
| `title` | `string` | - | Modal title |
| `size` | `'small' \| 'medium' \| 'large' \| 'fullscreen'` | `'medium'` | Modal size |
| `closeOnOverlay` | `boolean` | `true` | Close when clicking overlay |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `showCloseButton` | `boolean` | `true` | Show close button |
| `className` | `string` | `''` | Additional CSS classes |

#### Sub-components

- `ModalFooter` - Footer for action buttons (supports `align` prop)

#### Usage Examples

```tsx
import { useState } from 'react';
import { Modal, ModalFooter, Button } from './components';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmation"
        size="medium"
      >
        <p>Are you sure you want to proceed?</p>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

#### Accessibility Features
- Focus trap within modal
- Escape key closes modal
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` linked to title
- Returns focus to trigger element on close
- Prevents body scroll when open

---

### Input

A form input component with label, validation, and icon support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below input |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size |
| `fullWidth` | `boolean` | `false` | Full width input |
| `leftIcon` | `ReactNode` | - | Left icon element |
| `rightIcon` | `ReactNode` | - | Right icon element |
| `variant` | `'default' \| 'filled'` | `'default'` | Input style variant |
| `...props` | `InputHTMLAttributes` | - | All native input props |

#### Usage Examples

```tsx
import { Input } from './components';

// Basic input
<Input label="Username" placeholder="Enter username" />

// With validation error
<Input
  label="Email"
  type="email"
  error="Please enter a valid email"
/>

// With helper text
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>

// Required field
<Input label="Name" required />

// With icons
<Input
  label="Search"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Filled variant
<Input label="Filled" variant="filled" />

// Disabled
<Input label="Disabled" disabled />
```

#### Accessibility Features
- Associated `<label>` with input via `htmlFor`
- `aria-invalid` when error exists
- `aria-describedby` links to error/helper text
- Required indicator (`*`) with `aria-hidden`
- Error messages use `role="alert"`

---

### Select

A styled select dropdown with label and validation support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Select label |
| `options` | `SelectOption[]` | - | Array of options (required) |
| `placeholder` | `string` | - | Placeholder text |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Select size |
| `fullWidth` | `boolean` | `false` | Full width select |
| `variant` | `'default' \| 'filled'` | `'default'` | Select style variant |
| `...props` | `SelectHTMLAttributes` | - | All native select props |

#### SelectOption Type

```ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

#### Usage Examples

```tsx
import { Select } from './components';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular', disabled: true },
];

// Basic select
<Select
  label="Framework"
  options={options}
  placeholder="Select a framework"
/>

// With error
<Select
  label="Country"
  options={countryOptions}
  error="Please select a country"
  required
/>

// Controlled
<Select
  label="Size"
  options={sizeOptions}
  value={selectedSize}
  onChange={(e) => setSelectedSize(e.target.value)}
/>
```

#### Accessibility Features
- Associated label via `htmlFor`
- `aria-invalid` for error state
- `aria-describedby` for helper/error text
- Custom dropdown icon is `aria-hidden`

---

### Alert

A notification component for displaying messages with different severity levels.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Alert message (required) |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert severity |
| `title` | `string` | - | Alert title |
| `dismissible` | `boolean` | `false` | Show dismiss button |
| `onDismiss` | `function` | - | Dismiss callback |
| `variant` | `'filled' \| 'outlined' \| 'light'` | `'light'` | Alert style variant |
| `showIcon` | `boolean` | `true` | Show type icon |
| `className` | `string` | `''` | Additional CSS classes |

#### Usage Examples

```tsx
import { Alert } from './components';

// Basic alerts
<Alert type="info">Information message</Alert>
<Alert type="success">Success message</Alert>
<Alert type="warning">Warning message</Alert>
<Alert type="error">Error message</Alert>

// With title
<Alert type="success" title="Success!">
  Your changes have been saved.
</Alert>

// Dismissible
<Alert
  type="error"
  dismissible
  onDismiss={() => setShowAlert(false)}
>
  Something went wrong.
</Alert>

// Variants
<Alert type="info" variant="filled">Filled style</Alert>
<Alert type="info" variant="outlined">Outlined style</Alert>
<Alert type="info" variant="light">Light style (default)</Alert>
```

#### Accessibility Features
- Uses `role="alert"` for screen reader announcements
- `aria-live="polite"` for dynamic content
- Icons are `aria-hidden`
- Dismiss button has `aria-label`

---

## Accessibility

All components in this library are designed with accessibility in mind:

### Keyboard Navigation
- All interactive elements are focusable
- Modal traps focus and supports Escape key
- Cards can be activated with Enter key when clickable

### Screen Reader Support
- Proper ARIA attributes on all components
- Labels associated with form controls
- Error messages announced via `role="alert"`

### Visual Accessibility
- Sufficient color contrast ratios
- Visible focus indicators
- Clear error states

### Best Practices Followed
- Semantic HTML elements
- Proper heading hierarchy
- Descriptive button/link text

---

## Responsive Design

All components are responsive and adapt to different screen sizes:

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Responsive Features
- Buttons stack vertically on mobile
- Cards use single column on mobile
- Modal becomes full-width on mobile with bottom-sheet behavior
- Form inputs span full width on smaller screens
- Adjusted padding and font sizes for mobile

### CSS Media Queries Used

```css
/* Tablet and below */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 640px) { }

/* Small mobile */
@media (max-width: 480px) { }
```

---

## Styling Guidelines

### CSS Architecture
- BEM naming convention (Block__Element--Modifier)
- Component-scoped CSS files
- CSS custom properties for theming

### Color Palette
- **Primary**: #3b82f6 (Blue)
- **Secondary**: #6b7280 (Gray)
- **Success**: #22c55e (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Text**: #111827, #374151, #6b7280
- **Background**: #ffffff, #f9fafb, #f3f4f6

### Typography
- Font family: System font stack (inherited)
- Base size: 1rem (16px)
- Small: 0.875rem (14px)
- Large: 1.125rem (18px)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px

---

## Project Structure

```
ui-component-library/
├── src/
│   ├── components/
│   │   ├── Alert/
│   │   │   ├── Alert.tsx
│   │   │   ├── Alert.css
│   │   │   └── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   ├── Card.css
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.css
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   ├── Modal.css
│   │   │   └── index.ts
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   ├── Select.css
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── DOCUMENTATION.md
├── package.json
└── README.md
```

---

## Author

Week 2 Task - UI Component Library Development
