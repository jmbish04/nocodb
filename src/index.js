import { Container, getContainer } from "@cloudflare/containers";

export class NocoDBContainer extends Container {
  static defaultPort = 8080;
  static envVars = {
    // Provide an external database connection string, e.g. postgres://user:pass@host:port/db
    NC_DB: "",
  };
}

export default {
  async fetch(request, env, ctx) {
    const container = await getContainer("main-instance", env, {
      name: "NocoDBContainer",
    });
    return container.fetch(request);
  },
};
