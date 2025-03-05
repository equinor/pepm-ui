import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://api-pepm-dev.radix.equinor.com/swagger/v1/swagger.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/api/generated',
  },
  plugins: [
    '@hey-api/client-axios',
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
});
