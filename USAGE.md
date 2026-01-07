# Using Helix MCP Server in Other Projects

This guide explains how to use the Helix MCP server across different projects and applications.

## 📦 Installation Methods

### Method 1: Use via npx (Recommended for Quick Start)

You can use the MCP server directly from GitHub without installing it locally:

#### In Cursor AI Settings

```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "npx",
      "args": [
        "github:cloudadoption/helix-mcp"
      ],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "your_token_here",
        "RUM_DOMAIN_KEY": "your_rum_domain_key"
      }
    }
  }
}
```

### Method 2: Install from GitHub (For Development)

Clone and link the package locally:

```bash
# Clone the repository
git clone https://github.com/cloudadoption/helix-mcp.git
cd helix-mcp

# Install dependencies
npm install

# Link globally (optional)
npm link
```

Then in your project's MCP configuration:

```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "node",
      "args": [
        "/absolute/path/to/helix-mcp/src/index.js"
      ],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "your_token_here",
        "RUM_DOMAIN_KEY": "your_rum_domain_key"
      }
    }
  }
}
```

### Method 3: Install from npm (When Published)

Once published to npm:

```bash
npm install -g helix-mcp-server
```

Then in your MCP configuration:

```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "helix-mcp-server",
      "env": {
        "HELIX_ADMIN_API_TOKEN": "your_token_here",
        "RUM_DOMAIN_KEY": "your_rum_domain_key"
      }
    }
  }
}
```

## 🔧 Configuration per Project

### Option A: Global MCP Configuration (All Projects)

Configure once in Cursor's global settings:

1. Open Cursor Settings (`Cmd/Ctrl + ,`)
2. Go to `MCP` section
3. Add the server configuration globally
4. This makes it available in **all your projects**

**Location:**
- macOS: `~/Library/Application Support/Cursor/User/globalStorage/mcp/config.json`
- Windows: `%APPDATA%\Cursor\User\globalStorage\mcp\config.json`
- Linux: `~/.config/Cursor/User/globalStorage/mcp/config.json`

### Option B: Project-Specific Configuration

Create a `.cursor/mcp.json` file in each project:

```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "npx",
      "args": [
        "github:cloudadoption/helix-mcp"
      ],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "${HELIX_ADMIN_API_TOKEN}",
        "RUM_DOMAIN_KEY": "${RUM_DOMAIN_KEY}"
      }
    }
  }
}
```

Then set environment variables in your shell:

```bash
export HELIX_ADMIN_API_TOKEN="your_token_here"
export RUM_DOMAIN_KEY="your_rum_domain_key"
```

### Option C: Per-Project with Different Tokens

If different projects need different tokens:

**Project A: `.cursor/mcp.json`**
```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "npx",
      "args": ["github:cloudadoption/helix-mcp"],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "token_for_project_a",
        "RUM_DOMAIN_KEY": "domain_key_for_project_a"
      }
    }
  }
}
```

**Project B: `.cursor/mcp.json`**
```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "npx",
      "args": ["github:cloudadoption/helix-mcp"],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "token_for_project_b",
        "RUM_DOMAIN_KEY": "domain_key_for_project_b"
      }
    }
  }
}
```

## 🌐 Using with Different Editors/IDEs

### VS Code with GitHub Copilot

Add to your VS Code `settings.json`:

```json
{
  "mcp.servers": {
    "helix-mcp-server": {
      "command": "npx",
      "args": ["github:cloudadoption/helix-mcp"],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "your_token_here",
        "RUM_DOMAIN_KEY": "your_rum_domain_key"
      }
    }
  }
}
```

### Claude Desktop App

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "npx",
      "args": ["github:cloudadoption/helix-mcp"],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "your_token_here",
        "RUM_DOMAIN_KEY": "your_rum_domain_key"
      }
    }
  }
}
```

### Other MCP Clients

Any MCP-compatible client can use this server. The configuration pattern is similar:

```json
{
  "command": "npx",
  "args": ["github:cloudadoption/helix-mcp"],
  "env": {
    "HELIX_ADMIN_API_TOKEN": "your_token_here",
    "RUM_DOMAIN_KEY": "your_rum_domain_key"
  }
}
```

## 🔐 Managing API Tokens

### Method 1: Environment Variables (Recommended)

Set them in your shell profile (`~/.zshrc`, `~/.bashrc`, etc.):

```bash
export HELIX_ADMIN_API_TOKEN="your_token_here"
export RUM_DOMAIN_KEY="your_rum_domain_key"
```

Then reference them in your MCP config:

```json
{
  "env": {
    "HELIX_ADMIN_API_TOKEN": "${HELIX_ADMIN_API_TOKEN}",
    "RUM_DOMAIN_KEY": "${RUM_DOMAIN_KEY}"
  }
}
```

### Method 2: .env File (Per Project)

Create a `.env` file in your project root:

```env
HELIX_ADMIN_API_TOKEN=your_token_here
RUM_DOMAIN_KEY=your_rum_domain_key
```

**⚠️ Important:** Add `.env` to your `.gitignore`!

### Method 3: Secret Manager

For production or team usage, use a secret manager:
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault
- 1Password CLI

## 🚀 Quick Start for New Projects

1. **Navigate to your project directory**
   ```bash
   cd /path/to/your/project
   ```

2. **Create project-specific MCP config** (optional)
   ```bash
   mkdir -p .cursor
   cat > .cursor/mcp.json << 'EOF'
   {
     "mcpServers": {
       "helix-mcp-server": {
         "command": "npx",
         "args": ["github:cloudadoption/helix-mcp"],
         "env": {
           "HELIX_ADMIN_API_TOKEN": "${HELIX_ADMIN_API_TOKEN}",
           "RUM_DOMAIN_KEY": "${RUM_DOMAIN_KEY}"
         }
       }
     }
   }
   EOF
   ```

3. **Set your tokens**
   ```bash
   export HELIX_ADMIN_API_TOKEN="your_token_here"
   export RUM_DOMAIN_KEY="your_rum_domain_key"
   ```

4. **Restart Cursor**
   - The MCP server will be automatically available

5. **Start using the tools**
   - Ask Claude: "Can you check the status of my AEM page at https://main--mysite--myorg.aem.live/products?"

## 📝 Usage Examples

### Example 1: Web Development Project

Working on a website and need to manage AEM pages:

```
You: "Update the preview for /products/new-widget"
Claude: [Uses update-preview tool]

You: "Check if the homepage is published"
Claude: [Uses page-status tool]

You: "Show me the audit logs for today"
Claude: [Uses audit-log tool]
```

### Example 2: Content Management Project

Managing content across multiple sites:

```
You: "Get the status of all pages under /blog/"
Claude: [Uses start-bulk-status and check-bulk-status tools]

You: "Show me Core Web Vitals for the homepage"
Claude: [Uses rum-data tool]
```

### Example 3: Documentation Project

Building documentation sites:

```
You: "Search AEM docs for 'block collection'"
Claude: [Uses aem-docs-search tool]

You: "Show me the implementation for the hero block"
Claude: [Uses block-details tool]
```

## 🔍 Troubleshooting

### Server Not Found

**Error:** "MCP server helix-mcp-server not found"

**Solutions:**
1. Check the command path is correct
2. Ensure `npx` is installed (`npm install -g npx`)
3. Try using absolute path instead of `npx`
4. Restart Cursor/VS Code

### Authentication Errors

**Error:** "401 Unauthorized"

**Solutions:**
1. Verify your `HELIX_ADMIN_API_TOKEN` is set correctly
2. Check the token hasn't expired
3. Get a new token from [admin.hlx.page](https://admin.hlx.page/login)

### Tools Not Available

**Error:** "Tool not found"

**Solutions:**
1. Check the server started successfully
2. Look at MCP logs in Cursor's output panel
3. Try restarting Cursor
4. Verify the package is up to date

### Rate Limiting

**Error:** "429 Rate Limited"

**Solutions:**
1. Wait a moment before retrying
2. Review [AEM limits documentation](https://www.aem.live/docs/limits)
3. Batch operations when possible

## 📚 Additional Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io)
- [AEM Edge Delivery Services Docs](https://www.aem.live/docs)
- [Helix Admin API Documentation](https://www.aem.live/docs/admin.html)

## 🤝 Support

If you encounter issues:
1. Check this documentation
2. Review the [GitHub Issues](https://github.com/cloudadoption/helix-mcp/issues)
3. Create a new issue with details about your setup



