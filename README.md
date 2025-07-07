### LogIngestion_QueryingSystem
This is a fullstack developer assessment project which implements a developer tool for ingesting and querying logs built with Node js and React js,using JSON file-based storage for storing logs

---
##Tech Stack:
-Frontend: React + Axios +Tailwind CSS + shadcn
-Backend: Node.js + Express
-Data Storage: JSON file (no database)
-Others: CORS,fs module, Postman for testing

-----
## Features:

   # LogIngestion:
   -`POST /logs`
   -Accepts a single log object in a predefined JSON format
   -Validates required fields and structure
   -stores logs in `logs.json`
   - Example format for the schema is given below. Use this while testing the log ingestion using postman:
            ```{
                        "level": "error",
                        "message": "Database connection failed",
                        "resourceId": "server-1",
                        "timestamp": "2025-07-06T20:00:00Z",
                        "traceId": "abc123",
                        "spanId": "span456",
                        "commit": "commit789",
                        "metadata": {
                            "parentResourceId": "server-2"
                        }
            }```
    #  Log Querying (GET /logs)

            Supports filters via query parameters:

            | Parameter         | Type     | Description                      |
            | ----------------- | -------- | -------------------------------- |
            | `level`           | string   | `error`, `warn`, `info`, `debug` |
            | `message`         | string   | Full-text search on message      |
            | `resourceId`      | string   | Filter by resource/server        |
            | `timestamp_start` | ISO date | Filter from this time            |
            | `timestamp_end`   | ISO date | Filter up to this time           |
            | `traceId`         | string   | Match trace ID                   |
            | `spanId`          | string   | Match span ID                    |
            | `commit`          | string   | Match commit hash                |

---
## 📸 Demo Screenshots

### 🧾 Log Query UI
[Query UI](./frontend//src/assets/images/Screenshot%202025-07-07%20124919.png)
[Log List](./frontend/src/assets/images/image.png)

## 🧪 How to Run

### 1. Clone the repo

    ``` bash
    git clone https://github.com/SAM324674/LogIngestion_QueryingSystem.git
    cd log-query-system
    ```

### 2.  Install backend dependencies
    ``` bash
    cd backend
    npm install
    ```
### 3. Start backend server
    ```bash
        npm run dev
    ```
### 4. Install frontend dependencies
    ```bash  
    cd ../frontend
    npm install
    ```
### 5. Start frontend server
    ```bash
        npm run dev 
    ```
