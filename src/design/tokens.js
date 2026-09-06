// JS mirror of the CSS custom properties defined in src/styles/theme.css.
// Kept in sync by hand — use for contexts CSS can't reach (canvas/chart fills, inline SVG).

export const colors = {
  ink: '#12151b',
  inkSoft: '#40424c',
  paper: '#fbf9f6',
  surface0: '#ffffff',
  surface1: '#f3efe9',
  surface2: '#e7e1d7',
  border: '#ddd6c8',
  accent: '#c7742b',
  accentStrong: '#a25c1e',
  accentSoft: '#f3e2cf',
  proof: '#2f6f5e',
  proofSoft: '#dceee8',
  success: '#2f7d4f',
  warning: '#b8862c',
  danger: '#b4402e',
  info: '#2f5f8a',
}

export const chartSeries = [colors.accent, colors.proof, colors.info, colors.warning, colors.inkSoft]
