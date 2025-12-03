#!/usr/bin/env node

const os = require("node:os");
const { spawn } = require("node:child_process");

/**
 * Получить список локальных IPv4-адресов (без localhost).
 */
const getLocalIpv4Addresses = () => {
  const interfaces = os.networkInterfaces();

  return Object.values(interfaces)
    .flat()
    .filter(Boolean)
    .filter((net) => net.family === "IPv4" && !net.internal)
    .map((net) => net.address);
};

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

const localIps = getLocalIpv4Addresses();

if (localIps.length > 0) {
  console.log("\nДоступ по локальной сети:");
  localIps.forEach((ip) => {
    console.log(`  ➜  http://${ip}:${port}`);
  });
  console.log("");
} else {
  console.log("\nНе удалось найти внешний IPv4-адрес для локальной сети.\n");
}

const devProcess = spawn(
  "next",
  ["dev", "-H", host, "-p", String(port)],
  {
    stdio: "inherit",
    env: process.env,
  }
);

devProcess.on("exit", (code) => {
  process.exit(code ?? 0);
});


