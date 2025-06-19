const { createTreeWithEmptyWorkspace } = require('@nx/devkit/testing');
const { cloudflareRouterAppGenerator } = require('./dist/generators/app/generator');

async function testPlugin() {
  console.log('🧪 Testing Cloudflare Router Nx Plugin...');
  
  try {
    // Create a mock tree
    const tree = createTreeWithEmptyWorkspace();
    
    // Test the generator
    const options = {
      name: 'test-app',
      style: 'tailwind',
      directory: 'apps'
    };
    
    console.log('📝 Running generator with options:', options);
    
    await cloudflareRouterAppGenerator(tree, options);
    
    console.log('✅ Generator executed successfully!');
    
    // List generated files
    const changes = tree.listChanges();
    console.log('📁 Generated files:');
    changes.forEach(change => {
      console.log(`  ${change.type}: ${change.path}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

testPlugin(); 