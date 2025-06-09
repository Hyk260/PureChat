import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'

const DEVELOPMENT_ENV_FILE = '.env.development.local';
const LOCAL_ENV_FILE = '.env.local';

const envFiles = [
  DEVELOPMENT_ENV_FILE,
  LOCAL_ENV_FILE,
  // '.env.development.local',
  // '.env.local'
];

// 定义不同环境的默认配置内容
const envConfig = {
  [DEVELOPMENT_ENV_FILE]: `
# openai api 代理 地址
VITE_OPENAI_PROXY_URL = 'https://api.you.com'

# openai api key
VITE_OPENAI_API_KEY = 'sk-XXX'
`,
  [LOCAL_ENV_FILE]: `
# IM sdk日志级别
VITE_LOG_LEVEL = '4'

# IM SDKAppID
VITE_IM_SDK_APPID = ''
`
};

// 遍历文件列表，依次创建或检查文件
envFiles.forEach((envFile) => {
  // 构建文件的完整路径
  const envPath = join(process.cwd(), envFile);

  if (!existsSync(envPath)) {
    try {
      // 根据文件名获取对应的配置内容
      const defaultEnvContent = envConfig[envFile];
      // 写入默认配置内容
      writeFileSync(envPath, defaultEnvContent.trim(), 'utf8');
      console.log(chalk.green(`✨ 成功创建 ${envFile} 文件`));
    } catch (error) {
      console.log(chalk.red(`\n✗ 创建 ${envFile} 文件失败。`));
      process.exit(1);
    }
  } else {
    console.log(chalk.green(`✓ ${envFile} 文件已创建`));
  }
});