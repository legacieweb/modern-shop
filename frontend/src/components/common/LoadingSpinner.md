# LoadingSpinner Component

A modern, customizable, and cool loading spinner component with multiple animation styles and effects.

## Features

- 🎨 **7 Unique Animation Styles** - Choose from spinner, pulse, dots, ring, dual-ring, wave, and heart
- 🌈 **6 Color Themes** - Primary, secondary, success, danger, warning, and purple
- 📏 **4 Size Options** - Small, medium, large, and extra large
- ✨ **Modern Effects** - Glow effects, smooth animations, and shimmer effects
- ♿ **Accessibility** - Dark mode support and proper ARIA labels
- 🎯 **Customizable** - Custom text, size, color, and style options

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'medium'` | Size of the spinner: `'small'`, `'medium'`, `'large'`, `'xlarge'` |
| `style` | `string` | `'spinner'` | Animation style: `'spinner'`, `'pulse'`, `'dots'`, `'ring'`, `'dual-ring'`, `'wave'`, `'heart'` |
| `color` | `string` | `'primary'` | Color theme: `'primary'`, `'secondary'`, `'success'`, `'danger'`, `'warning'`, `'purple'` |
| `className` | `string` | `''` | Additional CSS classes |
| `showText` | `boolean` | `true` | Whether to show loading text |
| `text` | `string` | `'Loading...'` | Custom loading text |

## Usage Examples

### Basic Usage
```jsx
import LoadingSpinner from '../components/common/LoadingSpinner';

// Simple spinner with default settings
<LoadingSpinner />
```

### Custom Style and Size
```jsx
// Large pulse spinner in success color
<LoadingSpinner 
  style="pulse" 
  size="large" 
  color="success" 
/>
```

### Loading Dots with Custom Text
```jsx
// Small loading dots with custom text
<LoadingSpinner 
  style="dots" 
  size="small" 
  text="Processing your order..." 
  showText={true} 
/>
```

### Without Text
```jsx
// Spinner without loading text
<LoadingSpinner 
  style="ring" 
  color="purple" 
  showText={false} 
/>
```

### Dual Ring Effect
```jsx
// Dual ring spinner for premium loading states
<LoadingSpinner 
  style="dual-ring" 
  size="large" 
  color="primary" 
/>
```

### Sound Wave Animation
```jsx
// Sound wave style for media-related loading
<LoadingSpinner 
  style="wave" 
  size="medium" 
  color="secondary" 
/>
```

### Heart Beat Animation
```jsx
// Heart beat for love/favorite related loading
<LoadingSpinner 
  style="heart" 
  size="large" 
/>
```

## Animation Styles

### 1. Enhanced Spinner (Default)
- Classic rotating spinner with shimmer effect
- Best for: General loading states

### 2. Pulse
- Expanding and contracting circle with glow
- Best for: Attention-grabbing loading states

### 3. Loading Dots
- Three bouncing dots in sequence
- Best for: Content loading, data fetching

### 4. Simple Ring
- Clean rotating ring
- Best for: Minimal loading states

### 5. Dual Ring
- Two rotating rings in opposite directions
- Best for: Premium or sophisticated loading states

### 6. Sound Wave
- Five bars that wave up and down
- Best for: Audio/video related loading

### 7. Heart Beat
- Pulsing heart icon
- Best for: Favorites, love, or appreciation loading

## Color Themes

- **Primary**: Blue theme
- **Secondary**: Gray theme
- **Success**: Green theme
- **Danger**: Red theme
- **Warning**: Yellow theme
- **Purple**: Purple theme

## Size Options

- **Small**: Compact size for inline loading
- **Medium**: Default size for most use cases
- **Large**: Prominent size for page-level loading
- **Extra Large**: Maximum size for hero sections

## Custom Styling

You can add custom CSS classes using the `className` prop:

```jsx
<LoadingSpinner 
  className="my-custom-class bg-gray-100 rounded-lg p-4"
  style="pulse"
  color="success"
/>
```

## Dark Mode Support

The component automatically supports dark mode with appropriate color adjustments:

```jsx
<div className="dark">
  <LoadingSpinner color="primary" />
</div>
```

## Best Practices

1. **Choose appropriate style**: Match the animation style to your use case
2. **Use meaningful text**: Provide context-specific loading messages
3. **Consider performance**: Different animations have different performance characteristics
4. **Accessibility**: Always provide meaningful loading text for screen readers
5. **Color consistency**: Use your brand colors consistently

## Performance Tips

- The `spinner`, `ring`, and `dots` styles are the most performant
- `pulse`, `wave`, and `heart` styles use more complex animations
- Consider using simpler styles for mobile devices
- All animations are optimized for 60fps

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Demo

Check out the `SpinnerDemo.js` component for an interactive demonstration of all available options and styles.

```jsx
import SpinnerDemo from '../components/common/SpinnerDemo';

// Add to your route
<Route path="/spinner-demo" element={<SpinnerDemo />} />