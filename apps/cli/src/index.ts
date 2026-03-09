#!/usr/bin/env node

import { Command } from 'commander';
import { loginCommand } from './commands/login';
import { infoCommand } from './commands/info';
import { configCommand } from './commands/config';

export function createProgram(): Command {
  const program = new Command();

  program
    .name('aliasvault')
    .version('0.1.0')
    .description('AliasVault CLI - Command-line interface for password and alias management');

  // Login command
  program
    .command('login')
    .description('Login to AliasVault')
    .option('-u, --username <username>', 'Username for login')
    .option('-p, --password <password>', 'Password for login')
    .action((options) => {
      const result = loginCommand(options);
      console.log(result);
    });

  // Info command
  program
    .command('info')
    .description('Get information about AliasVault CLI')
    .option('--json', 'Output as JSON')
    .action((options) => {
      const result = infoCommand(options);
      console.log(result);
    });

  // Config command
  program
    .command('config')
    .description('Manage CLI configuration')
    .option('--list', 'List all configuration')
    .option('--get <key>', 'Get configuration value')
    .option('--set <key=value>', 'Set configuration value')
    .option('--reset', 'Reset configuration to defaults')
    .action((options) => {
      const result = configCommand(options);
      console.log(result);
    });

  return program;
}

/* c8 ignore start */
// Only run if this is the main module
if (require.main === module) {
  const program = createProgram();
  program.parse(process.argv);
}
/* c8 ignore stop */
