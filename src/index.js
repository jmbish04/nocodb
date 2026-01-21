import { Container } from "@cloudflare/containers";
import { DurableObject } from "cloudflare:workers";
import { Client } from "pg";

export class NocoDBContainer extends Container {
  defaultPort = 8080;
  sleepAfter = "10s";
}

export class NocoDBDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
  }
}

export default {
  async fetch(request, env, ctx) {
    const container = env.NOCODB_CONTAINER.getByName("main-instance");
    const response = await container.fetch(request);

    // Example Hyperdrive usage (external Postgres/MySQL required since disk is ephemeral)
    // const client = new Client({
    //   connectionString: env.HYPERDRIVE.connectionString,
    // });
    // try {
    //   await client.connect();
    //   await client.query("SELECT 1");
    // } finally {
    //   await client.end();
    // }

    return response;
  },
};
