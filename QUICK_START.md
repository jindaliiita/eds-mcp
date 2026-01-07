# 🚀 Quick Start Guide

Choose the method that best fits your needs:

## Method 1: Global Configuration (Easiest - Works in ALL Projects)

Set it up once, use it everywhere!

### Steps:

1. **Open Cursor Settings**
   - Press `Cmd/Ctrl + ,`
   - Go to the "MCP" section

2. **Add this configuration:**
   ```json
   {
     "helix-mcp-server": {
       "command": "npx",
       "args": ["github:cloudadoption/helix-mcp"],
       "env": {
         "HELIX_ADMIN_API_TOKEN": "your_token_here",
         "RUM_DOMAIN_KEY": "your_rum_domain_key"
       }
     }
   }
   ```

3. **Restart Cursor**

4. **Done!** The MCP server is now available in all your projects.

**Get your tokens:**
- Helix Admin Token: [admin.hlx.page/login](https://admin.hlx.page/login) (capture `auth_token` from cookie)
- RUM Domain Key: Contact your Adobe point of contact

---

## Method 2: Per-Project Configuration (Most Flexible)

Configure different settings for each project:

### Automated Setup:

```bash
# In your project directory
cd /path/to/your/project

# Run the setup script
curl -fsSL https://raw.githubusercontent.com/cloudadoption/helix-mcp/main/setup-project.sh | bash
```

### Manual Setup:

```bash
# Create configuration directory
mkdir -p .cursor

# Create MCP config
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

# Create environment file
cat > .env << 'EOF'
HELIX_ADMIN_API_TOKEN=your_token_here
RUM_DOMAIN_KEY=your_rum_domain_key
EOF

# Add .env to gitignore
echo ".env" >> .gitignore
```

---

## Method 3: Local Development (For Contributors)

Working on the MCP server itself:

```bash
# Clone the repository
git clone https://github.com/cloudadoption/helix-mcp.git
cd helix-mcp

# Install dependencies
npm install

# Configure in Cursor with absolute path
{
  "helix-mcp-server": {
    "command": "node",
    "args": ["/absolute/path/to/helix-mcp/src/index.js"],
    "env": {
      "HELIX_ADMIN_API_TOKEN": "your_token_here",
      "RUM_DOMAIN_KEY": "your_rum_domain_key"
    }
  }
}
```

---

## ✅ Verify Installation

After setup, restart Cursor and try:

```
You: "Can you list the available AEM tools?"

Claude: "I have access to these AEM Edge Delivery tools:
- page-status - Check page status
- update-preview - Refresh page preview
- audit-log - View audit logs
- rum-data - Get Core Web Vitals
..."
```

---

## 🎯 First Commands to Try

### Check Page Status
```
"Check the status of https://main--mysite--myorg.aem.live/products"
```

### Update Preview
```
"Update the preview for /en/homepage"
```

### View Audit Logs
```
"Show me audit logs for mysite from the last 24 hours"
```

### Get Core Web Vitals
```
"What are the Core Web Vitals for my homepage?"
```

### Search AEM Docs
```
"Search AEM docs for 'block collection'"
```

---

## 🔧 Configuration Comparison

| Feature | Global | Per-Project | Local Dev |
|---------|--------|-------------|-----------|
| Setup Time | 2 min | 3 min | 5 min |
| Works in all projects | ✅ Yes | ❌ No | ❌ No |
| Different tokens per project | ❌ No | ✅ Yes | ✅ Yes |
| Good for team sharing | ❌ No | ✅ Yes | ❌ No |
| Auto-updates | ✅ Yes | ✅ Yes | ❌ No |
| Best for | Single user | Teams/Multiple sites | Contributors |

---

## 🆘 Troubleshooting

### "MCP server not found"
- Ensure `npx` is installed: `npm install -g npx`
- Restart Cursor completely
- Check that the configuration JSON is valid

### "401 Unauthorized"
- Verify your token is correct
- Get a fresh token from [admin.hlx.page](https://admin.hlx.page/login)
- Check token isn't expired

### "Tools not showing up"
- Wait 30 seconds after Cursor starts
- Try asking "What MCP tools are available?"
- Check Cursor's output panel for errors

### "429 Rate Limited"
- Wait a few seconds
- See [AEM rate limits](https://www.aem.live/docs/limits)

---

## 📚 Next Steps

- **Read Full Guide**: [USAGE.md](./USAGE.md) for advanced configuration
- **See Examples**: [examples/README.md](./examples/README.md) for usage examples
- **AEM Docs**: [www.aem.live/docs](https://www.aem.live/docs) for API details

---

## 💡 Pro Tips

1. **Use Environment Variables** - Keep tokens out of config files:
   ```bash
   export HELIX_ADMIN_API_TOKEN="..."
   export RUM_DOMAIN_KEY="..."
   ```

2. **Multiple Sites** - Use per-project config with different tokens

3. **Team Setup** - Share `.cursor/mcp.json` in git, keep `.env` local:
   ```bash
   # .gitignore
   .env
   ```

4. **Quick URL Parsing** - Just paste AEM URLs:
   ```
   "Check https://main--mysite--myorg.aem.live/page"
   ```
   Claude automatically extracts org, site, branch, and path!

---

**Need Help?** [Open an Issue](https://github.com/cloudadoption/helix-mcp/issues)



