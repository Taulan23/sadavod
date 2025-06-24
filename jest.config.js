const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  watchman: false,
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'pages/**/*.{js,jsx}',
    'utils/**/*.{js,jsx}',
    'store/**/*.{js,jsx}',
    '!pages/_app.js',
    '!pages/_document.js',
    '!**/*.d.ts',
  ],
}

module.exports = createJestConfig(customJestConfig) 