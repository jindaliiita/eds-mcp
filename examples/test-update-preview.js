#!/usr/bin/env node

/**
 * Example script to test the update-preview tool
 * 
 * Usage:
 *   node examples/test-update-preview.js <org> <site> <path> [branch]
 * 
 * Example:
 *   node examples/test-update-preview.js myorg mysite /en/blog/article main
 */

import updatePreviewTool from '../src/operations/tools/update-preview.js';

async function testUpdatePreview() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: node test-update-preview.js <org> <site> <path> [branch]');
    console.error('Example: node test-update-preview.js myorg mysite /en/blog/article main');
    process.exit(1);
  }

  const [org, site, path, branch = 'main'] = args;

  console.log('Testing update-preview tool with parameters:');
  console.log(`  Organization: ${org}`);
  console.log(`  Site: ${site}`);
  console.log(`  Branch: ${branch}`);
  console.log(`  Path: ${path}`);
  console.log('\nCalling update-preview...\n');

  try {
    const result = await updatePreviewTool.handler({
      org,
      site,
      branch,
      path,
    });

    console.log('✅ Success! Response:');
    console.log(JSON.stringify(JSON.parse(result.content[0].text), null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testUpdatePreview();


