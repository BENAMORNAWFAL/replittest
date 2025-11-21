# Design Guidelines: Restaurant Management Dashboard

## Design Approach

**Selected Approach:** Hybrid Design System with Restaurant Theming  
**Justification:** This is a utility-focused management dashboard requiring efficient CRUD workflows, combined with warm, restaurant-appropriate aesthetics.

**Design Principles:**

- Efficiency-first interface for rapid product management
- Professional dashboard aesthetics with subtle restaurant warmth
- Clear visual hierarchy separating authentication from management interface
- Trust and reliability through clean, organized layouts

## Core Design Elements

### Typography

**Font Families:**

- Primary: Inter (via Google Fonts) - clean, modern, highly legible
- Accent: Playfair Display (for restaurant branding touches)

**Hierarchy:**

- H1: 2.5rem (40px), font-weight 700, Playfair Display - Login page title
- H2: 2rem (32px), font-weight 600, Inter - Dashboard header
- H3: 1.5rem (24px), font-weight 600, Inter - Section titles
- Body: 1rem (16px), font-weight 400, Inter - General content
- Small: 0.875rem (14px), font-weight 400, Inter - Secondary information
- Button Text: 1rem, font-weight 500, Inter - All CTAs

### Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8

- Micro spacing: p-2, gap-2 (cards, form fields)
- Standard spacing: p-4, m-4, gap-4 (component padding)
- Section spacing: p-6, py-6 (between sections)
- Large spacing: p-8, gap-8 (page margins, major sections)

**Grid System:**

- Login page: Single centered column, max-w-md
- Product grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Form layouts: Single column on mobile, two-column on desktop where appropriate
- Container: max-w-7xl for dashboard content

### Component Library

**Authentication Components:**

- Login card: Elevated white card (shadow-lg) with rounded corners (rounded-lg), centered on page
- Form inputs: Full-width text fields with border, rounded-md, focus states with brand color
- Primary CTA: Full-width button, rounded-md, bold text
- Background: Subtle gradient or food-themed pattern behind login card

**Dashboard Navigation:**

- Top navigation bar: Fixed header with logo (left), user info and logout (right)
- Height: h-16, shadow-sm for separation
- Logo area: Restaurant name in Playfair Display

**Product Cards:**

- Image: Aspect ratio 4:3, object-cover, rounded-t-lg
- Content area: p-4 with structured layout
- Product name: font-semibold, text-lg
- Description: text-sm, line-clamp-2 for truncation
- Price: font-bold, text-xl, prominent display
- Actions: Icon buttons (edit, delete) positioned at card bottom or corner overlay
- Card styling: rounded-lg, shadow-md, hover:shadow-lg transition

**Action Buttons:**

- Add Product: Large, prominent FAB (floating action button) or top-right positioned button
- Edit/Delete: Icon buttons with clear hover states, tooltips
- Primary actions: Solid background
- Secondary actions: Outline style

**Modals:**

- Edit Product Modal: Centered overlay, max-w-2xl, rounded-lg
- Form fields: Stacked vertically with proper spacing (gap-4)
- Image upload: Drag-and-drop area with preview
- Action buttons: Right-aligned, Cancel (outline) + Save (solid)

**Dialogs:**

- Delete Confirmation: Smaller modal, max-w-md, clear warning styling
- Message text: Center-aligned with icon
- Buttons: Side-by-side, Cancel + Confirm Delete

**Forms:**

- Input fields: Border with rounded corners, p-3, focus ring
- Labels: font-medium, mb-2, clear association
- Image upload: Visual dropzone with dashed border, preview thumbnail
- Validation: Inline error messages below fields

**Empty States:**

- No products view: Centered content with icon, message, and Add Product CTA

**Loading States:**

- Skeleton screens for product grid
- Spinner for form submissions

### Images

**Login Page:**

- Background Image: Full-screen food photography (blurred overlay) or abstract food pattern
- Suggested imagery: Warm restaurant ambiance, plated dishes, or kitchen scenes
- Treatment: Overlay with semi-transparent gradient to ensure text legibility

**Product Images:**

- User-uploaded product photos
- Placeholder: Icon or default food image when no image provided
- Aspect ratio: Consistent 4:3 across all product cards
- Quality: Ensure responsive srcset for performance

**Dashboard:**

- Logo/Branding: Restaurant logo in header (if available, otherwise text-based)
- No hero image needed in management interface

### Responsive Behavior

**Breakpoints:**

- Mobile (base): Single column layouts, stacked forms, hamburger menu if needed
- Tablet (md: 768px): 2-column product grid, expanded navigation
- Desktop (lg: 1024px): 3-column product grid, full navigation
- Large (xl: 1280px): 4-column product grid

**Mobile Optimizations:**

- Touch-friendly button sizes (min-height: 44px)
- Simplified product cards with essential info
- Modal forms as full-screen on mobile
- Bottom sheet style for delete confirmations

### Interaction Patterns

**Navigation Flow:**

1. Login screen → Dashboard with product grid
2. Protected route: Redirect to login if not authenticated
3. Logout returns to login screen

**Product Management:**

- Click product card → Edit modal opens
- Add button → Add product modal
- Delete icon → Confirmation dialog → Remove from grid
- All actions provide immediate visual feedback

**Form Interactions:**

- Real-time validation on blur
- Clear error states with red accent
- Success confirmation after save (toast notification or brief message)
- Image upload with instant preview

This design creates a professional, efficient restaurant management experience that balances utility with warm, food-focused aesthetics through strategic use of typography, spacing, and the specified blue-orange color palette.
