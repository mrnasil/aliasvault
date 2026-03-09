#!/usr/bin/env node

import { Command } from 'commander';
import { loginCommand } from './commands/login';

export function createProgram(): Command {
  const program = new Command();

  program
    .name('aliasvault')
    .version('0.1.0')
    .description('AliasVault CLI - Command-line interface for password and alias management');

  program
    .command('login')
    .description('Login to AliasVault')
    .option('-u, --username <username>', 'Username for login')
    .option('-p, --password <password>', 'Password for login')
    .action((options) => {
      const result = loginCommand(options);
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
