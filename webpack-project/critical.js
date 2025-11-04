const critical = require('critical');

critical.generate({
  base: 'dist/',              // Path to your built site
  src: 'index.html',          // Input HTML
  dest: 'index.html',         // Output (overwrite same file)
  inline: true,               // Inline the critical CSS
  minify: true,               // Keep it lightweight
  width: 1300,                // Desktop viewport
  height: 900,                // Height for fold
  extract: false,             // DO NOT REMOVE the rest of CSS
  ignore: {
    atrule: ['@font-face'],   // Keep fonts
    rule: [/::before/, /::after/], // Keep pseudo-elements
    decl: (node, value) => /gradient|background|color|transition/.test(value) // Keep color-related styles
  }
});