import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  const plugins: PluginOption[] = [react()];

  // Only load Replit plugins when running in a Replit environment
  if (process.env.REPL_ID !== undefined) {
    try {
      const { default: runtimeErrorOverlay } = await import(
        "@replit/vite-plugin-runtime-error-modal"
      );
      plugins.push(runtimeErrorOverlay());

      if (process.env.NODE_ENV !== "production") {
        const { cartographer } = await import(
          "@replit/vite-plugin-cartographer"
        );
        plugins.push(cartographer());

        const { devBanner } = await import("@replit/vite-plugin-dev-banner");
        plugins.push(devBanner());
      }
    } catch {
      // Replit plugins not available — skip silently
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
