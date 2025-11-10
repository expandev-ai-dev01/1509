/**
 * @types AuthContextTypes
 * @summary Type definitions for authentication context
 * @domain core
 * @category authentication
 */

export interface User {
  id: string;
  email: string;
  name: string;
  permissions?: string[];
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}
