import { describe, expect, it } from 'vitest';
import { ConfigService } from './config';

describe('ConfigService', () => {
  describe('getConfig', () => {
    it('should return default config when no config file exists', () => {
      const configService = new ConfigService();
      const config = configService.getConfig();
      
      expect(config).toHaveProperty('serverUrl');
      expect(typeof config.serverUrl).toBe('string');
    });
  });

  describe('getServerUrl', () => {
    it('should return a valid server URL', () => {
      const configService = new ConfigService();
      const serverUrl = configService.getServerUrl();
      
      expect(typeof serverUrl).toBe('string');
      expect(serverUrl.startsWith('http')).toBe(true);
    });

    it('should prioritize environment variable when set', () => {
      process.env.ALIASVAULT_SERVER_URL = 'https://env.example.com';
      
      const configService = new ConfigService();
      const serverUrl = configService.getServerUrl();
      
      expect(serverUrl).toBe('https://env.example.com');
      
      delete process.env.ALIASVAULT_SERVER_URL;
    });
  });
});
