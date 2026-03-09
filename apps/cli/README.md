# AliasVault CLI

Command-line interface for AliasVault password and alias management.

## Features

- Login command for API authentication
- Info command for system diagnostics
- 100% test coverage with comprehensive test suite
- Cross-platform support (Windows, macOS, Linux)
- TypeScript implementation with full type safety
- Modern tooling with Vitest and Commander.js

## Installation

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Run in development mode
pnpm dev
```

## Usage

### Login Command

Authenticate with the AliasVault API:

```bash
# Basic login (coming soon)
aliasvault login

# Login with credentials
aliasvault login -u username -p password
aliasvault login --username username --password password
```

### Info Command

Display CLI and system information:

```bash
# Display formatted information
aliasvault info

# Output as JSON
aliasvault info --json
```

Example output:

```
AliasVault CLI Information
==========================

Version: 0.1.0
Name: @aliasvault/cli
Description: AliasVault CLI - Command-line interface for password and alias management

System Information:
  Platform: win32
  Architecture: x64
  Node Version: v20.11.0
  Hostname: DESKTOP-ABC123

Environment:
  Working Directory: C:\dev\aliasvault
  Home Directory: C:\Users\username
```

### Help

```bash
# Display help
aliasvault --help
aliasvault -h

# Display version
aliasvault --version
aliasvault -V

# Command-specific help
aliasvault login --help
aliasvault info --help
```

## Development

### Project Structure

```
apps/cli/
├── src/
│   ├── commands/          # Command implementations
│   │   ├── login.ts       # Login command
│   │   ├── login.test.ts  # Login tests
│   │   ├── info.ts        # Info command
│   │   └── info.test.ts   # Info tests
│   ├── index.ts           # CLI entry point
│   └── index.test.ts      # CLI integration tests
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
└── vitest.config.ts       # Test configuration
```

### Available Scripts

```bash
# Development
pnpm dev              # Run CLI in development mode

# Building
pnpm build            # Compile TypeScript to JavaScript

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage report
```

## Testing

The CLI has comprehensive test coverage with 43 tests covering:

- Command execution with various options
- Help and version flag handling
- Error handling for unknown commands
- Cross-platform compatibility
- JSON output formatting
- Fallback behavior

### Test Coverage

Current coverage: 100%

```
File          | % Stmts | % Branch | % Funcs | % Lines
--------------|---------|----------|---------|--------
All files     |     100 |      100 |     100 |     100
 src          |     100 |      100 |     100 |     100
  index.ts    |     100 |      100 |     100 |     100
 src/commands |     100 |      100 |     100 |     100
  info.ts     |     100 |      100 |     100 |     100
  login.ts    |     100 |      100 |     100 |     100
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (auto-rerun on changes)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## Cross-Platform Compatibility

The CLI is designed to work seamlessly across all major platforms.

### Supported Platforms

- Windows (win32)
- macOS (darwin)
- Linux (linux)
- FreeBSD (freebsd)
- OpenBSD (openbsd)
- Solaris (sunos)
- AIX (aix)

### Supported Architectures

- x64 (64-bit Intel/AMD)
- arm64 (64-bit ARM - Apple Silicon, ARM servers)
- ia32 (32-bit Intel/AMD)
- arm (32-bit ARM)
- s390x (IBM System z)
- ppc64 (PowerPC 64-bit)
- mips (MIPS architecture)

### Testing Cross-Platform Compatibility

The test suite includes specific tests to ensure cross-platform compatibility:

- Platform detection and validation
- Architecture detection and validation
- Node.js version format validation
- Path separator handling (Windows `\` vs Unix `/`)
- Hostname validation
- Consistent behavior across multiple invocations

## Technology Stack

- **Language**: TypeScript 5.9+
- **CLI Framework**: Commander.js 14.0+
- **Testing**: Vitest 3.2+
- **Coverage**: V8 Coverage Provider
- **Package Manager**: pnpm 10.18+
- **Node.js**: 20.11+ (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Ensure 100% coverage (`pnpm test:coverage`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Roadmap

### Current Version (0.1.0)

- Basic CLI structure
- Login command (placeholder)
- Info command
- 100% test coverage
- Cross-platform support

### Upcoming Features

- Full login implementation with API integration
- Logout command
- Password management commands
- Alias management commands
- Configuration file support
- Shell autocompletion
- Interactive prompts
- Colored output
- Progress indicators

## License

AGPL-3.0

## Support

For issues, questions, or contributions, please visit:
- GitHub: [https://github.com/mrnasil/aliasvault](https://github.com/mrnasil/aliasvault)
- Issues: [https://github.com/mrnasil/aliasvault/issues](https://github.com/mrnasil/aliasvault/issues)

---

This CLI is part of the AliasVault project. For more information about the full AliasVault ecosystem, see the main repository README.
