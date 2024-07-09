import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";

const USERDATA_DIR = path.resolve("./.tempUserDataDir");
const EXTENSION_PATH = path.resolve("./dist/chrome");

console.log("╭───── Starting Chrome ────────────────────────────────────────────────────────");
console.log(`│ Userdata      : ${USERDATA_DIR}`);
console.log(`│ Extension Path: ${EXTENSION_PATH}`);
console.log("╰──────────────────────────────────────────────────────────────────────────────");

ChromeLauncher.launch({
    chromeFlags: [
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-translate",
        "--disable-default-apps",
        "--disable-popup-blocking",
        "--disable-zero-browsers-open-for-tests",

        "--auto-open-devtools-for-tabs",
        `--user-data-dir=${USERDATA_DIR}`,
        `--load-extension=${EXTENSION_PATH}`,
    ],
    ignoreDefaultFlags: true,
});
