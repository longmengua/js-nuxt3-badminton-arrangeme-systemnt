import type { Config } from '@jest/types'

// Jest 設定
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // 其他配置項目
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json' // 指定 Jest 使用的 tsconfig 文件
    }
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  testMatch: ["**/*.spec.(js|ts)"], // 支援 JS 和 TS 檔案
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Adjust <rootDir> if your files are not under src
  },
}

// 使用 CommonJS 語法導出設定
module.exports = config
