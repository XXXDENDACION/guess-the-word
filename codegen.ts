import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:8080/graphql",
  documents: "graphql/**/*.tsx",
  generates: {
    "./graphql/gql/generated.ts": {
      plugins: [
          "typescript",
          "typescript-operations",
          "typescript-react-apollo"
      ]
    }
  }
};

export default config;
