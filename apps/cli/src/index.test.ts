import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { createProgram } from './index';

describe('CLI Program', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('Program Configuration', () => {
    it('should create a program with correct name', () => {
      const program = createProgram();
      expect(program.name()).toBe('aliasvault');
    });

    it('should have correct version', () => {
      const program = createProgram();
      expect(program.version()).toBe('0.1.0');
    });

    it('should have correct description', () => {
      const program = createProgram();
      expect(program.description()).toBe('AliasVault CLI - Command-line interface for password and alias management');
    });

    it('should have login command registered', () => {
      const program = createProgram();
      const commands = program.commands;
      const loginCommand = commands.find(cmd => cmd.name() === 'login');
      expect(loginCommand).toBeDefined();
      expect(loginCommand?.description()).toBe('Login to AliasVault');
    });

    it('should have username option in login command', () => {
      const program = createProgram();
      const loginCommand = program.commands.find(cmd => cmd.name() === 'login');
      const usernameOption = loginCommand?.options.find(opt => opt.long === '--username');
      expect(usernameOption).toBeDefined();
      expect(usernameOption?.short).toBe('-u');
    });

    it('should have password option in login command', () => {
      const program = createProgram();
      const loginCommand = program.commands.find(cmd => cmd.name() === 'login');
      const passwordOption = loginCommand?.options.find(opt => opt.long === '--password');
      expect(passwordOption).toBeDefined();
      expect(passwordOption?.short).toBe('-p');
    });
  });

  describe('Command Execution', () => {
    it('should execute login command without options', async () => {
      const program = createProgram();
      await program.parseAsync(['node', 'aliasvault', 'login']);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.'
      );
    });

    it('should execute login command with username only', async () => {
      const program = createProgram();
      await program.parseAsync(['node', 'aliasvault', 'login', '-u', 'testuser']);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.'
      );
    });

    it('should execute login command with password only', async () => {
      const program = createProgram();
      await program.parseAsync(['node', 'aliasvault', 'login', '-p', 'testpass']);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Login command - Coming soon!\nThis command will authenticate you with the AliasVault API.'
      );
    });

    it('should execute login command with username and password options', async () => {
      const program = createProgram();
      await program.parseAsync(['node', 'aliasvault', 'login', '-u', 'testuser', '-p', 'testpass']);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Logging in as testuser...');
    });

    it('should execute login command with long option names', async () => {
      const program = createProgram();
      await program.parseAsync(['node', 'aliasvault', 'login', '--username', 'testuser', '--password', 'testpass']);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Logging in as testuser...');
    });

    it('should handle mixed short and long options', async () => {
      const program = createProgram();
      await program.parseAsync(['node', 'aliasvault', 'login', '-u', 'testuser', '--password', 'testpass']);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Logging in as testuser...');
    });
  });

  describe('Help and Version', () => {
    it('should handle --help flag', async () => {
      const program = createProgram();
      program.exitOverride(); // Prevent process.exit during tests
      
      try {
        await program.parseAsync(['node', 'aliasvault', '--help']);
      } catch (err: any) {
        // Commander throws when help is displayed
        expect(err.code).toBe('commander.helpDisplayed');
      }
    });

    it('should handle --version flag', async () => {
      const program = createProgram();
      program.exitOverride(); // Prevent process.exit during tests
      
      try {
        await program.parseAsync(['node', 'aliasvault', '--version']);
      } catch (err: any) {
        // Commander throws when version is displayed
        expect(err.code).toBe('commander.version');
      }
    });

    it('should handle -V flag for version', async () => {
      const program = createProgram();
      program.exitOverride(); // Prevent process.exit during tests
      
      try {
        await program.parseAsync(['node', 'aliasvault', '-V']);
      } catch (err: any) {
        // Commander throws when version is displayed
        expect(err.code).toBe('commander.version');
      }
    });

    it('should handle -h flag for help', async () => {
      const program = createProgram();
      program.exitOverride(); // Prevent process.exit during tests
      
      try {
        await program.parseAsync(['node', 'aliasvault', '-h']);
      } catch (err: any) {
        // Commander throws when help is displayed
        expect(err.code).toBe('commander.helpDisplayed');
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle unknown command', async () => {
      const program = createProgram();
      program.exitOverride(); // Prevent process.exit during tests
      
      try {
        await program.parseAsync(['node', 'aliasvault', 'unknown']);
      } catch (err: any) {
        // Commander throws for unknown commands
        expect(err.code).toBe('commander.unknownCommand');
      }
    });
  });

  describe('Multiple Invocations', () => {
    it('should handle multiple program creations', () => {
      const program1 = createProgram();
      const program2 = createProgram();
      
      expect(program1.name()).toBe('aliasvault');
      expect(program2.name()).toBe('aliasvault');
      expect(program1).not.toBe(program2); // Different instances
    });

    it('should handle sequential command executions', async () => {
      const program = createProgram();
      
      await program.parseAsync(['node', 'aliasvault', 'login', '-u', 'user1', '-p', 'pass1']);
      expect(consoleLogSpy).toHaveBeenCalledWith('Logging in as user1...');
      
      consoleLogSpy.mockClear();
      
      await program.parseAsync(['node', 'aliasvault', 'login', '-u', 'user2', '-p', 'pass2']);
      expect(consoleLogSpy).toHaveBeenCalledWith('Logging in as user2...');
    });
  });
});
