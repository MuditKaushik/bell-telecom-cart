import { type Config } from 'jest';
import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  verbose: true,
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "js", "tsx", "jsx", "node"],
  testRegex: "((\\.|/)(test|spec))\\.tsx?$"
};
export default config;