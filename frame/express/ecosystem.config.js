// [ecosystem.config.js](https://github.com/Unitech/pm2)
module.exports = {
  apps: [
    {
      name: 'my-app',           // 应用名称
      script: './app.js',       // 启动脚本路径
      instances: 'max',         // 实例数量，可以是数字或 'max'
      exec_mode: 'cluster',     // 启动模式，如 'cluster' 或 'fork'
      watch: true,              // 是否启用文件监控，自动重启
      max_memory_restart: '500M', // 最大内存限制，超出时重启
      env: {                    // 默认环境变量
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {         // 生产环境下的环境变量
        NODE_ENV: 'production',
        PORT: 8000,
      }
    },
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker']
    // }
  ],
  deploy : {
    production : {
      user : 'SSH_USERNAME', // SSH 用户名
      host : 'SSH_HOSTMACHINE', // 服务器地址
      ref  : 'origin/master', // Git 分支
      repo : 'GIT_REPOSITORY', // Git 仓库地址
      path : 'DESTINATION_PATH',// 远程服务器上项目路径
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production' // 部署后要执行的命令
    }
  }
}
