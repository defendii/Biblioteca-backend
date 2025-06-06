import postgres from "postgres"
import "dotenv/config"

export const sql = postgres("postgresql://neondb_owner:npg_c72ZkbUVGoeq@ep-withered-dew-a4hq0ydi-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");
