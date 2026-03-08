#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
  .name('aliasvault')
  .version('0.1.0')
  .description('AliasVault CLI - Command-line interface for password and alias management');

program
  .command('login')
  .description('Login to AliasVault')
  .action(() => {
    console.log('Login command - Coming soon!');
    console.log('This command will authenticate you with the AliasVault API.');
  });

program.parse(process.argv);
