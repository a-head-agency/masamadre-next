const REQUIRED_ENVS = [
  "SESSION_COOKIE_NAME",
  "SESSION_COOKIE_SECRET",
  "SESSION_COOKIE_MAXAGE_SEC",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_URL",
  "NEXT_PUBLIC_YANDEX_MAPS_V3_API_KEY",
];

const missingEnvs = [];
for (const v of REQUIRED_ENVS) {
  if (!process.env[v]) {
    missingEnvs.push(v);
  }
}

if (missingEnvs.length > 0) {
  let report = "MISSING REQUIRED ENVIRONMENT VARIABLES:\n";
  for (const v of missingEnvs) {
    report += `\t${v}\n`;
  }
  console.error(report);
  process.exit(1);
}
