# SCB10x-fullstack-Test

                  
### Table of content

  
  - [Frontend](#frontend)
    - [Stack used](#stack-used)
    - [How to run](#how-to-run)
  - [Backend](#backend--database) 
    - [Stack used](#stack-used-1)
    - [APIs](#apis)
    - [Database Schemas](#database-schemas)
    - [How to run](#how-to-run-1)
  - [Demo](#demo)
    - [Home Page](#home-page)
    - [Register Page](#register-page)
    - [Login Page](#login-page)
    - [Create Page](#create-page)
    - [Single Party Page](#single-party-page)
    - [Responsive Design](#responsive-design)
  - [Possible Improvements](#possible-improvements)
# Frontend:
### Stack used 
  - Framework : Next.js + Typescript
  - Styling: Tailwind CSS
  - Stage Management: Redux
  - Libraries : Axios
  

### How to run

`npm install`
 
 `npm run dev`
 
   or
   
 `yarn install`
 
 `yarn dev`

  
  
# Backend + Database
### Stack used 
  - Framework : Nest.js+ Typescript + Mongoose
  - Database: MongoDB
  - Containerized: Docker
 
### APIs
  #### Auth
  
  - User register:  
  
  `POST https//localhost:3333/api/v1/auth/register`
  
  - User login: 
  
  `POST https//localhost:3333/api/v1/auth/login`
  
  - Verify JWT token: 
  
  `POST https//localhost:3333/api/v1/auth/verify-token`
  
  #### User
  
  - Get user by id: 
  
  `GET https//localhost:3333/api/v1/user/:id`  
  
  - Get user by email: 
  
  `GET https//localhost:3333/api/v1/user/email/:email`  
  
  #### Party
  
  - Get all party: 
  
  `GET https//localhost:3333/api/v1/party`  
  
  - Get party by id: 
  
  `GET https//localhost:3333/api/v1/party/:id`
  
  - Get party by name: 
  
  `GET https//localhost:3333/api/v1/party/name/:name`  
  
  - Create party: 
  
  `POST https//localhost:3333/api/v1/party` 
  
  - Add member to party: 
  
  `PATCH https//localhost:3333/api/v1/party` 
  
  - Delete party: 
  
  `DELETE https//localhost:3333/api/v1/party` 
  
  
### Database Schemas

User

| _id            | email     | password   |
| -------------- | --------- | ---------- |
| ObjectId       | string    | string     |


Party
| _id            | name     | owner | limit  | description| members |
| -------------- | -------- | ----- | -----  | ---------  | ------- |
| ObjectId       | string   | User   |number | string     | User[]  |

### How to run

To spin up container

 `npm install`
 
 `docker-compose up -d `
 
   or
   
 `yarn install`
 
 `docker-compose up -d `

To take down container

  `docker-compose down`

# Demo

### Home Page
![Screen Shot 2565-07-21 at 18 00 16](https://user-images.githubusercontent.com/54467698/180205334-bac205de-1884-4668-9a5c-75b090758544.png)
### Login Page
![Screen Shot 2565-07-21 at 17 59 37](https://user-images.githubusercontent.com/54467698/180205243-923a9013-2109-4705-85f0-71849e25f18e.png)

#### Login Handling
![Screen Shot 2565-07-21 at 18 03 36](https://user-images.githubusercontent.com/54467698/180205570-118fe1af-af72-4f9b-a0dc-83656b393157.png)

### Register Page
![Screen Shot 2565-07-21 at 18 04 15](https://user-images.githubusercontent.com/54467698/180205718-162b42be-ccbe-4d2f-9c93-8c10ae46410d.png)

#### Register Handling
![Screen Shot 2565-07-21 at 18 05 31](https://user-images.githubusercontent.com/54467698/180205312-1a1a6d38-ede5-45b6-883d-9437ac3c662e.png)

### Create Page
![Screen Shot 2565-07-21 at 18 00 36](https://user-images.githubusercontent.com/54467698/180205405-52166468-6ab0-4adc-a5c1-a111623d2791.png)

#### Create Handling

### Single Party Page
![Screen Shot 2565-07-21 at 18 01 57](https://user-images.githubusercontent.com/54467698/180205443-c03ab91d-34d4-42c7-b0a8-19d6146a8b04.png)
#### Single Party Handling
![Screen Shot 2565-07-21 at 18 03 09](https://user-images.githubusercontent.com/54467698/180205621-7fe2805b-e50e-46a0-b808-c1c093cba68b.png)
![Screen Shot 2565-07-21 at 18 02 42](https://user-images.githubusercontent.com/54467698/180205652-4aae2dfe-b579-42c4-a8a8-7004bd37eda5.png)
![Screen Shot 2565-07-21 at 18 02 14](https://user-images.githubusercontent.com/54467698/180205677-c3392d47-9e50-429d-80e0-0994368ff300.png)

### Responsive Design
![Screen Shot 2565-07-21 at 18 50 07](https://user-images.githubusercontent.com/54467698/180206937-99065200-6f76-43a0-9592-c8a7d3d0abcb.png)

![Screen Shot 2565-07-21 at 18 48 11](https://user-images.githubusercontent.com/54467698/180206943-fdc8863f-77d8-47bd-9757-8f858a9cd08a.png)

# Possible Improvements
- Create Role and guard access for specific rolebase functionality
- Add pending request to join the party
- Logging action/transaction
- Use cookie to save user session
- Use cloud to scale up
