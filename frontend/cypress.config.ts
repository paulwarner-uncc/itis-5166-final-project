import { defineConfig } from 'cypress'
import * as eyesPlugin from "@applitools/eyes-cypress";

export default eyesPlugin.default(defineConfig({
  fixturesFolder: false,
  video: false,

  e2e: {
    'baseUrl': 'http://localhost:4200',
  }
}));
