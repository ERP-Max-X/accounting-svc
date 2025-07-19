module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  coverageReporters: [
    'cobertura',
    'json',
    'lcov',
    [
      'text',
      {
        skipFull: true,
      },
    ],
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/**/*.entity.ts',
    '!src/**/*.tpl.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.mock.ts',
    '!src/main.ts',
    '!src/common/redoc.middleware.ts',
    '!src/config/**',
  ],
  coveragePathIgnorePatterns: [
    '/dist',
    '/test',
    '/prisma',
    '/coverage',
    '/node_modules/',
    '/*.module.ts',
    '/*.entity.ts',
    '/*.tpl.ts',
    '/*.dto.ts',
    '/*.mock.ts',
    'src/main.ts',
    'src/common/redoc.middleware.ts',
    'src/config/',
  ],
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
      },
    ],
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
