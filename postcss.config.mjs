const config = {
  plugins: {
    "@tailwindcss/postcss": {
      safelist: [
        {
          pattern: /from-(red|yellow|blue|green|pink|purple|amber|sky|cyan|teal|emerald|indigo)-(400|500|600)/,
        },
        {
          pattern: /via-(red|yellow|blue|green|pink|purple|amber|sky|cyan|teal|emerald|indigo)-(400|500|600)/,
        },
        {
          pattern: /to-(red|yellow|blue|green|pink|purple|amber|sky|cyan|teal|emerald|indigo)-(400|500|600)/,
        },
      ],
    },
  },
};

export default config;