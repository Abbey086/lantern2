/* Tailwind (CDN) theme extensions — PromoVault-inspired design system */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans','ui-sans-serif','system-ui','sans-serif'],
        serif: ['Newsreader','Georgia','serif']
      },
      colors: {
        ink: '#0A0A0A',
        surface: '#F6F6F6',
        field: '#EBEBEB',
        line: '#E8E8E8',
        muted: '#7B7B7B',
        coral: '#FF4B3E',
        ac: 'var(--ac)',
        acsoft: 'var(--ac-soft)',
        acdeep: 'var(--ac-deep)'
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        fadeup: { from: { opacity:'0', transform:'translateY(12px)' }, to: { opacity:'1', transform:'none' } },
        pop:    { from: { opacity:'0', transform:'translateY(-10px)' }, to: { opacity:'1', transform:'none' } }
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        fadeup: 'fadeup .4s ease both',
        pop: 'pop .35s ease both'
      }
    }
  }
}
