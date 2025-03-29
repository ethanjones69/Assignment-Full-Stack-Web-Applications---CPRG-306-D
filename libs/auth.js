export const validateUser = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Basic ")) return null;

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [email, password] = credentials.split(":");

  const users = {
    "admin@example.com": { password: "admin123", role: "ADMIN" },
    "user@example.com": { password: "user123", role: "USER" },
  };

  const user = users[email];
  if (user && user.password === password) {
    return { email, role: user.role };
  }

  return null;
};
