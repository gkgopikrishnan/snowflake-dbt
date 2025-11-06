---
id: module-07-data-loading-techniques-07-18-materialized-vs-dynamic-tables
title: Materialized Views Vs Dynamic Tables
---

<div class="custom-page-style">


## 🧩 **1️⃣ The Core Concept**

| Concept                   | **Materialized View (MV)**                                              | **Dynamic Table (DT)**                                                          |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Purpose**               | Speed up query performance by storing precomputed results.              | Build and maintain *incremental, automated data pipelines*.                     |
| **Refresh Trigger**       | System-managed (Snowflake automatically refreshes when source changes). | User-managed via **LAG** — defines how fresh data should be (e.g. every 5 min). |
| **Dependency Management** | Limited — cannot depend on another MV.                                  | Can depend on other DTs — supports full DAG (Directed Acyclic Graph) refresh.   |
| **Storage**               | Physically stores results for faster reads.                             | Maintains a snapshot (state) and lineage for refresh logic.                     |
| **Goal**                  | Query acceleration.                                                     | ETL / ELT pipeline automation.                                                  |

---

## ⚙️ **2️⃣ How Each Works Internally**

### 🧱 **Materialized View**

Think of it like **a cached table** of a query.

When you query:

```sql
CREATE OR REPLACE MATERIALIZED VIEW mv_sales_summary AS
SELECT region, SUM(amount) AS total_sales
FROM raw_sales
GROUP BY region;
```

Snowflake:

* Executes the query once and stores results.
* Tracks **changes (micro-partitions)** in `raw_sales`.
* On refresh, it **applies incremental changes** (insert/update/delete) to the MV.
* Automatically keeps it in sync (usually near real-time).

🔹 **Use Case:** When you have frequent SELECT queries over large, stable data and want low latency.

📊 Example:

```sql
SELECT * FROM mv_sales_summary;
```

This query is **much faster** because results are already materialized.

---

### ⚡ **Dynamic Table**

Think of it like **a self-refreshing transformation layer** — a “smart table” that automatically keeps itself up-to-date.

Example:

```sql
CREATE OR REPLACE DYNAMIC TABLE dt_sales_summary
LAG = '5 MINUTE'
WAREHOUSE = etl_wh
AS
SELECT region, SUM(amount) AS total_sales
FROM raw_sales
GROUP BY region;
```

Snowflake:

* Treats this like a **pipeline node**.
* Every 5 minutes, it checks for data changes in `raw_sales`.
* If new/changed data is found, it recomputes and refreshes the result.
* You can chain multiple DTs: `raw → bronze → silver → gold`.

🔹 **Use Case:** Incremental ELT pipelines (not just caching queries).

📊 Example:

```sql
SELECT * FROM dt_sales_summary;
```

Always returns results that are fresh up to the last refresh window (≤ 5 min old).

---

## 🔄 **3️⃣ Key Difference in Refresh Behavior**

| Aspect                  | **Materialized View**               | **Dynamic Table**                   |
| ----------------------- | ----------------------------------- | ----------------------------------- |
| Refresh Control         | System-controlled                   | User-controlled                     |
| Incremental Refresh     | ✅ Yes (on base tables)              | ✅ Yes (via DAG + LAG)               |
| Cross-schema Dependency | ❌ Not supported                     | ✅ Supported                         |
| Multi-level dependency  | ❌ Only on base tables               | ✅ DT → DT → DT chain supported      |
| Data freshness control  | ❌ No manual control                 | ✅ Controlled with LAG               |
| Cost control            | ❌ Snowflake decides when to refresh | ✅ You decide how often it refreshes |

---

## 🪜 **4️⃣ Example: Why DT > MV in ETL**

### ❌ Materialized View Limitation

```sql
-- Bronze Layer
CREATE OR REPLACE MATERIALIZED VIEW bronze_employees AS
SELECT * FROM raw_employees;

-- Silver Layer (depends on Bronze)
CREATE OR REPLACE MATERIALIZED VIEW silver_employees AS
SELECT UPPER(name) AS name, department FROM bronze_employees;
```

❌ **Error:**

> Materialized views cannot reference another materialized view.

So you’re stuck — MVs are single-layer only.

---

### ✅ Dynamic Table Solution

```sql
-- Bronze Layer
CREATE OR REPLACE DYNAMIC TABLE bronze_employees
LAG = '1 MINUTE'
WAREHOUSE = etl_wh
AS
SELECT * FROM raw_employees;

-- Silver Layer
CREATE OR REPLACE DYNAMIC TABLE silver_employees
LAG = '5 MINUTE'
WAREHOUSE = etl_wh
AS
SELECT INITCAP(name) AS name, department FROM bronze_employees;

-- Gold Layer
CREATE OR REPLACE DYNAMIC TABLE gold_summary
LAG = '15 MINUTE'
WAREHOUSE = etl_wh
AS
SELECT department, COUNT(*) AS total_employees
FROM silver_employees
GROUP BY department;
```

✅ Works perfectly — Snowflake automatically:

* Tracks lineage: Gold → Silver → Bronze → Raw
* Refreshes them in order (Bronze first, then Silver, then Gold)
* No need for **Streams** or **Tasks** manually

---

## 💡 **5️⃣ When to Use Which**

| Scenario                                                   | Choose                  |
| ---------------------------------------------------------- | ----------------------- |
| Querying huge static data repeatedly → want faster SELECTs | **Materialized View**   |
| Need incremental ETL between layers (Raw → Silver → Gold)  | **Dynamic Table**       |
| You want Snowflake to handle refresh DAG automatically     | **Dynamic Table**       |
| Need real-time, sub-minute freshness                       | **Materialized View**   |
| Want explicit refresh frequency control                    | **Dynamic Table (LAG)** |

---

## 🧠 **Summary Visualization**

```
RAW → [ MV ] → Dashboard Query     (Materialized View: Faster Query)
RAW → [ DT ] → BRONZE → SILVER → GOLD  (Dynamic Table: Full Pipeline)
```



</div>
 