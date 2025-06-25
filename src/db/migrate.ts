import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "src/db/migrations" });
        console.log("Migration successful");
    } catch (error) {
        console.error("Migration failed");
        console.error(error);
        process.exit(1);
    }
};

main();