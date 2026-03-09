import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';

export interface Config {
  serverUrl: string;
}

const DEFAULT_CONFIG: Config = {
  serverUrl: 'https://app.aliasvault.net',
};

export class ConfigService {
  private configPath: string;

  constructor() {
    const configDir = join(homedir(), '.aliasvault');
    this.configPath = join(configDir, 'config.json');
  }

  /**
   * Get the current configuration
   */
  getConfig(): Config {
    try {
      if (!existsSync(this.configPath)) {
        return { ...DEFAULT_CONFIG };
      }

      const content = readFileSync(this.configPath, 'utf-8');
      const config = JSON.parse(content);
      
      // Merge with defaults to ensure all keys exist
      return {
        ...DEFAULT_CONFIG,
        ...config,
      };
    } catch (error) {
      // If there's any error reading/parsing, return defaults
      return { ...DEFAULT_CONFIG };
    }
  }

  /**
   * Set a configuration value
   */
  setConfig(key: keyof Config, value: string): void {
    const config = this.getConfig();
    config[key] = value;
    this.saveConfig(config);
  }

  /**
   * Reset configuration to defaults
   */
  resetConfig(): void {
    this.saveConfig(DEFAULT_CONFIG);
  }

  /**
   * Get the server URL from config or environment variable
   */
  getServerUrl(): string {
    // Environment variable takes precedence
    if (process.env.ALIASVAULT_SERVER_URL) {
      return process.env.ALIASVAULT_SERVER_URL;
    }

    return this.getConfig().serverUrl;
  }

  /**
   * Save configuration to file
   */
  private saveConfig(config: Config): void {
    const configDir = dirname(this.configPath);
    
    // Ensure config directory exists
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }

    writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
  }
}

// Export singleton instance
export const configService = new ConfigService();
