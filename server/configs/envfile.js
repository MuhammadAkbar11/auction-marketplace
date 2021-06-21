let EnvFile = ".env";
if (process.argv[2] === "--dev") {
  EnvFile = ".env.dev";
} else if (process.argv[2] === "--dev-debug") {
  EnvFile = ".env.local";
}

export default EnvFile;
