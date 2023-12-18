# Joe Juice Project

## Introduction
This school project is a web application modeled after Joe & The Juice. It's built using Node.js and Express and hosted on a DigitalOcean droplet. The application features user authentication, juice ordering, order management, and image uploads. Commit count is high due testing/implementation directly on the server.

## Key Features
- **User Authentication:** Secure login and registration system.
- **Integrated Database:** Products, user- and admin information is stored on MySQL.
- **In Cache Memory SM:** Client sessions are stored across server instances with Redis.
- **Juice Ordering:** Users can browse and order juices.
- **Order Management:** Admins can manage juice orders.
- **Image Upload to CDN:** Admins can upload images to Cloudinary.
- **Real-time Updates:** Socket.IO for real-time order status updates.
- **Automated Deployment:** GitHub webhook for auto-deployment on commits.
- **SMS Notifications:** Twilio integration for sending SMS updates.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express and
- **Database:** MySQL
- **Real-time Communication:** Socket.IO
- **SMS Service:** Twilio
- **Image Storage:** Cloudinary
- **Session Management:** Redis
- **Version Control:** Git
- **Hosting:** DigitalOcean
