import './FlowMitraLogo.css'

/**
 * FlowMitra Logo Component
 * Replaces Gumloop branding throughout the site
 */
function FlowMitraLogo({ size = 'md', variant = 'full', className = '' }) {
  const sizes = {
    sm: { width: 87.5, height: 20 },
    md: { width: 115.63, height: 28 },
    lg: { width: 198.22, height: 48 }
  }

  const dimensions = sizes[size] || sizes.md

  if (variant === 'icon') {
    // Just the "FM" icon part
    return (
      <svg
        viewBox="0 0 48 48"
        width={dimensions.height}
        height={dimensions.height}
        className={`flowmitra-logo-icon ${className}`}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <g>
          <path
            d="M24 2C12.4 2 3 11.4 3 23v7.5c0 11.6 9.4 21 21 21s21-9.4 21-21V23c0-11.6-9.4-21-21-21z"
            fill="currentColor"
          />
          <ellipse cx="18" cy="26" rx="3" ry="6.5" fill="var(--color-background)" />
          <ellipse cx="30" cy="26" rx="3" ry="6.5" fill="var(--color-background)" />
        </g>
      </svg>
    )
  }

  // Full logo with text
  return (
    <svg
      viewBox="0 0 200 48"
      width={dimensions.width}
      height={dimensions.height}
      className={`flowmitra-logo-full ${className}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        {/* Icon part */}
        <g>
          <path
            d="M24 8C15.2 8 8 15.2 8 24v4c0 8.8 7.2 16 16 16s16-7.2 16-16v-4c0-8.8-7.2-16-16-16z"
            fill="currentColor"
          />
          <ellipse cx="19" cy="26" rx="2.5" ry="5" fill="var(--color-background)" />
          <ellipse cx="29" cy="26" rx="2.5" ry="5" fill="var(--color-background)" />
        </g>

        {/* "FlowMitra" text */}
        <g transform="translate(52, 0)">
          <text
            x="0"
            y="32"
            fontFamily="var(--font-family)"
            fontSize="20"
            fontWeight="700"
            fill="currentColor"
            letterSpacing="-0.02em"
          >
            FlowMitra
          </text>
        </g>
      </g>
    </svg>
  )
}

export default FlowMitraLogo
