export interface LoginResInterface {
    token: string;
    activeID: string;
    ok: boolean;
    error?: string;
  }
  export interface RegResponseInterface {
    ok: boolean;
    alreadyExist: boolean;
    error?: string;
  }
  export interface LogoutResInterface {
    ok: boolean;
    error?: string;
  }