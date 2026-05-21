"use client";

const usersKey = "skillsphere_local_users";
const sessionKey = "skillsphere_local_session";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(usersKey) || "[]");
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(usersKey, JSON.stringify(users));
};

const toPublicUser = (user) => ({
  name: user.name,
  email: user.email,
  image: user.image || ""
});

export function getLocalSession() {
  try {
    const session = JSON.parse(localStorage.getItem(sessionKey) || "null");
    if (!session?.email) return null;

    const users = readUsers();
    const user = users.find((item) => item.email === session.email);
    return user ? toPublicUser(user) : null;
  } catch {
    return null;
  }
}

export function registerLocalUser({ name, email, image, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  users.push({
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    image: image.trim(),
    password
  });
  writeUsers(users);
}

export function loginLocalUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const user = users.find(
    (item) => item.email === normalizedEmail && item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  localStorage.setItem(sessionKey, JSON.stringify({ email: user.email }));
  return toPublicUser(user);
}

export function updateLocalUser({ name, image }) {
  const session = getLocalSession();
  if (!session?.email) {
    throw new Error("No local session found.");
  }

  const users = readUsers();
  const nextUsers = users.map((user) =>
    user.email === session.email
      ? { ...user, name: name.trim(), image: image.trim() }
      : user
  );
  writeUsers(nextUsers);

  return getLocalSession();
}

export function clearLocalSession() {
  localStorage.removeItem(sessionKey);
}
