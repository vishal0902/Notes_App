/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
          "./public/**/*.{html,js}",
        ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Montserrat','Oswald'],
      'body': ['"Open Sans"'],
      'custom' : ['Copperplate Gothic Bold']
    }
  },
  plugins: [],
}

