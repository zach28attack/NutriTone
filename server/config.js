// Read secrets only from the server process environment.
function requiredEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) throw new Error(name + " must be configured");
  return value;
}

module.exports = {requiredEnv};
