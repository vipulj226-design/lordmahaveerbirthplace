/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.04em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '700' }],
                xl: ['1.25rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '700' }],
                '2xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
                '3xl': ['1.875rem', { lineHeight: '1.1', letterSpacing: '0.06em', fontWeight: '900' }],
                '4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '0.07em', fontWeight: '900' }],
                '5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '0.08em', fontWeight: '900' }],
                '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '0.09em', fontWeight: '900' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "cinzel",
                paragraph: "open sans"
            },
            colors: {
                cream: '#FDF6EC',
                maroon: '#6B0F1A',
                gold: '#C5A55A',
                gold2: '#D4AF37',
                destructive: '#ff0000',
                'destructive-foreground': '#FFFFFF',
                background: '#FDF6EC',
                secondary: '#C5A55A',
                foreground: '#000000',
                'secondary-foreground': '#000000',
                'primary-foreground': '#FDF6EC',
                primary: '#6B0F1A'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
