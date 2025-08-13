// Cookie utility functions
export const setCookie = (name: string, value: string, hours: number = 5) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (hours * 60 * 60 * 1000));
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Token-specific cookie functions
export const setAuthToken = (token: string) => {
  setCookie('authToken', token, 5);
};

export const getAuthToken = (): string | null => {
  return getCookie('authToken');
};

export const removeAuthToken = () => {
  removeCookie('authToken');
};
