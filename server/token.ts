export const token = 'LETS-JUST-PRETEND-THIS-IS-A-SECURE-JWT';
export const generateToken = (username?: string) => username ? `${token}?username=${username}` : token;
