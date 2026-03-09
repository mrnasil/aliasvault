import { configService } from '../services/config';

export interface ConfigOptions {
  get?: string;
  set?: string;
  reset?: boolean;
  list?: boolean;
}

export function configCommand(options: ConfigOptions = {}): string {
  // Reset configuration
  if (options.reset) {
    configService.resetConfig();
    return 'Configuration reset to defaults.';
  }

  // List all configuration
  if (options.list) {
    const config = configService.getConfig();
    return `Current configuration:
  Server URL: ${config.serverUrl}

Environment variables:
  ALIASVAULT_SERVER_URL: ${process.env.ALIASVAULT_SERVER_URL || '(not set)'}

Active server URL: ${configService.getServerUrl()}`;
  }

  // Get specific configuration value
  if (options.get) {
    const config = configService.getConfig();
    const key = options.get as keyof typeof config;
    
    if (key in config) {
      return `${key}: ${config[key]}`;
    }
    
    return `Unknown configuration key: ${key}`;
  }

  // Set configuration value
  if (options.set) {
    const [key, ...valueParts] = options.set.split('=');
    const value = valueParts.join('='); // Rejoin in case URL contains '='
    
    if (!key || !value) {
      return 'Invalid format. Use: config --set key=value';
    }

    if (key === 'serverUrl') {
      configService.setConfig('serverUrl', value);
      return `Configuration updated: ${key} = ${value}`;
    }
    
    return `Unknown configuration key: ${key}`;
  }

  // Default: show current configuration
  const config = configService.getConfig();
  return `Current configuration:
  Server URL: ${config.serverUrl}

Use 'config --list' to see all configuration including environment variables.
Use 'config --set key=value' to update configuration.
Use 'config --reset' to reset to defaults.`;
}
