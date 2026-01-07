# Tool Usage Examples

This directory contains example scripts for testing individual MCP tools.

## Update Preview Tool

### Direct Script Usage

Test the update-preview tool directly:

```bash
node examples/test-update-preview.js <org> <site> <path> [branch]
```

**Example:**
```bash
node examples/test-update-preview.js myorg mysite /en/blog/article main
```

## Publish Resource Tool

### Direct Script Usage

Test the publish-resource tool directly:

```bash
node examples/test-publish-resource.js <org> <site> <path> [branch]
```

**Example:**
```bash
node examples/test-publish-resource.js myorg mysite /en/blog/article main
```

**⚠️ WARNING:** This publishes content to the LIVE production environment!

### Environment Setup

Make sure you have the required environment variable set for authentication:

```bash
export HELIX_ADMIN_API_TOKEN="your-token-here"
```

### Via MCP Server

When using through the MCP server (e.g., in Cursor with Claude):

1. **Start your MCP server** (configured in your Cursor settings)

2. **Ask the AI to use the tool:**
   ```
   "Can you update the preview for the page at 
   https://main--mysite--myorg.aem.live/en/blog/article?"
   ```

3. **The AI will automatically:**
   - Parse the URL to extract org, site, branch, and path
   - Call the `update-preview` tool
   - Show you the results

### Example AI Interactions

**Example 1: Update homepage preview**
```
You: "Update the preview for my homepage"
AI: "I'll update the preview. What's your org and site name?"
You: "Org is acme, site is website"
AI: [Calls update-preview with org=acme, site=website, path=/]
```

**Example 2: Using AEM URL**
```
You: "Refresh preview for https://main--blog--adobe.aem.live/articles/welcome"
AI: [Automatically extracts: org=adobe, site=blog, branch=main, path=/articles/welcome]
     [Calls update-preview and shows results]
```

**Example 3: Publish to live**
```
You: "Publish the homepage to live"
AI: "I'll publish the homepage. What's your org and site?"
You: "Org is acme, site is website"
AI: [Calls publish-resource with org=acme, site=website, path=/]
```

**Example 4: Publish with URL**
```
You: "Publish https://main--blog--adobe.aem.live/articles/welcome to live"
AI: [Automatically extracts parameters and calls publish-resource]
     [Shows success response with live URL]
```

## API Response

The tool returns JSON with information about the preview update:

```json
{
  "webPath": "/en/blog/article",
  "resourcePath": "/en/blog/article.md",
  "preview": {
    "status": 200,
    "url": "https://main--mysite--myorg.aem.page/en/blog/article",
    "lastModified": "2025-01-07T10:30:00Z",
    "lastModifiedBy": "user@example.com",
    "contentBusId": "helix-content-bus/...",
    "permissions": ["read", "write"]
  }
}
```

## Troubleshooting

### Authentication Error
```
Error: Admin API error: 401 - Unauthorized
```
**Solution:** Set the `HELIX_ADMIN_API_TOKEN` environment variable

### 404 Not Found
```
Error: Admin API error: 404 - Not Found
```
**Solution:** Verify the org, site, branch, and path are correct

### 503 Rate Limited
```
Error: Admin API error: 503 - Rate limit reached
```
**Solution:** Wait a moment and try again. See [AEM limits](https://www.aem.live/docs/limits)


