import { z } from 'zod';
import { wrapToolJSONResult, formatHelixAdminURL, helixAdminRequest } from '../../common/utils.js';

const updatePreviewTool = {
  name: 'update-preview',
  config: {
    title: 'Update Preview',
    description: `
    <use_case>
      Use this tool to update/refresh the preview of a specific page in AEM Edge Delivery Services. This operation 
      pulls the latest content from the source (e.g., SharePoint, Google Docs) and updates the preview environment.
      
      **When to use this tool:**
      - You need to refresh the preview of a page with the latest content changes
      - You want to trigger a preview update for a specific page
      - You're testing content changes before publishing to live
      - You need to sync the preview with the latest source document
      - You're troubleshooting preview issues and want to force a refresh
      
      **When NOT to use this tool:**
      - You want to check the current status of a page (use page-status tool instead)
      - You want to publish content to live (use publish tools instead)
      - You only need to view preview information without updating it
    </use_case>

    <important_notes>
      1. The org, site, branch, and path must be provided, ask the user for them if they are not provided.
      2. The org, site, branch, and path can be derived from the aem page URL. This is of the form: https://\${branch}--\${site}--\${org}.aem.live/\${path}
      3. This operation will trigger a preview update and may take some time depending on the content source.
      4. Do not make up any information, only use the information that is provided in the response to answer the user's question.
      5. This is a write operation that modifies the preview state of the page.
    </important_notes>
  `,
    inputSchema: {
      org: z.string().describe('The organization name'),
      site: z.string().describe('The site name'),
      branch: z.string().describe('The branch name').default('main'),
      path: z.string().describe('The path of the page to update preview for'),
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  handler: async ({ org, site, branch, path }) => {
    const url = formatHelixAdminURL('preview', org, site, branch, path);

    const response = await helixAdminRequest(url, {
      method: 'POST',
    });

    return wrapToolJSONResult(response);
  },
};

export default updatePreviewTool;
