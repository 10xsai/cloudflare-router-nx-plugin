const { Tree } = require('@nx/devkit');
const { createTreeWithEmptyWorkspace } = require('@nx/devkit/testing');
const { cloudflareRouterAppGenerator } = require('./dist/generators/app/generator');
const fs = require('fs');
const path = require('path');

async function testPluginWithRealFiles() {
  console.log('🧪 Testing Cloudflare Router Nx Plugin with real files...');
  
  try {
    const workspaceRoot = path.join(__dirname, 'test-workspace');
    
    // Create a virtual tree first
    const tree = createTreeWithEmptyWorkspace();
    
    // Test the generator
    const options = {
      name: 'my-cloudflare-app',
      style: 'tailwind',
      directory: 'apps'
    };
    
    console.log('📝 Running generator with options:', options);
    console.log('🗂️  Will create files in:', workspaceRoot);
    
    await cloudflareRouterAppGenerator(tree, options);
    
    console.log('✅ Generator executed successfully!');
    
    // Get all the changes and write them to the test-workspace
    const changes = tree.listChanges();
    console.log('📁 Writing files to disk:');
    
    // Create the apps directory if it doesn't exist
    const appsDir = path.join(workspaceRoot, 'apps', 'my-cloudflare-app');
    
    for (const change of changes) {
      if (change.type === 'CREATE') {
        const fullPath = path.join(workspaceRoot, change.path);
        const dir = path.dirname(fullPath);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write the file
        if (change.content) {
          fs.writeFileSync(fullPath, change.content);
          console.log(`  ✅ Created: ${change.path}`);
        }
      }
    }
    
    console.log(`📂 Check the ${appsDir} directory for the generated files`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

testPluginWithRealFiles(); 