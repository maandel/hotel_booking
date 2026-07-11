---
name: Ethereal Sanctuary
colors:
  surface: '#fff8f4'
  surface-dim: '#e0d9d4'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ed'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e2'
  surface-container-highest: '#e8e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#424845'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#727875'
  outline-variant: '#c2c8c4'
  surface-tint: '#4e635a'
  primary: '#4e635a'
  on-primary: '#ffffff'
  primary-container: '#8da399'
  on-primary-container: '#263932'
  inverse-primary: '#b5ccc1'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#5f5e5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#a09e9a'
  on-tertiary-container: '#363632'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e8dd'
  primary-fixed-dim: '#b5ccc1'
  on-primary-fixed: '#0b1f18'
  on-primary-fixed-variant: '#374b43'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c9c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f4'
  on-background: '#1e1b19'
  surface-variant: '#e8e1dd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system is rooted in "Modern Serenity," a luxury aesthetic that prioritizes mental clarity and physical relaxation. It targets a discerning audience seeking an escape from digital noise, translating the tactile experience of a high-end spa into a digital interface.

The style is a refined blend of **Minimalism** and **Soft-Textured UI**. It utilizes expansive whitespace to represent "breathable room" and subtle, organic transitions to maintain a sense of calm. The interface avoids aggressive call-to-actions, opting instead for quiet confidence through precise alignment and premium typography. Visuals are driven by high-quality photography, where the UI acts as a sophisticated frame for serene environments.

## Colors
The palette is inspired by natural stone, morning mist, and artisanal ceramics.

- **Primary (Serene Sage):** Used sparingly for meaningful interaction points, selection states, and subtle accents to evoke a sense of healing and nature.
- **Secondary (Deep Charcoal):** Reserved for high-contrast typography and structural elements to ensure readability and a premium, grounded feel.
- **Tertiary (Warm Cream):** The foundational surface color. It replaces pure white to reduce eye strain and provide a warmer, more inviting atmosphere.
- **Neutral (Warm Stone):** Used for borders, secondary text, and iconography to maintain a soft hierarchy without introducing harsh lines.

Backgrounds should primarily use the Tertiary cream, with occasional sections of Charcoal for "dark mode" editorial moments within the light-themed experience.

## Typography
The typographic scale emphasizes the contrast between the elegant, high-contrast strokes of the serif and the functional clarity of the sans-serif.

- **Headlines:** Use Playfair Display for all editorial content and section headers. The italic variant should be used occasionally for emphasis or "soft" subheaders to add a poetic touch.
- **Body:** Manrope provides a balanced, contemporary feel that remains legible even at smaller scales. Its geometric but slightly softened terminals complement the overall aesthetic.
- **Labels:** Use uppercase Manrope with increased letter spacing for navigation, small labels, and overlines to create a sophisticated, architectural feel.

## Layout & Spacing
The layout follows a **Fixed Grid** approach for desktop to maintain an editorial, magazine-like feel, while transitioning to a fluid model for mobile.

- **Generous Gaps:** Section vertical spacing is intentionally large (120px+) to ensure the content never feels crowded.
- **Asymmetry:** Occasionally break the grid with images that bleed off the edge or overlapping elements to create a more organic, less "templated" appearance.
- **Responsive Behavior:** On mobile, margins tighten to 20px, and complex multi-column layouts stack into a single column, prioritizing vertical scroll rhythm and large, immersive imagery.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layers** and **Ambient Shadows**, avoiding heavy drop shadows that might feel dated or "heavy."

- **Surface Levels:** The base level is the Warm Cream. Elevated elements (like cards or modals) use a slightly lighter cream or pure white surface.
- **Shadows:** Shadows are extremely diffused (Blur: 40px+, Opacity: 4%) with a slight warm tint (#4A4540) to make elements feel as though they are gently floating on a bed of light.
- **Glassmorphism:** Use subtle backdrop blurs (12px) on navigation bars and overlays to maintain a sense of depth and context without obscuring the photography underneath.

## Shapes
The shape language is "Softly Geometric." Elements should feel intentional and structured but never sharp or aggressive.

- **Containers:** Cards and primary containers use a 0.5rem (8px) radius.
- **Interactive Elements:** Buttons and input fields use a consistent 0.5rem radius to maintain harmony.
- **Images:** Large hero images may feature a larger `rounded-xl` (24px) radius or even a soft organic mask (like a gentle arch) to reinforce the spa/sanctuary theme.

## Components
- **Buttons:** Primary buttons are solid Charcoal with White text. Secondary buttons are outlined with a 1px Sage or Stone border. Hover states should be a gentle fade rather than a color pop.
- **Input Fields:** Use a minimal bottom-border style or a very light-toned background with no heavy borders. Focus states use a subtle Sage underline.
- **Cards:** Cards should have no visible border. Use the ambient shadow and the Warm Cream background to define their shape.
- **Chips:** Used for spa treatments or amenities. These should be pill-shaped with a Tertiary background and Charcoal text.
- **Booking Bar:** A persistent, minimal bar at the bottom or top of the screen, utilizing a glassmorphism effect to stay present but unobtrusive.
- **Lists:** Use wide spacing between items with a very faint 0.5px horizontal divider in Warm Stone.