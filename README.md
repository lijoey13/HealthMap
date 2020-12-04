# Health Map

A web app to easily locate nearby clinics based on location.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

You will need a [MySQL](https://dev.mysql.com/downloads/mysql/) instance running on your machine.

### Installing

A step by step series of examples that tell you how to get a development env running

1. Cloning the repository

Navigate to the file directory you want to store the project in

```
git clone https://github.com/dchung21/react_test.git
```

2. Install dependencies

Navigate to the project directory and run the following

```
npm install
```

3. Create database

Run the queries in `create_tables.sql` to create the database and tables. 

4. Update api keys

Create a `.env` file in the root directory with the following contents

```
GOOGLE_MAPS_API=KEY
DB_HOST=HOST
DB_USER=USER
DB_PASSWORD=PASSWORD
DB=DB_NAME
```

Then create a `.env` in the client directory with the following contents

```
REACT_APP_MAPTILER_KEY = map_tiler_api_key
```

Replacing `map_tiler_api_key` with your own API key from maptiler.

5. Starting the App

Run this command

```
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

