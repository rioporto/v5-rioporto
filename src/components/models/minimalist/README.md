# Minimalist Design System

Clean, elegant design system with focus on whitespace, typography, and sophisticated simplicity.

## Design Philosophy

The Minimalist design system embodies the principle that "less is more." It focuses on:

- **Breathing Space**: Generous whitespace and spacing for visual clarity
- **Typography Excellence**: Inter font family with carefully chosen weights
- **Subtle Interactions**: Delicate hover states and smooth transitions
- **Color Restraint**: Black, white, and gold palette for timeless elegance
- **Content Focus**: Design that never competes with content

## Color Palette

### Primary Colors
- **Background**: `hsl(0 0% 100%)` - Pure white
- **Foreground**: `hsl(0 0% 0%)` - Pure black
- **Primary**: `hsl(51 100% 50%)` - Gold accent (#FFD700)
- **Secondary**: `hsl(0 0% 97%)` - Light surface (#F8F8F8)

### Semantic Colors
- **Success**: `hsl(142 76% 36%)` - Green
- **Error**: `hsl(0 72% 51%)` - Red
- **Warning**: `hsl(43 96% 56%)` - Amber
- **Muted**: `hsl(0 0% 45%)` - Gray text

## Typography

### Font Stack
- **Primary**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Monospace**: JetBrains Mono, 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, monospace
- **Display**: Inter (same as primary for consistency)

### Font Weights
- Light (300): For subtle text
- Regular (400): Body text
- Medium (500): Subtle emphasis
- Semibold (600): Strong emphasis
- Bold (700): Headings and important text

## Components

### Core Components

#### MinimalistButton
Clean button with subtle hover effects and multiple variants.

```tsx
<MinimalistButton variant="primary" size="lg">
  Get Started
</MinimalistButton>
```

**Variants**: `primary`, `secondary`, `ghost`, `outline`
**Sizes**: `sm`, `md`, `lg`

#### MinimalistCard
Elegant cards with soft shadows and clean aesthetics.

```tsx
<MinimalistCard variant="elevated" padding="lg">
  <MinimalistCardHeader>
    <MinimalistCardTitle>Card Title</MinimalistCardTitle>
    <MinimalistCardDescription>Description text</MinimalistCardDescription>
  </MinimalistCardHeader>
  <MinimalistCardContent>
    Content goes here
  </MinimalistCardContent>
</MinimalistCard>
```

#### MinimalistHeader
Clean, spacious header with elegant navigation.

```tsx
<MinimalistHeader>
  <MinimalistNavigation>
    <MinimalistNavLink href="#" active>Dashboard</MinimalistNavLink>
    <MinimalistNavLink href="#">Portfolio</MinimalistNavLink>
  </MinimalistNavigation>
</MinimalistHeader>
```

#### MinimalistStats
Clean statistics display with optional change indicators.

```tsx
<MinimalistStats 
  stats={[
    { 
      label: 'Total Volume', 
      value: 'R$ 2.4M', 
      change: { value: '+12.5%', type: 'positive' } 
    }
  ]}
  columns={3}
/>
```

#### MinimalistChart
Simple, clean charts with minimal visual noise.

```tsx
<MinimalistChart
  title="Trading Volume"
  data={chartData}
  type="bar"
  height={200}
/>
```

#### MinimalistTable
Elegant tables with hover effects and clean borders.

```tsx
<MinimalistTable
  columns={columns}
  data={data}
  onSort={handleSort}
/>
```

#### Form Components
Clean form inputs with subtle focus states.

```tsx
<MinimalistFormGroup title="User Information">
  <MinimalistInput 
    label="Email" 
    type="email" 
    required 
  />
  <MinimalistTextarea 
    label="Message" 
    rows={4} 
  />
  <MinimalistSelect 
    label="Country"
    options={countryOptions}
  />
  <MinimalistCheckbox 
    label="I agree to the terms"
    description="By checking this, you accept our privacy policy"
  />
</MinimalistFormGroup>
```

### Landing Page Components

#### MinimalistHero
Elegant hero sections with clean typography.

```tsx
<MinimalistHero
  title="Trade with Confidence"
  subtitle="RioPorto P2P"
  description="Experience the future of trading"
  primaryAction={{
    label: 'Get Started',
    onClick: handleGetStarted
  }}
/>
```

#### MinimalistFeatures
Clean feature showcases with line icons.

```tsx
<MinimalistFeatures
  title="Why Choose Us"
  features={features}
  variant="cards"
  columns={3}
/>
```

#### MinimalistTestimonials
Elegant testimonial displays.

```tsx
<MinimalistTestimonials
  title="What Users Say"
  testimonials={testimonials}
  variant="cards"
/>
```

#### MinimalistCTA
Clean call-to-action sections.

```tsx
<MinimalistCTA
  title="Ready to Start?"
  description="Join thousands of users"
  primaryAction={{
    label: 'Sign Up',
    onClick: handleSignUp
  }}
  variant="card"
/>
```

## Design Tokens

### Spacing Scale
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)
- `3xl`: 4rem (64px)

### Border Radius
- `sm`: 0.25rem
- `default`: 0.5rem
- `lg`: 0.75rem
- `xl`: 1rem

### Shadows
- `sm`: Subtle shadow for small elements
- `md`: Default shadow for cards
- `lg`: Enhanced shadow for elevated elements
- `xl`: Strong shadow for modals/overlays

### Animation
- **Duration Fast**: 150ms
- **Duration Normal**: 200ms (most common)
- **Duration Slow**: 300ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

## Usage Guidelines

### Do's
- Use generous whitespace between elements
- Stick to the defined color palette
- Use Inter font consistently
- Keep interactions subtle and smooth
- Focus on content hierarchy
- Use gold accent sparingly for emphasis

### Don'ts
- Don't overcrowd the interface
- Avoid bright, saturated colors
- Don't use multiple accent colors
- Avoid heavy animations or effects
- Don't compromise readability for style
- Avoid complex visual elements

## Dark Mode Support

The system includes automatic dark mode support with these overrides:
- Background becomes dark gray
- Text becomes light
- Surfaces use darker variants
- Gold accent remains consistent

## Integration

1. Import the theme CSS:
```css
@import '../styles/models/minimalist.css';
```

2. Apply the theme class:
```tsx
<body className="theme-minimalist">
```

3. Use components:
```tsx
import { MinimalistButton, MinimalistCard } from '@/components/models/minimalist';
```

## Performance

- CSS variables for dynamic theming
- Minimal CSS footprint
- Optimized font loading
- Efficient component structure
- Smooth 60fps animations

## Accessibility

- High contrast ratios (WCAG AA compliant)
- Focus indicators on all interactive elements
- Semantic HTML structure
- Screen reader friendly
- Keyboard navigation support

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

Supports all modern browsers with CSS custom properties and modern JavaScript features.