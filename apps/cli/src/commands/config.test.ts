import { describe, expect, it } from 'vitest';
import { configCommand } from './config';

describe('configCommand', () => {
  describe('basic functionality', () => {
    it('should return configuration information', () => {
      const result = configCommand();
      
      expect(result).toContain('Current configuration:');
      expect(result).toContain('Server URL:');
    });

    it('should handle --list option', () => {
      const result = configCommand({ list: true });
      
      expect(result).toContain('Current configuration:');
      expect(result).toContain('Environment variables:');
      expect(result).toContain('Active server URL:');
    });

    it('should handle --get option', () => {
      const result = configCommand({ get: 'serverUrl' });
      
      expect(result).toContain('serverUrl:');
    });

    it('should handle --reset option', () => {
      const result = configCommand({ reset: true });
      
      expect(result).toBe('Configuration reset to defaults.');
    });

    it('should handle invalid --set format', () => {
      const result = configCommand({ set: 'invalid' });
      
      expect(result).toBe('Invalid format. Use: config --set key=value');
    });

    it('should handle unknown configuration key in --get', () => {
      const result = configCommand({ get: 'unknownKey' });
      
      expect(result).toBe('Unknown configuration key: unknownKey');
    });
  });
});
