const { build } = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("live-server");
const handler = require("serve-handler");

(async () => {
  const builder = await build({
    bundle: true,
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    },
    entryPoints: ["src/dev.tsx"],
    incremental: true,
    minify: process.env.NODE_ENV === "production",
    outfile: "public/script.js",
    sourcemap: true,
  });
  chokidar
    .watch("src/**/*.{ts,tsx}", {
      interval: 0,
    })
    .on("all", () => {
      builder.rebuild();
    });
  liveServer.start({
    open: true,
    port: +process.env.PORT || 8080,
    root: "public/",
    file: "public/index.html",
    middleware: [
      function (req, res) {
        handler(req, res, {
          cleanUrls: true,
          public: "./public",
          rewrites: [{ source: "/promptable", destination: "/index.html" }],
        });
      },
    ],
  });
})();
