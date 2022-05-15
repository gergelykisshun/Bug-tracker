# Passport

## Story

The [ICFP](http://www.icfpconference.org/index.html) announced a competition in the subject of lowering personal contact by programming.
The competition's goal is to make programs/applications/software that help lowering the personal contact in the time of a global virus.

Teams can join the competition and you and your colleagues decided to try your-self out.
Your seniors got an idea to make an application where you don't need to give your ID card to anyone, you just need your phone where you can access all of your papers and can send your information via Bluetooth.
Your team is working on the application part, your only task is to make the authentication part work.
You have to make the endpoints in the server side for the authentication, you have to get the user in a session and you have to build a connection to a database.

## What are you going to learn?

- Using the Passport.js package for authentication
- Create backend authentication
- Using user sessions
- Using a database (lowdb)

## Tasks

1. We need a database to store the users. The database needs to contain the user's `ID card number`, `name` and `password`.
    - There is a database containing the columns `ID card number`, `name` and `passord`
    - When we get to the route "/users", the page writes out every registered users' name
    - When there are no users registered in the database, the page writes "No users in the system"

2. Registration is a need when we speak about authentication. The process will need a name, password and ID number that will be stored in a database.
    - There is a registration form in the route "/registration"
    - When we register successfuly, the webpage redirects to the login page
    - If the ID number is already in the database, it writes to the page "User already registered"

3. After logging in on the site, we need to get the user in a session. For the login process, the user needs to add his ID number and his password.
    - There is a login form in the route "/login"
    - When we log in successfuly, the page redirects to the profile page
    - If the ID or the password is incorrect, the page writes to the page "ID number or password is incorrect"

4. This page will contain the personal information about the user. This is not your work to implement, so you need to write out just the user name and ID.
    - If we try to access this page without authentication, it redirects to the login page
    - When we get to this page, our registered ID and name is displayed in the page
    - There is a logout button in the page that logs us out from the session and drops us to the login page

## General requirements

- The application is built with Express.js framework and within Passport.js with the google oauth middleware

## Hints

- Always store the users password hashed.
- Separate your files by functionality. Have one responsible for the endpoints, one for the authentication and one for the configurations.

## Background materials

- <i class="far fa-video"></i> [Usage of Passport.js via example](https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified)
- <i class="far fa-exclamation"></i> [Passport.js google oauth docs](http://www.passportjs.org/docs/google/)
- <i class="far fa-exclamation"></i> [Introduction to Lowdb](project/curriculum/materials/tutorials/introduction-to-lowdb.md)
- <i class="far fa-book-open"></i> [Detailed project example](https://stackabuse.com/adding-authentication-to-express-with-passport/)
