import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
  },
  webServer: [
    {
      command: 'cmd /c "set SPRING_PROFILES_ACTIVE=e2e&& mvnw.cmd spring-boot:run"',
      cwd: '../BackendRepository',
      url: 'http://127.0.0.1:8080/v3/api-docs',
      reuseExistingServer: false,
      timeout: 120000,
    },
    {
      command: 'cmd /c "set VITE_API_BASE_URL=http://127.0.0.1:8080/api&& npm run dev -- --host 127.0.0.1 --port 4173"',
      cwd: '.',
      url: 'http://127.0.0.1:4173/home',
      reuseExistingServer: false,
      timeout: 120000,
    },
  ],
})
