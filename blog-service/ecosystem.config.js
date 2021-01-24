module.exports = {
  apps: [
    {
      name: "app",
      script: "./bin/www",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      watch: true,
      error_file: "./logs/app-err.log", // 错误⽇志⽂件
      out_file: "./logs/app-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss", // 给每⾏⽇志标记⼀个时间
    },
    {
      script: "./bin/www",
      watch: true,
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "106.52.102.92",
      ref: "origin/master",
      repo: "git@github.com:Ctrl30/blog-vue-server.git",
      path: "/usr/local/myProject",
      "pre-deploy-local": "",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js NODE_ENV=production",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
