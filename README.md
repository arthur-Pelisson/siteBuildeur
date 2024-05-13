
  # Site buildeur
  A site buildeur for my owne utilisation  
  
  ## Tech Stack  
  **Client:** TypeScript, React, Next.js  
  **Admin:** TypeScript, React, Next.js  
  **Server:** Node, Express, mysql/Prisma, pm2,  

  
  ## Get Started 🚀  
  
  
  ## Run Locally  
  ~~~bash  
    git@github.com:arthur-Pelisson/siteBuildeur.git
  ~~~

  ### Client
  copie .env.example rename to .env.local  
  ~~~
  cd client
  npm install  
  npm run dev  
  ~~~
  localhost:3001

  ### Admin
  copie .env.example rename to .env.local  
  ~~~
  cd admin
  npm install  
  npm run dev  
  ~~~
  localhost:3002

  ### Server
  create a database mysql
  copie .env.example rename to .env.local and  fill it with your owne configuration database and secrets
  ~~~
  npm install
  npm run prisma:migrate:local
  npm run prisma:generate
  npm run start
  ~~~
  localhost:3000

  ## Run Production/Development
  ### ssh-keygen
  connect to our vps
  ~~~
  ssh-keygen
  ~~~
  Add it to your project github "Deploy Keys"
  ### Repository secrets
  
  secrets.USER_SSH  
  secrets.HOST_SSH  
  secrets.SSH_PRIVATE_KEY  

  ### Client
  Create env with example
  ~~~
  git clone git@github.com:user/project-name.git .
  git fetch
  git config core.sparsecheckout true
  echo "client/" >> .git/info/sparse-checkout
  git checkout "branche"
  git pull origin "branche"
  cd client
  npm run build
  ~~~

  ### Admin
  Create env with example
   ~~~
  git clone git@github.com:user/project-name.git .
  git fetch
  git config core.sparsecheckout true
  echo "admin/" >> .git/info/sparse-checkout
  git checkout "branche"
  git pull origin "branche"
  cd admin
  npm run build
  ~~~

  ### Server
  Create env with example  
  Create your database  
   ~~~
  git clone git@github.com:user/project-name.git .
  git fetch
  git config core.sparsecheckout true
  echo "server/" >> .git/info/sparse-checkout
  git checkout "branche"
  git pull origin "branche"
  cd server
  npm install
  npm run prisma:migrate:development
  npm run prisma:generate
  npx tsc
  pm2 start ecosystem.config.js --only server --env production
  ~~~
