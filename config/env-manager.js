const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { execSync } = require('child_process');
const readline = require('readline');
const os = require('os');

const ENV_FILES = {
  development: '.env.development',
  local: '.env.local',
  production: '.env.production'
};

// Check which platform we're running on
const isWindows = os.platform() === 'win32';

/**
 * Load and parse environment configuration 
 */
function loadEnvConfig(envName) {
  const envPath = path.resolve(process.cwd(), ENV_FILES[envName]);
  
  if (!fs.existsSync(envPath)) {
    console.error(`Environment file ${envPath} does not exist`);
    return null;
  }

  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  return envConfig;
}

/**
 * Update package.json with the appropriate homepage URL 
 */
function updatePackageJson(homepageUrl) {
  const packagePath = path.resolve(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  packageJson.homepage = homepageUrl;
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated package.json homepage to: ${homepageUrl}`);
}

/**
 * Create the active .env file by copying the selected environment file 
 */
function createActiveEnvFile(envName) {
  const sourcePath = path.resolve(process.cwd(), ENV_FILES[envName]);
  const destPath = path.resolve(process.cwd(), '.env');
  
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Activated ${envName} environment`);
}

/**
 * Generate home_url_change.js based on the selected environment 
 */
function generateHomeUrlChangeJs(publicUrl) {
  const content = `//this is a auto gen. file, if want change homeurl, go to env config
const homepage_json = "${publicUrl}";
export const homepageUrl = homepage_json;`;
  
  const filePath = path.resolve(process.cwd(), 'src/home_url_change.js');
  fs.writeFileSync(filePath, content);
  console.log(`Generated home_url_change.js with publicUrl: ${publicUrl}`);
}

/**
 * Display a menu to select environment in CLI mode
 */
function showMenu() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('\nSelect environment:');
    console.log('1. Development (localhost)');
    console.log('2. Local Network');
    console.log('3. Production (GitHub Pages)');
    
    rl.question('Enter choice (1-3): ', (answer) => {
      rl.close();
      switch(answer) {
        case '1': resolve('development'); break;
        case '2': resolve('local'); break;
        case '3': resolve('production'); break;
        default: console.log('Invalid choice, using development'); resolve('development');
      }
    });
  });
}

/**
 * Setup the environment based on name or CLI selection
 */
async function setupEnvironment(envName) {
  if (!envName) {
    envName = await showMenu();
  }
  
  if (!Object.keys(ENV_FILES).includes(envName)) {
    console.error(`Invalid environment: ${envName}`);
    console.error(`Valid environments: ${Object.keys(ENV_FILES).join(', ')}`);
    process.exit(1);
  }
  
  const envConfig = loadEnvConfig(envName);
  if (!envConfig) process.exit(1);
  
  // Update package.json with the homepage
  updatePackageJson(envConfig.HOMEPAGE_URL);
  
  // Create active .env file
  createActiveEnvFile(envName);
  
  // Generate home_url_change.js
  generateHomeUrlChangeJs(envConfig.PUBLIC_URL);
  
  console.log(`\nSuccessfully configured for ${envName} environment`);
}

/**
 * Run a build or serve command with the appropriate environment
 */
function runCommand(command, env) {
  console.log(`\nRunning ${command} in ${env} environment...`);
  
  try {
    const prefix = isWindows ? 'set ' : '';
    const nodeEnvSetting = `${prefix}NODE_ENV=${env === 'production' ? 'production' : 'development'}`;
    
    // Execute the selected command
    switch(command) {
      case 'build':
        execSync(`${nodeEnvSetting} && npm run build`, { stdio: 'inherit' });
        break;
      case 'serve':
        execSync(`${nodeEnvSetting} && npm run serve`, { stdio: 'inherit' });
        break;
      case 'start':
        execSync(`${nodeEnvSetting} && npm run start`, { stdio: 'inherit' });
        break;
      default:
        console.error(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    process.exit(1);
  }
}

// Export functions for use in other scripts
module.exports = {
  setupEnvironment,
  runCommand,
  ENV_FILES,
};

// If script is run directly, parse command-line arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    setupEnvironment();
  } else if (args.length === 1) {
    setupEnvironment(args[0]);
  } else {
    const [command, env] = args;
    setupEnvironment(env).then(() => {
      runCommand(command, env);
    });
  }
}
