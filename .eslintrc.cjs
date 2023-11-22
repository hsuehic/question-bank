module.exports = {
  root: true,
  extends: ['cnp', 'cnp/typescript', 'cnp/jest'],
  overrides: [
    {
      files: '*.{ts,mts,cts,tsx}',
      parserOptions: {
        project: 'tsconfig.eslint.json',
      },
    },
  ],
};
