import { z } from 'zod';
import { wrapToolJSONResult, formatHelixAdminURL, helixAdminRequest } from '../../common/utils.js';

const publishResourceTool = {
  name: 'publish-resource',
  config: {
    title: 'Publish Resource',
    description: `
    <use_case>
      Use this tool to publish a specific page or resource to the live environment in AEM Edge Delivery Services. 
      This operation takes content from preview and publishes it to the production/live site.
      
      **When to use this tool:**
      - You need to publish a page to make it live on production
      - You want to deploy content changes to the live environment
      - You're ready to make previewed content publicly available
      - You need to update an already published page with new content
      - You're publishing content after reviewing it in preview
      
      **When NOT to use this tool:**
      - You only want to preview content (use update-preview tool instead)
      - You want to check page status (use page-status tool instead)
      - You need to unpublish content (use unpublish tool instead)
      - You want to publish multiple pages at once (use bulk-publish tool instead)
    </use_case>

    <important_notes>
      1. The org, site, branch, and path must be provided, ask the user for them if they are not provided.
      2. The org, site, branch, and path can be derived from the aem page URL. This is of the form: https://\${branch}--\${site}--\${org}.aem.live/\${path}
      3. This operation publishes content to the LIVE production environment and makes it publicly accessible.
      4. Ensure content has been previewed and reviewed before publishing to live.
      5. Do not make up any information, only use the information that is provided in the response to answer the user's question.
      6. This is a write operation that modifies the live state of the page.
    </important_notes>
  `,
    inputSchema: {
      org: z.string().describe('The organization name'),
      site: z.string().describe('The site name'),
      branch: z.string().describe('The branch name').default('main'),
      path: z.string().describe('The path of the resource to publish'),
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  handler: async ({ org, site, branch, path }) => {
    const url = formatHelixAdminURL('live', org, site, branch, path);

    const response = await helixAdminRequest(url, {
      method: 'POST',
    });

    return wrapToolJSONResult(response);
  },
};

export default publishResourceTool;

