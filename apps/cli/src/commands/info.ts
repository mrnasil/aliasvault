import os from 'node:os';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface InfoOptions {
  json?: boolean;
}

function getPackageJson() {
  try {
    // Try to read from the project root (when running from dist)
    const packagePath = join(process.cwd(), 'package.json');
    return JSON.parse(readFileSync(packagePath, 'utf-8'));
  } catch {
    // Fallback: return default values if package.json not found
    return {
      version: '0.1.0',
      name: '@aliasvault/cli',
      description: 'AliasVault CLI - Command-line interface for password and alias management',
    };
  }
}

export function infoCommand(options: InfoOptions = {}): string {
  const packageJson = getPackageJson();

  const info = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,
    system: {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      hostname: os.hostname(),
    },
    environment: {
      cwd: process.cwd(),
      home: os.homedir(),
    },
  };

  if (options.json) {
    return JSON.stringify(info, null, 2);
  }

  return `
AliasVault CLI Information
==========================

Version: ${info.version}
Name: ${info.name}
Description: ${info.description}

System Information:
  Platform: ${info.system.platform}
  Architecture: ${info.system.arch}
  Node Version: ${info.system.nodeVersion}
  Hostname: ${info.system.hostname}

Environment:
  Working Directory: ${info.environment.cwd}
  Home Directory: ${info.environment.home}
`.trim();
}
