#!/usr/bin/env node

/**
 * Example script to test the publish-resource tool
 * 
 * Usage:
 *   node examples/test-publish-resource.js <org> <site> <path> [branch]
 * 
 * Example:
 *   node examples/test-publish-resource.js myorg mysite /en/blog/article main
 */

import publishResourceTool from '../src/operations/tools/publish-resource.js';

async function testPublishResource() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: node test-publish-resource.js <org> <site> <path> [branch]');
    console.error('Example: node test-publish-resource.js myorg mysite /en/blog/article main');
    process.exit(1);
  }

  const [org, site, path, branch = 'main'] = args;

  console.log('Testing publish-resource tool with parameters:');
  console.log(`  Organization: ${org}`);
  console.log(`  Site: ${site}`);
  console.log(`  Branch: ${branch}`);
  console.log(`  Path: ${path}`);
  console.log('\n⚠️  WARNING: This will PUBLISH content to LIVE!\n');
  console.log('Calling publish-resource...\n');

  try {
    const result = await publishResourceTool.handler({
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

testPublishResource();

