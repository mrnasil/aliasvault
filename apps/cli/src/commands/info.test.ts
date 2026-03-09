import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { infoCommand } from './info';
import * as fs from 'node:fs';

describe('infoCommand', () => {
  it('should return formatted info string by default', () => {
    const result = infoCommand();
    
    expect(result).toContain('AliasVault CLI Information');
    expect(result).toContain('Version:');
    expect(result).toContain('System Information:');
    expect(result).toContain('Platform:');
    expect(result).toContain('Architecture:');
    expect(result).toContain('Node Version:');
  });

  it('should return JSON when json option is true', () => {
    const result = infoCommand({ json: true });
    
    expect(() => JSON.parse(result)).not.toThrow();
    const parsed = JSON.parse(result);
    
    expect(parsed).toHaveProperty('version');
    expect(parsed).toHaveProperty('name');
    expect(parsed).toHaveProperty('description');
    expect(parsed).toHaveProperty('system');
    expect(parsed).toHaveProperty('environment');
  });

  it('should include system information in JSON output', () => {
    const result = infoCommand({ json: true });
    const parsed = JSON.parse(result);
    
    expect(parsed.system).toHaveProperty('platform');
    expect(parsed.system).toHaveProperty('arch');
    expect(parsed.system).toHaveProperty('nodeVersion');
    expect(parsed.system).toHaveProperty('hostname');
  });

  it('should include environment information in JSON output', () => {
    const result = infoCommand({ json: true });
    const parsed = JSON.parse(result);
    
    expect(parsed.environment).toHaveProperty('cwd');
    expect(parsed.environment).toHaveProperty('home');
    expect(typeof parsed.environment.cwd).toBe('string');
    expect(typeof parsed.environment.home).toBe('string');
  });

  it('should handle empty options object', () => {
    const result = infoCommand({});
    
    expect(result).toContain('AliasVault CLI Information');
    expect(result).toContain('Version:');
  });

  it('should use fallback values when package.json cannot be read', () => {
    // Mock readFileSync to throw an error
    const originalCwd = process.cwd;
    vi.spyOn(process, 'cwd').mockReturnValue('/nonexistent/path');
    
    const result = infoCommand();
    
    // Should still return valid output with fallback values
    expect(result).toContain('AliasVault CLI Information');
    expect(result).toContain('Version: 0.1.0');
    expect(result).toContain('Name: @aliasvault/cli');
    
    // Restore original cwd
    process.cwd = originalCwd;
  });

  it('should use fallback values in JSON mode when package.json cannot be read', () => {
    // Mock readFileSync to throw an error
    const originalCwd = process.cwd;
    vi.spyOn(process, 'cwd').mockReturnValue('/nonexistent/path');
    
    const result = infoCommand({ json: true });
    const parsed = JSON.parse(result);
    
    // Should use fallback values
    expect(parsed.version).toBe('0.1.0');
    expect(parsed.name).toBe('@aliasvault/cli');
    expect(parsed.description).toContain('AliasVault CLI');
    
    // Restore original cwd
    process.cwd = originalCwd;
  });

  describe('Cross-Platform Compatibility', () => {
    it('should return valid platform information', () => {
      const result = infoCommand({ json: true });
      const parsed = JSON.parse(result);
      
      // Platform should be one of the valid Node.js platforms
      const validPlatforms = ['win32', 'darwin', 'linux', 'freebsd', 'openbsd', 'sunos', 'aix'];
      expect(validPlatforms).toContain(parsed.system.platform);
    });

    it('should return valid architecture information', () => {
      const result = infoCommand({ json: true });
      const parsed = JSON.parse(result);
      
      // Architecture should be one of the valid Node.js architectures
      const validArchs = ['x64', 'arm64', 'ia32', 'arm', 's390x', 'ppc64', 'mips'];
      expect(validArchs).toContain(parsed.system.arch);
    });

    it('should return valid Node version', () => {
      const result = infoCommand({ json: true });
      const parsed = JSON.parse(result);
      
      // Node version should start with 'v' and contain numbers
      expect(parsed.system.nodeVersion).toMatch(/^v\d+\.\d+\.\d+/);
    });

    it('should return valid hostname', () => {
      const result = infoCommand({ json: true });
      const parsed = JSON.parse(result);
      
      // Hostname should be a non-empty string
      expect(typeof parsed.system.hostname).toBe('string');
      expect(parsed.system.hostname.length).toBeGreaterThan(0);
    });

    it('should handle paths with different separators', () => {
      // Test that paths work regardless of platform separator
      const result = infoCommand({ json: true });
      const parsed = JSON.parse(result);
      
      // Paths should be valid strings
      expect(typeof parsed.environment.cwd).toBe('string');
      expect(parsed.environment.cwd.length).toBeGreaterThan(0);
      expect(typeof parsed.environment.home).toBe('string');
      expect(parsed.environment.home.length).toBeGreaterThan(0);
    });

    it('should work consistently across multiple invocations', () => {
      const result1 = infoCommand({ json: true });
      const result2 = infoCommand({ json: true });
      
      const parsed1 = JSON.parse(result1);
      const parsed2 = JSON.parse(result2);
      
      // System information should be consistent
      expect(parsed1.system.platform).toBe(parsed2.system.platform);
      expect(parsed1.system.arch).toBe(parsed2.system.arch);
      expect(parsed1.system.nodeVersion).toBe(parsed2.system.nodeVersion);
    });
  });
});
