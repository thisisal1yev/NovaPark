# Smart Parking Pro - Design Guidelines

## Design Approach
**System-Based with Creative Enhancement**: Material Design principles for the dashboard/admin interfaces (data-heavy, real-time updates) combined with modern gradient aesthetics and smooth animations for user-facing components.

## Core Design Principles

### Visual Identity
- **Modern Gradient Aesthetic**: Use vibrant gradients throughout (blues, purples, teals) to convey innovation and technology
- **Real-time Dynamism**: Live elements (clocks, timers, availability counters) should pulse subtly to indicate active status
- **Parking-Centric Color Psychology**: Blues (trust, technology), Greens (available spaces), Reds (occupied), Yellows (warnings)

### Typography
- **Primary Font**: Inter or Poppins (clean, modern, excellent readability)
- **Hierarchy**: 
  - Hero/Dashboard Headers: 2.5rem - 3rem (bold)
  - Section Titles: 1.75rem - 2rem (semi-bold)
  - Card Headers: 1.25rem (medium)
  - Body Text: 1rem (regular)
  - Micro-copy/Timers: 0.875rem (medium)

### Layout System
**Spacing**: Tailwind units of 2, 4, 6, and 8 as primary spacing scale
- Cards/Containers: p-6
- Section Padding: py-12 or py-16
- Element Gaps: gap-4 or gap-6
- Tight Elements: p-2 or p-4

**Grid Strategy**:
- Admin Dashboard: 3-4 column KPI cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Parking List: 2-3 columns (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- User Profile: 2-column layout (details + history)

## Component Library

### Navigation
- **User Navigation**: Transparent/floating header with blur effect, sticky on scroll
- **Admin Navigation**: Sidebar (collapsible on mobile) with icon + text menu items, dark gradient background

### Cards & Containers
- **KPI Cards**: Gradient borders or backgrounds, large icon (Lucide), metric number prominent (3rem), trend indicators
- **Parking Cards**: Image thumbnail (if available), availability badge (green/yellow/red), price display, action button
- **Session Cards**: Live timer display, vehicle info, current cost calculator, end session CTA

### Interactive Map (Leaflet.js)
- **Markers**: Custom parking pin icons with availability color coding
- **Info Windows**: Mini-cards showing parking name, available spots, price per hour, quick book button
- **Map Controls**: Rounded, shadowed controls with gradient accents

### Charts & Data Visualization (Chart.js)
- **Chart Types**: 
  - Line charts for 7-day hourly statistics and 24-hour forecasts
  - Bar charts for 30-day revenue
  - Doughnut charts for occupancy percentages
- **Styling**: Gradient fills, smooth curves, gridlines subtle, tooltips with blur backgrounds

### Forms & Inputs
- **Booking Form**: Multi-step with progress indicator, date/time pickers with calendar UI, vehicle selector dropdown
- **Input Fields**: Rounded corners (rounded-lg), subtle shadows, focus rings with brand color
- **Buttons**: 
  - Primary: Gradient background, white text, rounded-lg, shadow on hover
  - Secondary: Outline style with gradient border
  - Danger: Red gradient for critical actions

### Discount Display
- **Badge System**: Small colored badges (10%, 15%, etc.) with tooltip explanations
- **Calculator UI**: Real-time price breakdown showing original price, applied discounts (list), final price (large, emphasized)

### Camera Interface (Admin)
- **Layout**: Live feed mockup (16:9 aspect), detected vehicle info overlay, recognition confidence meter, action buttons below

## Animations & Interactions
- **Page Transitions**: Subtle fade-in (0.3s)
- **Card Hovers**: Lift effect (translateY -2px, shadow increase)
- **Loading States**: Skeleton screens with shimmer effect
- **Live Timers**: Smooth count-up with color change as session progresses
- **Chart Animations**: Staggered data point reveals (0.5s delay between series)

## Responsive Strategy
- **Mobile (< 576px)**: Single column, collapsible filters, bottom navigation for users
- **Tablet (768px)**: 2-column grids, visible sidebar (iconified)
- **Desktop (> 992px)**: Full multi-column layouts, expanded sidebar, side-by-side map + list views

## Images
- **Hero Section**: Not applicable - system leads directly with interactive map or dashboard
- **Parking Thumbnails**: Real parking lot photos (300x200px) in parking list cards
- **Empty States**: Illustrated graphics for "no active sessions", "no parking history"
- **Profile Avatars**: Circular user photos or initials with gradient backgrounds

## Key User Flows

### User Interface
1. **Home**: Interactive map dominates viewport (70%), sidebar with quick filters
2. **Booking**: Map selection → Details modal → Multi-step form → Confirmation with timer
3. **Active Session**: Prominent timer card, live cost update, quick end button, navigation to parking location
4. **Profile**: Tabbed interface (My Info, Vehicles, History, Discounts)

### Admin Interface
1. **Dashboard**: 4 KPI cards at top, 3 chart sections below (2-column layout), recent activity stream
2. **Parking Management**: Table view with quick actions, add/edit modals with form validation
3. **Camera Panel**: Grid of camera feeds (2x2 or 3x2), detection log sidebar, manual override controls

## Accessibility
- High contrast ratios maintained despite gradients (WCAG AA minimum)
- Focus indicators visible on all interactive elements
- Live regions for timer updates and availability changes
- Keyboard navigation throughout

This design creates a modern, tech-forward parking management system that balances visual appeal with functional clarity for both users and administrators.