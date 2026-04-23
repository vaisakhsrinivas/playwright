# Playwright MCP Server

This directory contains a Model Context Protocol (MCP) server for Playwright test automation.

## Overview

The Playwright MCP server provides tools for AI-assisted test management, analysis, and execution. It enables Claude and other AI assistants to interact with your Playwright test suite.

## Installation

The MCP server is included in this project. Dependencies are already installed via:

```bash
npm install
```

## Usage

### Starting the MCP Server

```bash
npm run mcp
```

This starts the server on stdio, which can be connected to Claude or other MCP-compatible clients.

## Available Tools

### 1. `list_tests`
Lists all Playwright tests in the project with optional filtering.

**Parameters:**
- `filter` (optional): Filter tests by name or path

**Example:**
```
List all tests containing "Application"
```

### 2. `run_smoke_tests`
Executes the smoke tests and returns results.

**Parameters:**
- `headed` (optional, boolean): Run tests with visible browser

**Example:**
```
Run smoke tests in headed mode
```

### 3. `get_test_data`
Retrieves test data from `jobcompass_testdata.json`.

Returns:
- Total number of test records
- Login credentials structure
- Available data fields
- Sample record

### 4. `analyze_test_results`
Analyzes the latest test results and provides insights.

Returns:
- Location of HTML test report
- Command to view report
- Information about available metrics

### 5. `get_test_coverage`
Provides information about test coverage and scope.

Returns:
- Number of smoke tests
- Page objects available
- Coverage areas

## Integration with VS Code

To integrate with VS Code's Copilot:

1. Add this to your VS Code user settings (`.vscode/settings.json`):

```json
{
  "github.copilot.advanced": {
    "modelContextProtocol": {
      "playwright": {
        "command": "node",
        "args": ["${workspaceFolder}/mcp-server.js"]
      }
    }
  }
}
```

2. Restart VS Code

3. Ask Copilot questions like:
   - "What tests do we have?"
   - "Run the smoke tests"
   - "Show me the test data"
   - "Analyze recent test results"

## Architecture

- **mcp-server.js**: MCP server implementation with tool handlers
- **.mcp.json**: MCP client configuration
- **Tools**: Each tool wraps Playwright operations

## Test Structure

The server exposes tools for working with:
- **Smoke Tests**: `tests/smoketests/`
- **Page Objects**: `pages/jobcompass/`
- **Test Data**: `data/jobcompass_testdata.json`
- **Reports**: `playwright-report/`

## Future Enhancements

Potential additions:
- [ ] Auto-generate test cases from requirements
- [ ] Intelligent test failure analysis and fixes
- [ ] Test data generation and management
- [ ] Performance and flakiness detection
- [ ] Visual diff analysis for UI tests
- [ ] Test maintenance and refactoring suggestions

## Troubleshooting

**Server won't start:**
- Ensure `@modelcontextprotocol/sdk` is installed: `npm install`
- Check Node.js version compatibility: `node --version` (should be >= 18)

**Tools not responding:**
- Verify paths are correct from the project root
- Check file permissions on `.auth/` and data directories
- Review MCP server logs in the terminal

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/)
- [MCP SDK Reference](https://github.com/modelcontextprotocol/typescript-sdk)
