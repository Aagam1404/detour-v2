const STORAGE_KEY = "detour.accounts";

export type Account = {
  name: string;
  username: string;
  password: string;
};

export function readAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (account): account is Account =>
        account &&
        typeof account.name === "string" &&
        typeof account.username === "string" &&
        typeof account.password === "string",
    );
  } catch {
    return [];
  }
}

export function writeAccounts(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}
