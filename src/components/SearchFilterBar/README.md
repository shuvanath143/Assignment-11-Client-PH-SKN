# SearchFilterBar Component

A modern, responsive search and filter bar component built with React and Tailwind CSS. Features a premium SaaS-style design with glassmorphism effects, smooth animations, and comprehensive filtering capabilities.

## Features

- **Modern Design**: Premium SaaS UI with glassmorphism effects
- **Responsive**: Horizontal layout on desktop, stacked on mobile
- **Dark Mode Compatible**: Seamless dark/light theme support
- **Debounced Search**: 300ms debounce for optimal performance
- **Multiple Filters**: Category, tone, date range, and sorting options
- **Accessibility**: ARIA-friendly with keyboard navigation
- **Smooth Animations**: Transition effects and hover states
- **Filter Count Badge**: Visual indicator for active filters
- **Sticky Positioning**: Stays visible while scrolling

## Usage

```jsx
import SearchFilterBar from './components/SearchFilterBar/SearchFilterBar';

const MyComponent = () => {
  const categories = ['Personal Growth', 'Career', 'Relationships'];
  const tones = ['Motivational', 'Sad', 'Realization'];

  const handleSearchChange = (searchTerm) => {
    console.log('Search:', searchTerm);
  };

  const handleFiltersChange = (filters) => {
    console.log('Filters:', filters);
  };

  return (
    <SearchFilterBar
      onSearchChange={handleSearchChange}
      onFiltersChange={handleFiltersChange}
      categories={categories}
      tones={tones}
      className="mb-8"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearchChange` | `function` | - | Callback fired when search term changes (debounced) |
| `onFiltersChange` | `function` | - | Callback fired when any filter changes |
| `categories` | `array` | `[]` | Array of category options |
| `tones` | `array` | `[]` | Array of tone/mood options |
| `className` | `string` | `""` | Additional CSS classes |

## Filter Object Structure

The `onFiltersChange` callback receives an object with the following structure:

```javascript
{
  category: '',      // Selected category or empty string
  tone: '',          // Selected tone or empty string
  dateRange: '',     // Selected date range or empty string
  sortBy: 'newest'   // Sort option: 'newest', 'oldest', 'popular', 'alphabetical'
}
```

## Styling

The component uses Tailwind CSS with custom CSS for enhanced effects:

- **Colors**: Indigo to violet gradient accent
- **Effects**: Glassmorphism with backdrop blur
- **Animations**: Smooth transitions (300ms duration)
- **Shadows**: Soft, layered shadows for depth

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- Focus management for dropdowns
- Semantic HTML structure

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Mobile-optimized touch interactions

## Dependencies

- React 18+
- @heroicons/react
- Tailwind CSS 3+