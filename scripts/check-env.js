import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'

const envLocal = [
  // '.env.development.local',
  '.env.local',
]
// 用于写入.env.local配置文件，该文件默认会被git忽略，不会提交到远程仓库
const envPath = join(process.cwd(), envLocal[0])

if (!existsSync(envPath)) {
  const defaultEnvContent =
`
# IM SDKAppID
VITE_IM_SDK_APPID=
`
  try {
    writeFileSync(envPath, defaultEnvContent, 'utf8')
    console.log(chalk.green('✨ 成功创建.env.local文件'))
  } catch (error) {
    console.log(chalk.red('\n✗ 创建.env.local文件失败。'))
    process.exit(1)
  }
} else {
  console.log(chalk.green('✓ .env.local文件已创建'))
}
