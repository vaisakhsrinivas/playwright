#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema, TextContent } = require('@modelcontextprotocol/sdk/types.js');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create MCP server
const server = new Server({
  name: 'playwright-mcp',
  version: '1.0.0',
});

// Tool definitions
const tools = [
  {
    name: 'list_tests',
    description: 'List all Playwright tests in the project',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          description: 'Filter tests by name or path (optional)'
        }
      }
    }
  },
  {
    name: 'run_smoke_tests',
    description: 'Run smoke tests and return results',
    inputSchema: {
      type: 'object',
      properties: {
        headed: {
          type: 'boolean',
          description: 'Run tests in headed mode (with browser visible)'
        }
      }
    }
  },
  {
    name: 'get_test_data',
    description: 'Get test data from jobcompass_testdata.json',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'analyze_test_results',
    description: 'Analyze the latest test results and provide insights',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_test_coverage',
    description: 'Get information about test coverage and scope',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request;

  try {
    switch (name) {
      case 'list_tests':
        return await handleListTests(args?.filter);
      case 'run_smoke_tests':
        return await handleRunSmokeTests(args?.headed);
      case 'get_test_data':
        return await handleGetTestData();
      case 'analyze_test_results':
        return await handleAnalyzeResults();
      case 'get_test_coverage':
        return await handleGetTestCoverage();
      default:
        return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
    }
  } catch (error) {
    return { isError: true, content: [{ type: 'text', text: `Error: ${error.message}` }] };
  }
});

// Tool implementations
async function handleListTests(filter) {
  try {
    const testDir = './tests/smoketests';
    const files = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.js'));
    
    let tests = files.map(f => {
      const content = fs.readFileSync(path.join(testDir, f), 'utf-8');
      const testMatches = content.match(/test\(['"`]([^'"`]+)['"`]/g) || [];
      const testNames = testMatches.map(m => m.match(/['"`]([^'"`]+)['"`]/)[1]);
      return { file: f, tests: testNames };
    });

    if (filter) {
      tests = tests.map(t => ({
        ...t,
        tests: t.tests.filter(test => test.toLowerCase().includes(filter.toLowerCase()))
      })).filter(t => t.tests.length > 0);
    }

    const summary = tests.map(t => `${t.file}: ${t.tests.join(', ')}`).join('\n');
    return { content: [{ type: 'text', text: summary || 'No tests found' }] };
  } catch (error) {
    return { isError: true, content: [{ type: 'text', text: `Error listing tests: ${error.message}` }] };
  }
}

async function handleRunSmokeTests(headed) {
  try {
    const cmd = headed ? 'npm run smoke -- --headed' : 'npm run smoke';
    
    return new Promise((resolve) => {
      const proc = spawn(cmd, { shell: true, cwd: process.cwd() });
      let output = '';
      let errorOutput = '';

      proc.stdout?.on('data', (data) => {
        output += data.toString();
      });

      proc.stderr?.on('data', (data) => {
        errorOutput += data.toString();
      });

      proc.on('close', (code) => {
        const summary = code === 0
          ? `Tests passed (exit code: ${code})`
          : `Tests failed (exit code: ${code})`;
        
        const fullOutput = output + (errorOutput ? '\nErrors:\n' + errorOutput : '');
        resolve({
          content: [{
            type: 'text',
            text: `${summary}\n\nOutput:\n${fullOutput.slice(-500)}` // Last 500 chars
          }]
        });
      });
    });
  } catch (error) {
    return { isError: true, content: [{ type: 'text', text: `Error running tests: ${error.message}` }] };
  }
}

async function handleGetTestData() {
  try {
    const dataPath = './data/jobcompass_testdata.json';
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    const summary = {
      total_records: data.length,
      login_credentials: data[0] ? { email: data[0].email, url: data[0].url } : null,
      test_data_fields: Object.keys(data[0] || {}),
      sample_record: JSON.stringify(data[0], null, 2)
    };

    return { content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }] };
  } catch (error) {
    return { isError: true, content: [{ type: 'text', text: `Error reading test data: ${error.message}` }] };
  }
}

async function handleAnalyzeResults() {
  try {
    const reportPath = './playwright-report/index.html';
    
    if (!fs.existsSync(reportPath)) {
      return { content: [{ type: 'text', text: 'No test results found. Run tests first with: npm run smoke' }] };
    }

    const stats = {
      report_location: reportPath,
      view_command: 'npx playwright show-report',
      note: 'HTML report contains detailed test results, screenshots, and traces'
    };

    return { content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }] };
  } catch (error) {
    return { isError: true, content: [{ type: 'text', text: `Error analyzing results: ${error.message}` }] };
  }
}

async function handleGetTestCoverage() {
  try {
    const smokeDir = './tests/smoketests';
    const specFiles = fs.readdirSync(smokeDir).filter(f => f.endsWith('.spec.js'));
    const pagesDir = './pages/jobcompass';
    const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.js'));

    const coverage = {
      total_smoke_tests: specFiles.length,
      test_files: specFiles,
      page_objects: pageFiles,
      coverage_areas: [
        'Login & Authentication (smoketest.setup.js)',
        'Dashboard Navigation (dashboardpage.spec.js)',
        'Application Management (addapplication.spec.js)',
        'Logout Functionality (loginandlogoutjobcompasspage.spec.js)'
      ]
    };

    return { content: [{ type: 'text', text: JSON.stringify(coverage, null, 2) }] };
  } catch (error) {
    return { isError: true, content: [{ type: 'text', text: `Error getting coverage: ${error.message}` }] };
  }
}

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Playwright MCP server running on stdio');
}

main().catch(console.error);
