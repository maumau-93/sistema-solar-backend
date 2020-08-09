module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 70,
      statements: 80
    }
  },
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text', 'clover']
}