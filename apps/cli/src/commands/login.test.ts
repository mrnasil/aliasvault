import { describe, expect, it } from 'vitest';
import { loginCommand } from './login';

describe('loginCommand', () => {
  it('should return default message when no options provided', () => {
    const result = loginCommand();
    expect(result).toBe('Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.');
  });

  it('should return default message when only username provided', () => {
    const result = loginCommand({ username: 'testuser' });
    expect(result).toBe('Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.');
  });

  it('should return default message when only password provided', () => {
    const result = loginCommand({ password: 'testpass' });
    expect(result).toBe('Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.');
  });

  it('should return login message when both username and password provided', () => {
    const result = loginCommand({ username: 'testuser', password: 'testpass' });
    expect(result).toBe('Logging in as testuser...');
  });

  it('should handle empty string username', () => {
    const result = loginCommand({ username: '', password: 'testpass' });
    expect(result).toBe('Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.');
  });

  it('should handle empty string password', () => {
    const result = loginCommand({ username: 'testuser', password: '' });
    expect(result).toBe('Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.');
  });

  it('should handle empty object', () => {
    const result = loginCommand({});
    expect(result).toBe('Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.');
  });
});
