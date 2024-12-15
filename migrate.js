const postgres = require("postgres");

const { drizzle } = require("drizzle-orm/postgres-js");

const { migrate } = require("drizzle-orm/postgres-js/migrator");

require("dotenv").config();

// for migrations
const migrationClient = postgres(process.env.DATABASE_URL || "", {
  max: 1,
});

(async () => {
  await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
  console.log("Migration completed");
})();
