# Frontend Agent Guidelines (L'Atelier Interior Shop)

These guidelines are mandatory for all AI agents and developers contributing to the Next.js frontend codebase.

---

## 1. Core Principles: Reusability & DRY (Don't Repeat Yourself)

1. **Always Build Reusable Components**:
   - Every UI element must be constructed using reusable components.
   - Do **NOT** write ad-hoc inline styled HTML elements (e.g., raw `<button>`, arbitrary `<h1>`, repetitive card wrappers) directly inside pages.
   - **Even if a component is initially used only once**, extract it into a modular, reusable component in `src/components/ui/` or `src/components/{feature}/`. Single-use components establish design consistency and isolate changes.

2. **Strict Component Hierarchy**:
   - **Page Level (`src/app/**/page.tsx`)**: Responsible only for assembling high-level feature components, layout structure, and passing route parameters. Minimal to no raw styling tags.
   - **Feature Components (`src/components/{feature}/`)**: Domain-specific logic, composing UI primitives (e.g., `ProductCard`, `CartDrawer`, `ConsultationForm`).
   - **UI Primitives (`src/components/ui/`)**: Reusable atomic building blocks that define the design system (Typography, Card, Button, Breadcrumb, Badge, Modal, Input).

---

## 2. Mandatory Component Breakdown

Before writing any page or feature, always check for or create reusable components for:

### A. Typography Components (`src/components/ui/Typography.tsx`)
- **`PageTitle`**: Primary page `<h1>` heading with standardized font, serif styling, and letter-spacing.
- **`SectionHeading`**: `<h2>` section headers with optional accent badges/subheadings.
- **`CardTitle` / `CardHeader`**: `<h3>` or `<h4>` titles for cards and grid items.
- **`Text`**: Standard body paragraph text (`text-stone-300`, `leading-relaxed`, `text-sm`/`text-base`).
- **`SmallText` / `Caption`**: Fine-print, metadata, tags, and timestamps (`text-xs` or `text-[11px]`, `text-stone-400`/`text-stone-500`).

### B. Containers & Cards (`src/components/ui/Card.tsx`)
- **`Card`**: Standardized surface container with border, dark background token, rounded corners, and hover transition.
- **`CardHeader`**: Consistent card header wrapper with spacing and optional action slot.
- **`CardBody`**: Main content padding.
- **`CardFooter`**: Bottom action/metadata section with optional border-top separator.

### C. Actions & Navigation
- **`Button` (`src/components/ui/Button.tsx`)**: Unified button supporting variants (`primary`, `secondary`, `outline`, `ghost`, `gold`), sizes (`sm`, `md`, `lg`), loading spinner states, and icon slots.
- **`Breadcrumb` (`src/components/ui/Breadcrumb.tsx`)**: Standardized route hierarchy with chevron separators and active item states.

### D. Images & Media
- Always wrap media in a dedicated container component with aspect-ratio management, graceful image fallbacks, and skeleton loading.

---

## 3. Data Fetching: RTK Query Exclusively

1. **RTK Query Only**:
   - All server communication and data fetching **MUST** go through **Redux Toolkit Query (RTK Query)**.
   - **NEVER** use raw `fetch()` or `axios` inside UI components or page files.
   - Base configuration resides in `src/store/services/api.ts`.
   - Feature endpoints must be injected using `baseApi.injectEndpoints({ ... })` under `src/store/services/`:
     - `productsApi.ts` for catalog and categories.
     - `consultationApi.ts` for consultations and order placements.

2. **Query & Mutation Usage**:
   - Always consume the auto-generated React hooks (e.g., `useGetProductsQuery()`, `useBookConsultationMutation()`).
   - Handle `isLoading`, `isError`, and `data` states with standardized skeletons and error boundaries.
   - Utilize RTK Query tag invalidation (`tagTypes: ['Product', 'Category', 'Consultation', 'Order']`) for automatic cache updates after mutations.

---

## 4. Mandatory Type Safety Standards

- **Strict Type Safety Always**:
  - Always write 100% type-safe TypeScript code without exceptions.
  - **Zero `any`**: The use of `any` or loose `object` types is strictly prohibited. Use precise TypeScript interfaces or `unknown` with type-guard narrowing.
  - **Component Props**: Every single component must explicitly declare a strongly typed Props interface (e.g., `interface ButtonProps`, `interface ProductGridProps`). Never omit prop types.
  - **Event Handlers**: Type all DOM event handlers precisely (e.g., `React.FormEvent<HTMLFormElement>`, `React.ChangeEvent<HTMLInputElement>`).
  - **RTK Query Endpoints**: All queries and mutations must specify both the Response type and the Query Argument type (e.g., `builder.query<ApiResponse<Product[]>, ProductFilters | void>`).
  - **Null & Undefined Safety**: Utilize optional chaining (`?.`) and nullish coalescing (`??`) with explicit fallbacks. Avoid unverified type assertions (`as unknown as Type`).
  - **Centralized Types**: Store shared domain models in `src/types/index.ts` so they remain uniform across components, Redux slices, and RTK Query services.

---

## 5. Code Quality & Standards

- **DRY Enforcement**: If a piece of markup, calculation, or styling block repeats more than once, extract it into a reusable helper or component immediately.
- **Client vs. Server Components**: Mark interactive components containing hooks, event handlers (`onClick`, `onSubmit`), or Redux dispatch with `'use client';` at the top of the file.
- **Styling**: Use Tailwind CSS utilities mapped to the dark luxury aesthetic (`stone-950`, `stone-900`, `stone-800`, `amber-400`, `amber-500`).
- **Zero Dead Code**: Delete unused imports, dead components, and placeholder files immediately.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
