#!/bin/bash

# Helix MCP Server - Project Setup Script
# This script helps you configure the Helix MCP server in your project

set -e

echo "🚀 Helix MCP Server - Project Setup"
echo "===================================="
echo ""

# Check if we're in a project directory
if [ ! -d ".git" ] && [ ! -f "package.json" ]; then
    echo "⚠️  Warning: This doesn't look like a project root directory."
    echo "   It's recommended to run this from your project's root directory."
    read -p "   Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📝 This script will:"
echo "   1. Create a .cursor/mcp.json configuration file"
echo "   2. Set up environment variables"
echo "   3. Add .env to .gitignore (if needed)"
echo ""

# Ask for installation type
echo "How would you like to configure the MCP server?"
echo "  1) Use npx from GitHub (recommended - always up to date)"
echo "  2) Use local installation (for development)"
read -p "Choose (1 or 2): " install_type

if [ "$install_type" = "2" ]; then
    read -p "Enter absolute path to helix-mcp directory: " helix_path
    if [ ! -f "$helix_path/src/index.js" ]; then
        echo "❌ Error: Cannot find src/index.js in $helix_path"
        exit 1
    fi
    command_type="node"
    command_args="[\"$helix_path/src/index.js\"]"
else
    command_type="npx"
    command_args="[\"github:cloudadoption/helix-mcp\"]"
fi

# Ask for tokens
echo ""
echo "🔐 API Tokens Configuration"
echo "   You can either:"
echo "     1) Enter tokens now (stored in .env file)"
echo "     2) Set them as environment variables later"
read -p "Configure tokens now? (Y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Nn]$ ]]; then
    helix_token="\${HELIX_ADMIN_API_TOKEN}"
    rum_key="\${RUM_DOMAIN_KEY}"
    use_env_vars=true
else
    read -p "Enter your HELIX_ADMIN_API_TOKEN: " helix_token
    read -p "Enter your RUM_DOMAIN_KEY: " rum_key
    use_env_vars=false
fi

# Create .cursor directory if it doesn't exist
mkdir -p .cursor

# Create MCP configuration
echo ""
echo "📁 Creating .cursor/mcp.json..."

if [ "$use_env_vars" = true ]; then
    cat > .cursor/mcp.json << EOF
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "$command_type",
      "args": $command_args,
      "env": {
        "HELIX_ADMIN_API_TOKEN": "\${HELIX_ADMIN_API_TOKEN}",
        "RUM_DOMAIN_KEY": "\${RUM_DOMAIN_KEY}"
      }
    }
  }
}
EOF
else
    cat > .cursor/mcp.json << EOF
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "$command_type",
      "args": $command_args,
      "env": {
        "HELIX_ADMIN_API_TOKEN": "$helix_token",
        "RUM_DOMAIN_KEY": "$rum_key"
      }
    }
  }
}
EOF
fi

echo "✅ Created .cursor/mcp.json"

# Create .env file if tokens were provided
if [ "$use_env_vars" = true ]; then
    echo ""
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Helix MCP Server API Tokens
HELIX_ADMIN_API_TOKEN=your_token_here
RUM_DOMAIN_KEY=your_rum_domain_key
EOF
    echo "✅ Created .env file (please edit it to add your actual tokens)"
    
    # Add .env to .gitignore if it exists
    if [ -f ".gitignore" ]; then
        if ! grep -q "^\.env$" .gitignore; then
            echo "" >> .gitignore
            echo "# Environment variables" >> .gitignore
            echo ".env" >> .gitignore
            echo "✅ Added .env to .gitignore"
        fi
    else
        echo ".env" > .gitignore
        echo "✅ Created .gitignore with .env"
    fi
fi

# Create README for the project
echo ""
echo "📚 Creating HELIX_MCP_README.md..."
cat > HELIX_MCP_README.md << 'EOF'
# Helix MCP Server Configuration

This project is configured to use the Helix MCP Server, which provides tools for managing AEM Edge Delivery Services content.

## Available Tools

- **page-status** - Check page publishing and preview status
- **update-preview** - Refresh page preview with latest content
- **start-bulk-status** - Check status of multiple pages
- **check-bulk-status** - Get results of bulk status job
- **audit-log** - View audit logs for operations
- **rum-data** - Query Core Web Vitals and engagement metrics
- **aem-docs-search** - Search AEM documentation
- **block-list** - List available blocks
- **block-details** - Get block implementation details

## Usage in Cursor

Simply ask Claude to perform AEM operations:

- "Check the status of the homepage"
- "Update preview for /products/new-widget"
- "Show me audit logs for today"
- "What are the Core Web Vitals for my site?"

## Configuration Files

- `.cursor/mcp.json` - MCP server configuration
- `.env` - API tokens (keep this secret!)

## Getting API Tokens

1. **Helix Admin Token**: 
   - Visit https://admin.hlx.page/login
   - Login and capture the `auth_token` from cookies
   - Or follow: https://www.aem.live/docs/admin-apikeys

2. **RUM Domain Key**:
   - Contact your Adobe point of contact

## Environment Variables

```bash
export HELIX_ADMIN_API_TOKEN="your_token_here"
export RUM_DOMAIN_KEY="your_rum_domain_key"
```

## Troubleshooting

- **Tools not available**: Restart Cursor
- **Authentication errors**: Check your token in .env file
- **Server not found**: Ensure npx is installed

## Documentation

- Full Usage Guide: https://github.com/cloudadoption/helix-mcp/blob/main/USAGE.md
- AEM Docs: https://www.aem.live/docs
EOF

echo "✅ Created HELIX_MCP_README.md"

# Print completion message
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "  1. Restart Cursor to load the MCP server"

if [ "$use_env_vars" = true ]; then
    echo "  2. Edit .env file and add your actual API tokens"
    echo "  3. Make sure to set environment variables before starting Cursor:"
    echo "     export HELIX_ADMIN_API_TOKEN=\"your_token_here\""
    echo "     export RUM_DOMAIN_KEY=\"your_rum_domain_key\""
fi

echo "  4. Start chatting with Claude and use AEM tools!"
echo ""
echo "Examples:"
echo "  - 'Check the status of my homepage'"
echo "  - 'Update preview for /products'"
echo "  - 'Show me Core Web Vitals for my site'"
echo ""
echo "📖 See HELIX_MCP_README.md for more information"
echo ""


