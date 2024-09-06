# Bookaroo

A full stack web app for connecting people to exchange or donate unwanted books.

## Overview

Welcome to the repository for Bookaroo, my revamping of an old book swapping project.
This project was undertaken as part of the Codecademy full stack engineering course and is a purely personal project with no commercial aims. 
The primary aim of this project is to practice building full stack applications and improve my skills. 

### Features

- User authorisation and authentication using JWT and protected routes.
- Create an account and edit your details.
- Set your reading preferences and receive a custom set of recommended books from the database based on your choices.
- Create unique listings for books using the Google Books API. Your listings can be deleted.
- Browse the database of listed books with an indication of how far the book's owner is from you.
- Like books in the database and view a colection of liked books based on your choices.
- Initiate contact with the owner of the book and send them a message.
- View messages from other users interested in your listings and send replies.
- Mark messages as read or unread or delete them as per your requirements.

### Tech Stack

React JS Frontend
React Router DOM
Axios
Formik
Yup
Styled Components
Hosted on Vercel

Node/Express Backend
Sequelize
Hosted on Heroku

Google Books API
Geocodify API

PostgreSQL database hosted on Supabase

### Using Bookaroo

The app is fully functional but only intended for demonstration purposes.
Simply create an account by providing a username, an email address, password and postcode.
The server will use the Geocodify API to determine your approximate location based on your postcode and will authenticate you using a web token.
I have created a number of fake users and made a lot of listings for each of them to create a sense of a user community for the app. 
I have incorporated the Google Books API to make the process of listing a book simple and easy. Just search for a book or author and choose from the results. Some further user input from you is required for a listing to be created.

Please feel free to have a go with Bookaroo and do get in touch if you would like to know more, thanks for checking out this repository.