import { readFileSync } from "fs";
import "dotenv/config";

const jwtsecret = readFileSync(process.env.WEB_JWT_SECRET_FILE as string);

export { jwtsecret };