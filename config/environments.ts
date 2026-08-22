export type Environment = 'dev' | 'qa' | 'stage';

export interface EnvironmentConfig {
  baseURL: string;
}

// All environments default to the public demo instance; override with BASE_URL for a real dev/qa/stage deployment.
const environments: Record<Environment, EnvironmentConfig> = {
  dev: { baseURL: process.env.BASE_URL ?? 'https://tutorialsninja.com/demo/' },
  qa: { baseURL: process.env.BASE_URL ?? 'https://tutorialsninja.com/demo/' },
  stage: { baseURL: process.env.BASE_URL ?? 'https://tutorialsninja.com/demo/' },
};

const currentEnv = (process.env.ENV as Environment) ?? 'dev';

export const environment: EnvironmentConfig = environments[currentEnv] ?? environments.dev;
