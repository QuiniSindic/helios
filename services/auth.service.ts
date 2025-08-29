import { BACKEND_URL } from '@/core/config';
import { LoginDTO, SignUpDTO, User } from '@/types/auth/auth.types';
import { IResponse } from '@/types/response.types';

export const getMe = async (): Promise<IResponse<User | null>> => {
  const response = await fetch(`${BACKEND_URL}/auth/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  // no loggeado
  if (response.status === 204) {
    return {
      ok: true,
      data: null,
    };
  }

  const data = await response.json().catch(() => ({}));

  if (!data.ok) {
    // no loggeado
    return {
      ok: true,
      data: null,
    };
  }

  return {
    ok: true,
    data: data.data,
  };
};

export const login = async ({
  email,
  password,
}: LoginDTO): Promise<IResponse<User>> => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!data.ok) {
    console.error('Error en la solicitud de login:', data.error);
    return {
      ok: false,
      error: data.error,
    };
  }

  const user = data.data;

  return {
    ok: true,
    data: user,
  };
};

export const signup = async ({
  email,
  password,
  username,
}: SignUpDTO): Promise<IResponse<User | null>> => {
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!data.ok) {
    console.error('Error en la solicitud de signup:', data.error);
    return {
      ok: false,
      error: data.error,
    };
  }

  return {
    ok: true,
    data: data.data,
  };
};

export const logout = async (): Promise<IResponse<null>> => {
  const response = await fetch(`${BACKEND_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!data.ok) {
    console.error('Error en la solicitud de logout:', data.error);
    return {
      ok: false,
      error: data.error,
    };
  }

  return {
    ok: true,
    data: null,
  };
};

export const handleGoogleAuth = () => {
  const url = `${BACKEND_URL}/auth/google/login`;
  window.location.href = url;
};
