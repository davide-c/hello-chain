module.exports = {
  reporters: ['default'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/|/test/)(spec|test|feature))\\.ts?$',
  moduleNameMapper: {},
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      isolatedModules: false,
    },
  },
};
