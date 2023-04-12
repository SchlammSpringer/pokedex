import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run dev',
    port: 4173
  },
  testDir: 'e2e-tests'
}

export default config
