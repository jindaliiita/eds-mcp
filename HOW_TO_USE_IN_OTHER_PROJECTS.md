# 📦 How to Use Helix MCP in Other Projects

This guide answers: **"I want to use this MCP server in my other project. How do I do it?"**

## 🎯 Three Simple Ways

```
┌─────────────────────────────────────────────────────────────┐
│                    Choose Your Method                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   GLOBAL     │  │ PER-PROJECT  │  │  LOCAL DEV   │      │
│  │              │  │              │  │              │      │
│  │ Setup once   │  │ Per project  │  │ For coding   │      │
│  │ Use anywhere │  │ Different    │  │ on MCP       │      │
│  │              │  │ tokens       │  │ itself       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│       ⭐Best for      💼Best for       🔧Best for          │
│    single users    team projects   contributors         │
└─────────────────────────────────────────────────────────────┘
```

---

## Method 1: Global Setup ⭐ RECOMMENDED

**When to use:** You work on multiple projects and want MCP available everywhere

### One-Time Setup (2 minutes):

1. **Open Cursor Settings**
   - `Cmd/Ctrl + ,` → Search for "MCP"

2. **Add Configuration:**
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

3. **Restart Cursor**

4. **✅ Done!** Now works in ALL your projects!

**Get tokens:**
- Visit: [admin.hlx.page/login](https://admin.hlx.page/login)
- Capture `auth_token` from browser cookie

---

## Method 2: Per-Project Setup 💼

**When to use:** Different projects need different API tokens

### Automated (30 seconds):

```bash
cd /path/to/your/project
curl -fsSL https://raw.githubusercontent.com/cloudadoption/helix-mcp/main/setup-project.sh | bash
```

### Manual (2 minutes):

```bash
# 1. Create project config directory
mkdir -p .cursor

# 2. Create MCP configuration
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

# 3. Create .env file
cat > .env << 'EOF'
HELIX_ADMIN_API_TOKEN=your_token_here
RUM_DOMAIN_KEY=your_rum_domain_key
EOF

# 4. Add .env to gitignore
echo ".env" >> .gitignore
```

**Project Structure:**
```
your-project/
├── .cursor/
│   └── mcp.json          ← MCP configuration (commit to git)
├── .env                  ← API tokens (DON'T commit!)
├── .gitignore           ← Should include .env
└── ... your project files
```

---

## Method 3: Local Development 🔧

**When to use:** You're contributing to or modifying the MCP server code

```bash
# 1. Clone the repository
git clone https://github.com/cloudadoption/helix-mcp.git
cd helix-mcp

# 2. Install dependencies
npm install

# 3. Get the absolute path
pwd
# Example output: /Users/you/repos/helix-mcp

# 4. Configure in Cursor (use absolute path)
{
  "mcpServers": {
    "helix-mcp-server": {
      "command": "node",
      "args": ["/Users/you/repos/helix-mcp/src/index.js"],
      "env": {
        "HELIX_ADMIN_API_TOKEN": "your_token_here",
        "RUM_DOMAIN_KEY": "your_rum_domain_key"
      }
    }
  }
}
```

---

## 🔄 Configuration Locations

### Global Configuration (Method 1)
```
📁 Cursor Settings → MCP section

Config stored at:
macOS:   ~/Library/Application Support/Cursor/User/globalStorage/mcp/config.json
Windows: %APPDATA%\Cursor\User\globalStorage\mcp\config.json
Linux:   ~/.config/Cursor/User/globalStorage/mcp/config.json
```

### Project Configuration (Method 2)
```
📁 Your Project Root
   └── .cursor/mcp.json
```

---

## 💡 Real-World Examples

### Example 1: Freelancer Working on Multiple Client Sites

**Use Method 1 (Global)** - Configure once with your credentials

```json
{
  "helix-mcp-server": {
    "command": "npx",
    "args": ["github:cloudadoption/helix-mcp"],
    "env": {
      "HELIX_ADMIN_API_TOKEN": "your_personal_token",
      "RUM_DOMAIN_KEY": "your_personal_key"
    }
  }
}
```

Now you can work on any client project:
- `/clients/acme-corp/` ✅ MCP available
- `/clients/globex/` ✅ MCP available
- `/personal/blog/` ✅ MCP available

### Example 2: Team with Multiple AEM Sites

**Use Method 2 (Per-Project)** - Different tokens per site

**Project A:** (Client Acme)
```bash
# /projects/acme-site/.env
HELIX_ADMIN_API_TOKEN=token_for_acme
RUM_DOMAIN_KEY=key_for_acme
```

**Project B:** (Client Globex)
```bash
# /projects/globex-site/.env
HELIX_ADMIN_API_TOKEN=token_for_globex
RUM_DOMAIN_KEY=key_for_globex
```

Both share `.cursor/mcp.json` (committed to git):
```json
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
```

### Example 3: Contributing to MCP Development

**Use Method 3 (Local Dev)**

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/helix-mcp.git
cd helix-mcp

# Make changes
vim src/operations/tools/my-new-tool.js

# Test immediately
node examples/test-my-tool.js

# Use in Cursor with local changes
# (configured with absolute path)
```

---

## ✅ Testing Your Setup

After configuration, restart Cursor and try:

```
You: "What AEM tools do you have access to?"

Claude: "I have access to these Helix MCP tools:
• page-status - Check page publishing status
• update-preview - Refresh page preview
• audit-log - View operation logs
• rum-data - Get Core Web Vitals
• aem-docs-search - Search AEM documentation
• block-list - List available blocks
• block-details - Get block implementations
..."
```

Or try a real command:
```
You: "Check the status of my page at 
     https://main--mysite--myorg.aem.live/products"

Claude: [Uses page-status tool and shows results]
```

---

## 🆘 Common Issues

### Issue: "MCP server not found"

**Solution:**
```bash
# Ensure npx is installed
npm install -g npx

# Restart Cursor completely
# (Cmd+Q on Mac, close all windows on Windows)
```

### Issue: "401 Unauthorized"

**Solution:**
1. Get fresh token from [admin.hlx.page](https://admin.hlx.page/login)
2. Update token in your configuration
3. Restart Cursor

### Issue: Tools work in one project but not another

**Diagnosis:**
- Global config: Works in all projects
- Per-project config: Only works in that project folder

**Solution:**
- Check if you have `.cursor/mcp.json` in your project
- Or use global configuration instead

---

## 🎓 Best Practices

### ✅ DO:
- Use environment variables for tokens
- Add `.env` to `.gitignore`
- Use global config for personal projects
- Use per-project config for teams
- Keep tokens secure

### ❌ DON'T:
- Commit tokens to git
- Share tokens in Slack/email
- Hardcode tokens in config files
- Use expired tokens

---

## 📊 Quick Comparison

| Feature | Global | Per-Project | Local Dev |
|---------|--------|-------------|-----------|
| **Setup time** | 2 min | 3 min | 5 min |
| **Works everywhere** | ✅ | ❌ | ❌ |
| **Per-project tokens** | ❌ | ✅ | ✅ |
| **Auto-updates** | ✅ | ✅ | ❌ |
| **Good for teams** | ❌ | ✅ | ❌ |
| **Development** | ❌ | ❌ | ✅ |
| **Complexity** | Simple | Medium | Advanced |

---

## 🚀 Next Steps

1. **Choose your method** (Global recommended for most users)
2. **Get API tokens** from [admin.hlx.page](https://admin.hlx.page/login)
3. **Configure** using instructions above
4. **Restart Cursor**
5. **Start using tools** - Just ask Claude!

**Need more details?**
- [QUICK_START.md](./QUICK_START.md) - Step-by-step guide
- [USAGE.md](./USAGE.md) - Comprehensive documentation
- [Examples](./examples/README.md) - Usage examples

**Have questions?** [Open an issue](https://github.com/cloudadoption/helix-mcp/issues)

---

## 🎉 You're Ready!

Now you can use the Helix MCP server in any project. Just:

1. Configure it (2 minutes)
2. Ask Claude to help with AEM tasks
3. Enjoy automated AEM operations!

**Example commands to try:**
```
"Check my homepage status"
"Update preview for /products"
"Show me audit logs from today"
"What are the Core Web Vitals for my site?"
"Search AEM docs for block collection"
```

Happy coding! 🚀


