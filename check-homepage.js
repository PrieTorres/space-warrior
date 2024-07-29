import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!packageJson.homepage) {
  console.error('Error: The "homepage" key is missing in package.json');
  process.exit(1);
}
