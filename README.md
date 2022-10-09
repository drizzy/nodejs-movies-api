# MOVIES REST API - Developed with NodeJs and MongoDB

## Quick Start

Clone the project
```bash
git clone https://github.com/drizzy/nodejs-movies-api.git
```
Go to the project directory
```bash
cd nodejs-movies-api
```
install the necessary packages
```bash
npm install
```

## Environment variables

To run this project, you will need to add the following environment variables to your .env file

| Variables | Description	|
| --- | --- |
| `PORT`  | The default port is `3000` |
| `API_URL`  | Example `http://localhost:3000/api` |
| `MONGODB_URI` | The default MONGODB URI |
| `EMAIL_SMTP_SERVICE` | Email service example `Zoho` `Google` `Outlook` |
| `EMAIL_SMTP_HOST` | Host Example `smtp.zoho.com` `smtp.gmail.com` `smtp-mail.outlook.com` |
| `EMAIL_SMTP_PORT` | Port of Host `465` `587` `587` |
| `EMAIL_SMTP_SECURE` | Secure `true` |
| `EMAIL_SMTP_USER` | Email `admin@example.com` |
| `EMAIL_SMTP_PASS` | Password `myPassword` |
| `EMAIL_SMTP_FROM` | Where it is shipped from `no-reply@example.com` |
| `JWT_SECRET` | Secret token  |
| `JWT_EXPIRE` | Token expiration time |


## Start the server
Development
```bash
npm run start:dev
```
Production
```bash
npm run start:prod
```
# Auth
| Route | HTTP Verb  | POST body    | Description   |
| --- | --- | --- | --- |
| /api/auth/signup | `POST` | {"name": "Admin", "email": "admin@example.com", "username": "admin", "password": "root"} | Create a new user. `You will receive an email to activate the account.` Admin role assign to the first user to register |
| /api/auth/login    | `POST` | {"username": "admin",  "password": "root"} | Generate new Token |

# Users
| Route | HTTP Verb  | POST body    | Description   |
| --- | --- | --- | --- |
| /api/users | `GET` | Empty | List all users. |
| /api/users | `POST` | {"name": "User", "username": "user", "email": "user@example.com", "role": "USER", "password": "passuser"}  | Create a new user as admin. |
| /api/users/:email | `GET` | Empty | Get a user. |
| /api/users/:email | `PUT` | {"name": "User Update", "username": "user", "email": "user@example.com", "role": "ADMIN", "password": "newpass"} | Update a user with new info. |
| /api/users/:email | `DELETE` | Empty | Delete a user. |

# Movies
| Route | HTTP Verb	 | POST body	 | Description |
| --- | --- | --- | --- |
| /api/movies | `GET` | Empty | List all movies. |
| /api/movies | `POST` | {"title": "Title movie", "desc": "Example description movie.", "poster": "https://example.com/movie-image.jpg", "genre": "aventura",  "year": 2022, "rating": 10, "duration": 60, "only": [{ "language": "latino", "server": "Youtube","quality": "hd1080", "url": "https://example.com/movie-link.mp4" }, { "language": "subtitulado", "server": "Youtube", "quality": "hd1080", "url": "https://example.com/movie-link2.mp4" } ] } | Create a new movie. |
| /api/movies/:id | `GET` | Empty | Get a movie. |
| /api/movies/:id | `PUT` | {"title": "New title movie", "desc": "New example description movie.", "poster": "https://example.com/movie-image.jpg", "genre": "aventura",  "year": 2022, "rating": 9.5, "duration": 60, "only": [{ "language": "latino", "server": "Youtube", "quality": "hd1080", "url": "https://example.com/movie-link.mp4"}, { "language": "subtitulado", "server": "Youtube",  "quality": "hd1080", "url": "https://example.com/movie-link.mp4" } ] } | Update a movie with new info. |
| /api/movies/:id | `DELETE` | Empty | Delete a movie. |

# Reset password
| Route | HTTP Verb | POST body  | Description  |
|  ---  | --- | --- | --- |
| /api/password-reset | `POST` | {"email": "admin@example.com"} | Send password reset link |
| /api/password-reset/:userId/:token | `POST` | {"password": "NewPassword"} | Reset user password |