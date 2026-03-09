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
});
