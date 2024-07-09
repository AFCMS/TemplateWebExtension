import fs from "node:fs";
import path from "node:path";

import esbuild from "esbuild";
import JSONCleanerPlugin from "esbuild-plugin-json-cleaner";

type BuildTarget = "chrome" | "firefox";

async function build() {
    console.log(process.argv);

    // The target browser to build the extension for
    const buildTarget = process.argv[2] as BuildTarget | string | undefined;
    // const watch = process.argv.includes("--watch");

    const outputDir = path.resolve("./dist");
    const publicDir = path.resolve("./public");

    if (buildTarget !== "chrome" && buildTarget !== "firefox") {
        console.log("╭───── Building Extension ─────────────────────────────────────────────────────");
        console.log(`│ Error : Invalid build target "${buildTarget}"`);
        console.log("╰──────────────────────────────────────────────────────────────────────────────");
        process.exit(1);
    }

    const browserOutputDir = path.resolve(outputDir, buildTarget);

    const entryPoints = [
        path.resolve("src", "index.ts"),
        /*path.resolve("src", "popup", popupEntry)*/
    ];

    await esbuild.build({
        entryPoints: entryPoints,
        plugins: [
            JSONCleanerPlugin({
                src: "public/manifest.json",
                out: "manifest.json",
                minify: false,
                removeSchema: true,
                space: "\t",
            }),
        ],
        outdir: browserOutputDir,
        bundle: true,
        minify: true,
        format: "esm",
        loader: { ".svg": "dataurl" },
        define: { "window.IS_PRODUCTION": "true" },
    });
}

build().catch((err) => {
    console.log(err);
    process.exit(1);
});
