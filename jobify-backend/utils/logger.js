// utils/logger.js
// Pattern: Singleton + Strategy (can swap file/logger later)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logPath = path.join(__dirname, '../logs/error.log');

export const logError = (error) => {
  const time = new Date().toISOString();
  const message = `[${time}] ${error.statusCode || 500} - ${error.message}\n`;
  fs.appendFileSync(logPath, message);
  console.error(message); // still show in console for dev
};
