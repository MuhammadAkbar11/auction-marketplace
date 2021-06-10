let EnvFile = ".env";
if (process.argv[2] === "--dev") {
  EnvFile = ".env.dev";
}

export default EnvFile;
