🧩 1️⃣ FRONTEND — Angular (Netlify)
📁 Folder
frontend/
└── naveen-portfolio/

⚙️ Setup & Run Locally
1. Install dependencies
npm install

2. Start development server
ng serve


👉 Opens at: http://localhost:4200

🏗️ Production Build
1. Build Angular for production
ng build --configuration production

2. Output folder

Default:

dist/naveen-portfolio/browser/

🌐 Netlify Deployment
1. Create _redirects file for Angular routing

Create this file inside src/ folder (so it persists after each build):

src/_redirects

/*    /index.html   200

2. Rebuild
ng build --configuration production


Verify that _redirects is present inside:

dist/naveen-portfolio/browser/_redirects

3. Deploy on Netlify

Log in to Netlify

Click Add new site → Import an existing project

Connect your GitHub repo

Set build settings:

Build command: npm run build

Publish directory: dist/naveen-portfolio/browser

Deploy 🚀

🌍 Environment Configuration
src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};

src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: 'http://naveenlingala.eu-north-1.elasticbeanstalk.com/'
};
