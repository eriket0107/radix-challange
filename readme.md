
# API Documentation

## Client Radix Challenge

<a href="https://github.com/eriket0107/radix-front">Front end</a>

## User creation 
- The password must have length of 8 and special characters like (!, @, #) 

## Running the API

### 1. Npm install

```
  npm i
```

### 2. Handle enviroment variables

Make sure that have settled up all the required variables

```
  cp .env.example .env
```

### 3. Run DB migrations for create tables

```
  npm run migration:run
```

### 4. Finally run the application in development enviroment

```
  npm run dev
```

## Postman Workspace with Collections Requests

<a href="https://elements.getpostman.com/redirect?entityId=32764332-7b4615d7-7ac6-4bbc-9a08-03edb7ccbdb8&entityType=collection">
  Postman workspace
</a>

## Overview

This API serves as a comprehensive solution for collecting, storing, and analyzing sensor data from industrial equipment, enabling real-time monitoring and insights for the oil and gas operations.

- Receiving real-time sensor data in JSON format
- Processing CSV files to recover missing data
- Storing data in a database
- Providing a web interface for data visualization
- Offering graph-based analytics for sensor readings

Key aspects:

- Handles both real-time and recovered data
- Supports flexible time ranges for data retrieval
- Includes interactive graphs for data analysis
- Designed for continuous monitoring and insights in oil/gas operations

## Endpoints

## SENSOR

## 1. **Sensor Registration Data**

### `POST /sensor-register`

**Description**: This endpoint registers a new Data from sensor in the system.

- **Request Body**:

  ```json
  {
      "equipmentId": "EQ-91234",
      "value": 49.15,
      "timestamp": "2024-08-17T07:38:20-03:00Z"
  }
  ```
  
## 2. **Fix Sensor Registration Data**

### `PUT /fix-sensor-data`

**Description**: This endpoint chose the CSV file to update missing values from Sensor data.

- **Request Body**:

  ```json
  {
     "filePath": "src/uploads/2024-09-26T21:53:55-03:00Z_3e2526c9-7020-4513-bdbe-ad1c35a786dd.csv"
  }
  ```

## 3. **Get Mean By Periods**

### `GET /mean-by-period`

**Description**: This endpoint get all the means from the values from periods 24h / 48h / 1 week / 1 month.

- **Reponse Body**:

  ```json
  {
    "meanByPeriod": [
        {
            "period": "24h",
            "mean": "0.0"
        },
        {
            "period": "48h",
            "mean": "0.0"
        },
        {
            "period": "1 Semana",
            "mean": "0.0"
        },
        {
            "period": "1 Mês",
            "mean": "0.0"
        }
    ]
  }
  ```

## 4. **Seed Sensor**

### `POST /seed-sensor-data`

**Description**: This endpoint Seed Data for tests.

- **Must Be Autheticated With ADMIN role**

## USER

## 1. **User Registration**

### `POST /user-register`

**Description**: This endpoint registers a new user in the system.

- **Request Body**:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

### 2. **User Auth**

#### `POST /session`

**Description**: This endpoint authentication a  user in the system.

- **Request Body**:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### 3. **User Logout**

#### `DELETE /logout`

**Description**: This endpoint logs out the user from the application.

- **Request Body**:

  ```json
  {}
  ```

### 4. **User Refresh token**

#### `PATCH /token/refresh`

**Description**: This endpoint refresh the authentication token of the application.

- **Request Body**:

  ```json
  {}
  ```

## CSV

### 1. **User Refresh token**

#### `POST /input-csv`

**Description**: This endpoint inputs the csv that will be handled in the application.

- **Request Body**:

  ```json
    CSV FILE THAT WILL BE SAVED

    MUST HAVE A TYPE CSV
  ```

### 2. **List all CSV files**

#### `GET /list-csv`

**Description**: This endpoint list all the csv that are in the applicaiton system.

- **Request Body**:

  ```json
    {
      "csvFiles": []
    }
  ```

### 3. **View CSV Data**

#### `GET /view-csv-data/:filePath`

**Description**: This endpoint show data from a current CSV file using the path.

- **Respons Body Example**:

  ```json
    [
      {
          "equipmentId": "EQ-16526",
          "value": "49.15",
          "timestamp": "2024-08-17T07:38:20-03:00Z"
      }

  ]
  ```
