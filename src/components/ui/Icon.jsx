// Small hand-drawn icon set — kept in one file so the visual language (stroke
// width, corner style) stays consistent without pulling in an icon library.
const paths = {
  chart: 'M4 19V10 M10 19V5 M16 19v-7 M4 19h16',
  spark: 'M12 3v4 M12 17v4 M4.2 4.2l2.8 2.8 M17 17l2.8 2.8 M3 12h4 M17 12h4 M4.2 19.8L7 17 M17 7l2.8-2.8',
  layers: 'M12 3l9 5-9 5-9-5 9-5z M3 14l9 5 9-5 M3 8.5l9 5 9-5',
  motion: 'M4 12a8 8 0 1116 0 8 8 0 01-16 0z M12 8v4l3 2',
  server: 'M4 4h16v6H4V4z M4 14h16v6H4v-6z M7 7h.01 M7 17h.01',
  check: 'M20 6L9 17l-5-5',
  trend: 'M3 17l6-6 4 4 8-8 M15 6h6v6',
  compass: 'M12 21a9 9 0 100-18 9 9 0 000 18z M14.5 9.5L10 10l-.5 4.5L14 14l.5-4.5z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35',
  filter: 'M4 6h16 M7 12h10 M10 18h4',
  play: 'M8 5v14l11-7z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 3',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z',
  bell: 'M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9z M10 21a2 2 0 004 0',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6L6 18',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8z M4 21c0-4 4-6 8-6s8 2 8 6',
  lock: 'M6 11V8a6 6 0 1112 0v3 M4 11h16v10H4V11z',
  shield: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z',
  arrowRight: 'M5 12h14 M13 6l6 6-6 6',
  moon: 'M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z',
  sun: 'M12 4V2 M12 22v-2 M4 12H2 M22 12h-2 M5 5l-1.4-1.4 M19 19l-1.4-1.4 M5 19l-1.4 1.4 M19 5l-1.4 1.4 M12 17a5 5 0 100-10 5 5 0 000 10z',
  download: 'M12 3v12 M7 10l5 5 5-5 M4 21h16',
  upload: 'M12 21V9 M7 14l5-5 5 5 M4 3h16',
  message: 'M4 4h16v12H8l-4 4V4z',
  award: 'M12 15a6 6 0 100-12 6 6 0 000 12z M8.5 14L7 21l5-3 5 3-1.5-7',
}

export function Icon({ name, size = 20, className = '', strokeWidth = 1.75, ...rest }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d={d} />
    </svg>
  )
}
