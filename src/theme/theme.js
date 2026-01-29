export const COLORS = {
  primary: "#2FE0C2",
  primaryDark: "#00BFA5",
  primaryLight: "#4FE8D0",
  background: "#0A0A0A", // Deep black for premium feel
  backgroundSecondary: "#121212",
  surface: "#1A1A1A",
  surfaceLight: "#2A2A2A",
  surfaceElevated: "#333333",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  textDim: "#666666",
  textMuted: "#888888",
  accent: "#FFD600",
  accentDark: "#FFC107",
  danger: "#FF5252",
  success: "#00E676",
  warning: "#FF9800",
  border: "#333333",
  borderLight: "#404040",
  gradientStart: "#2FE0C2",
  gradientEnd: "#00BFA5",
  overlay: "rgba(0, 0, 0, 0.7)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const FONTS = {
  regular: "System",
  medium: "System",
  bold: "System",
  // Modern typography scale
  h1: { fontSize: 32, fontWeight: "800", letterSpacing: 0.5, lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: "700", letterSpacing: 0.3, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: "600", letterSpacing: 0.2, lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: "600", letterSpacing: 0.1, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
  bodyMedium: { fontSize: 16, fontWeight: "500", lineHeight: 24 },
  bodyBold: { fontSize: 16, fontWeight: "600", lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: "500", lineHeight: 16, color: COLORS.textSecondary },
  small: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  smallBold: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
};

export const FONT_OPTIONS = [
  { id: 'system', name: 'Modern', family: 'System' },
  { id: 'serif', name: 'Classic', family: 'serif' },
  { id: 'monospace', name: 'Code', family: 'monospace' },
];

export const SHADOWS = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: "#2FE0C2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  glowStrong: {
    shadowColor: "#2FE0C2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
  },
};

// Animation durations
export const ANIMATIONS = {
  fast: 150,
  normal: 250,
  slow: 400,
  verySlow: 600,
};

// Border radius
export const RADIUS = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  round: 9999,
};
