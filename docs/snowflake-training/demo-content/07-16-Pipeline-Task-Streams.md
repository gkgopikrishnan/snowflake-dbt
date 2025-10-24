---
id: module-07-data-loading-techniques-07-16-etl-pipeline-with-streams-tasks
title: ETL Pipeline with Streams and Tasks
---

<div class="custom-page-style">

#
## Traditional ETL Pipeline using *"Streams + Tasks"*

This example demonstrates a **multi-layer employee ETL pipeline** using **Snowflake Streams + Tasks**, with **separate schemas for raw, bronze, silver, and gold layers**.  
Each step includes **purpose, explanation, and expected output**.

---

## **1️⃣ Database & Schemas**

```sql
-- Create the main database
CREATE OR REPLACE DATABASE demo_emp_db;

-- Create separate schemas for each layer
CREATE OR REPLACE SCHEMA demo_emp_db.emp_raw;      -- Raw / source data
CREATE OR REPLACE SCHEMA demo_emp_db.emp_bronze;   -- Cleansed data
CREATE OR REPLACE SCHEMA demo_emp_db.emp_silver;   -- Transformed / standardized data
CREATE OR REPLACE SCHEMA demo_emp_db.emp_gold;     -- Aggregated / analytics-ready data
````

✅ **Expected Output:**

```
Database DEMO_EMP_DB successfully created.
Schema EMP_RAW successfully created.
Schema EMP_BRONZE successfully created.
Schema EMP_SILVER successfully created.
Schema EMP_GOLD successfully created.
```

---

## **2️⃣ Raw Layer (`emp_raw`)**

```sql
USE SCHEMA demo_emp_db.emp_raw;

CREATE OR REPLACE TABLE raw_employees (
    employee_id INT,
    name STRING,
    department STRING,
    salary NUMBER(10,2),
    joining_date DATE,
    location STRING
);

-- Sample initial data
INSERT INTO raw_employees VALUES
(101, 'Alice', 'Finance', 75000, '2022-01-15', 'Bangalore'),
(102, 'Bob', 'IT', 90000, '2021-07-20', 'Hyderabad'),
(103, 'Charlie', 'HR', 65000, '2023-03-10', 'Chennai');
```

✅ **Expected Output:**

```
3 rows inserted.
```

```sql
SELECT * FROM raw_employees;
```

✅ **Expected Result:**

| EMPLOYEE_ID | NAME    | DEPARTMENT | SALARY   | JOINING_DATE | LOCATION  |
| ----------- | ------- | ---------- | -------- | ------------ | --------- |
| 101         | Alice   | Finance    | 75000.00 | 2022-01-15   | Bangalore |
| 102         | Bob     | IT         | 90000.00 | 2021-07-20   | Hyderabad |
| 103         | Charlie | HR         | 65000.00 | 2023-03-10   | Chennai   |

---

## **3️⃣ Bronze Layer (`emp_bronze`)**

### Bronze Table

```sql
USE SCHEMA demo_emp_db.emp_bronze;

CREATE OR REPLACE TABLE bronze_employees AS
SELECT * FROM demo_emp_db.emp_raw.raw_employees;
```

✅ **Expected Output:**

```
3 rows selected.
```

```sql
SELECT * FROM bronze_employees;
```

✅ **Expected Result:**

| EMPLOYEE_ID | NAME    | DEPARTMENT | SALARY   | JOINING_DATE | LOCATION  |
| ----------- | ------- | ---------- | -------- | ------------ | --------- |
| 101         | Alice   | Finance    | 75000.00 | 2022-01-15   | Bangalore |
| 102         | Bob     | IT         | 90000.00 | 2021-07-20   | Hyderabad |
| 103         | Charlie | HR         | 65000.00 | 2023-03-10   | Chennai   |

---

### Bronze Stream (Change Capture)

```sql
CREATE OR REPLACE STREAM bronze_employees_stream 
ON TABLE demo_emp_db.emp_raw.raw_employees
APPEND_ONLY = FALSE;
```

✅ **Expected Output:**

```
Stream BRONZE_EMPLOYEES_STREAM successfully created.
```

```sql
SHOW STREAMS;
```

✅ **Expected Result:**

| name                    | table_name    | mode    | stale | comment |
| ----------------------- | ------------- | ------- | ----- | ------- |
| BRONZE_EMPLOYEES_STREAM | RAW_EMPLOYEES | DEFAULT | FALSE | NULL    |

---

## **4️⃣ Silver Layer (`emp_silver`)**

### Silver Table

```sql
USE SCHEMA demo_emp_db.emp_silver;

CREATE OR REPLACE TABLE silver_employees (
    employee_id INT,
    name STRING,
    department STRING,
    salary NUMBER(10,2),
    joining_date DATE
);
```

✅ **Expected Output:**

```
Table SILVER_EMPLOYEES successfully created.
```

---

### Silver Task (Incremental ETL)

```sql
CREATE OR REPLACE TASK silver_employees_task
WAREHOUSE = etl_wh
SCHEDULE = '5 MINUTE'
AS
MERGE INTO silver_employees t
USING (
    SELECT * FROM demo_emp_db.emp_bronze.bronze_employees_stream
) s
ON t.employee_id = s.employee_id
WHEN MATCHED THEN UPDATE SET
    t.name = s.name,
    t.department = s.department,
    t.salary = s.salary,
    t.joining_date = s.joining_date
WHEN NOT MATCHED THEN INSERT (employee_id, name, department, salary, joining_date)
VALUES (s.employee_id, s.name, s.department, s.salary, s.joining_date);
```

✅ **Expected Output:**

```
Task SILVER_EMPLOYEES_TASK successfully created.
```

```sql
ALTER TASK silver_employees_task RESUME;
```

✅ **Expected Output:**

```
Task SILVER_EMPLOYEES_TASK resumed.
```

```sql
SHOW TASKS;
```

✅ **Expected Result:**

| name                  | schedule | state   | warehouse | definition_summary   |
| --------------------- | -------- | ------- | --------- | -------------------- |
| SILVER_EMPLOYEES_TASK | 5 MINUTE | STARTED | ETL_WH    | MERGE INTO SILVER... |

---

## **5️⃣ Gold Layer (`emp_gold`)**

### Gold Table

```sql
USE SCHEMA demo_emp_db.emp_gold;

CREATE OR REPLACE TABLE gold_employees_summary (
    department STRING,
    total_employees INT,
    avg_salary NUMBER(10,2)
);
```

✅ **Expected Output:**

```
Table GOLD_EMPLOYEES_SUMMARY successfully created.
```

---

### Gold Task

```sql
CREATE OR REPLACE TASK gold_employees_summary_task
WAREHOUSE = etl_wh
AFTER silver_employees_task
SCHEDULE = '10 MINUTE'
AS
CREATE OR REPLACE TABLE gold_employees_summary AS
SELECT 
    department,
    COUNT(*) AS total_employees,
    AVG(salary) AS avg_salary
FROM demo_emp_db.emp_silver.silver_employees
GROUP BY department;
```

✅ **Expected Output:**

```
Task GOLD_EMPLOYEES_SUMMARY_TASK successfully created.
```

```sql
ALTER TASK gold_employees_summary_task RESUME;
```

✅ **Expected Output:**

```
Task GOLD_EMPLOYEES_SUMMARY_TASK resumed.
```

---

## **6️⃣ Validation & Expected Final Output**

```sql
-- Check task history
SHOW TASK HISTORY;

-- Check Stream offset status
SELECT * FROM demo_emp_db.information_schema.streams;

-- Final aggregated data
SELECT * FROM demo_emp_db.emp_gold.gold_employees_summary;
```

✅ **Expected Final Output:**

| DEPARTMENT | TOTAL_EMPLOYEES | AVG_SALARY |
| ---------- | --------------- | ---------- |
| Finance    | 1               | 75000.00   |
| IT         | 1               | 90000.00   |
| HR         | 1               | 65000.00   |

---

</div>
 