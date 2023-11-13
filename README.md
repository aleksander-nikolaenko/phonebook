# MERN Stack Phonebook Application

Built with the MERN stack (MongoDB, Express, React and NodeJS).

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Client](#client)
  - [Server](#server)
  - [Database](#database)
- [Configuration and Setup](#configuration-and-setup)

## Introduction

This is a project that helped me learn the basics of web technology.This application is designed that save and look up the phone number and email of a previously saved contact.

## Key Features

- Save contact information
- Editing of information
- Deletion of information
- Add contacts to favorite
- Multiple user registration.
- Authentication using jsonwebtoken (jwt) and Google auth

## Technologies used

This project was created using the following technologies.

#### Client

- React JS
- Redux (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI & CSS Module (for User Interface)

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcrypt (for data encryption)
- Send Grid (for sending email)

#### Database

MongoDB (MongoDB Atlas)

#### API Documentation 

Swagger (OpenAPI 3.0) [API Documentation](https://phonebook-api-atj5.onrender.com/api-docs/)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)
- Add all information to .env files on client and server. As indicated in the example in the file .env-example.
- Install dependencies on the client and on the server with the command `npm install`
- Open client terminal and run command `npm run start` to start client.
- Open server terminal and run command `npm run start` to start server in production mode or `npm run start:dev` to start server in development mode.
