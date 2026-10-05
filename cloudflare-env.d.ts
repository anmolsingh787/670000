declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    KV?: KVNamespace;
    BUCKET?: R2Bucket;
  }
}
