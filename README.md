# Blood Donation Finder

A web application to connect blood donors with blood banks and manage blood donation requests.
## admin login 
sanjay
sanjay123
## Deployment Instructions

1. Sign up for a free account on [Render.com](https://render.com)

2. Create a new MongoDB database:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier)
   - Create a database user and password
   - Get your MongoDB connection string

3. Deploy the application on Render:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Fill in the following details:
     - Name: blood-donation-finder
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `node server.js`
   - Add environment variable:
     - Key: MONGODB_URI
     - Value: Your MongoDB connection string

4. After deployment, your application will be available at the URL provided by Render.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

3. Access the application at `http://localhost:3000`

## Features

- User registration and authentication
- Blood donor management
- Blood bank management
- Admin panel for user management
- Request tracking system
