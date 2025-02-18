import { ReactNode } from "react";

export interface ProtectedRoutesProps {
    children: ReactNode;
  }
export interface UserContextType {
    user: User | null;
    signin: (params: SignInParam) => Promise<void>;
    signout: () => Promise<void>;
  }

export interface User {
    email: string;
}

export interface SignInParam {
    email: string;
    password: string;
}