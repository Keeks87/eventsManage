# Event Management App

## Description.

This is a full- stack web application that allows users to create and manage events. Users can register for events, view event details, and manage events. The application is built using the MERN stack (MongoDB, Express, React, and Node.js).

## Installation instructions

1. Clone the repository to your local machine using the following command:

      [Link to Repository](https://github.com/Keeks87/eventsManage)

2. Open a terminal and navigate to the project directory by running

   `cd event_manage`.

3. Install the dependencies for the back-end by running the following command:

   npm install

4. Open another terminal and navigate to the project client folder by running

   `cd eventsManage`
   `cd client`.

5. Install the dependencies for the front-end by running the following command:

   npm install

6. Update the MongoDB string in the index.js file:

7. Start the back-end server by running the following command in the project's root `eventsManage` directory:

   npm start

8. Start the front-end server by navigating to the `client` directory and running the following command:

   npm start

9. Open your web browser and access the application at `http://localhost:3000`.

## How to use the application

1. Register for an account by clicking on the "Sign up" link in the navigation bar. Fill out all fields with valid information (email, password, user type). Click on the "Sign up" button to submit the form.

2. Login to your account by clicking on the "User Login" or "Admin Login" links in the navigation bar. Enter your email and password and click on the "Login" button. (If you are admin you will be redirected to the manage events page, if you are a user you will be redirected to the find events page)

## Security Measures

To ensure the security of this app, the following measures have been taken:

- The application uses authentication and authorization mechanisms to control access to specific routes and features.
- Passwords are hashed before storing them in the database to protect user credentials.

## Third-Party APIs

The Event Management App utilizes the following third-party APIs:

- MongoDB Atlas: A cloud-hosted MongoDB database. MongoDB Atlas allows you to host and manage your data in the cloud.
- React Router: A collection of navigational components that compose declaratively with your applicat ion, letting you compose complex UIs from simple units of UI.

## Deployment

The application has been deployed as a full-stack application. The back-end and the front-end is deployed on a cloud hosting platform Render.

- [Link to Deployed App](https://eventsmanage-front.onrender.com/)
