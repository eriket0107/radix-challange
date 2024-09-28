# API Documentation

## Overview

This API handles user registration, authentication, session management, and token refreshing. Below are the available routes and their descriptions.

## Endpoints

## -SENSOR

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
