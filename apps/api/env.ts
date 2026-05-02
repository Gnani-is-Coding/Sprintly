import { config as loadEnv } from "dotenv";

let isLoaded = false;

export function loadEnvironment() {
  if (isLoaded) return;
  const currentEnv = process.env.NODE_ENV ?? "local";
  isLoaded = true;

  loadEnv({ path: `.env.${currentEnv}` });
}
