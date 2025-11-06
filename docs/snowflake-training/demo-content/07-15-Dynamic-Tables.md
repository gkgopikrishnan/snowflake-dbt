---
id: module-07-data-loading-techniques-07-15-introduction-to-dynamic-table
title: Introduction to Dynamic Table
---

<div class="custom-page-style">

# ❄️ Dynamic Tables in Snowflake

Dynamic Tables in Snowflake are **next-generation, self-refreshing tables** that automatically maintain query results based on a defined *target freshness (`TARGET_LAG`)*.  
They simplify data pipelines by combining the power of **Materialized Views** and **Streams + Tasks**, without requiring external schedulers or manual orchestration.

> 💡 Think of Dynamic Tables as **declarative, self-healing data pipelines** — always fresh, dependency-aware, and cost-optimized.

---

<details>
<summary>📘 **Overview**</summary>

### ⚙️ What Dynamic Tables Do

| Concept | Description |
|----------|--------------|
| **Incremental Refresh** | Automatically processes only new or changed data instead of reloading the entire dataset. |
| **Dependency Awareness** | Tracks and refreshes dependent tables in correct DAG order. |
| **Automated Orchestration** | Coordinates refreshes without tasks, cron jobs, or external tools. |

### 🧩 Why Dynamic Tables?

Before DTs, engineers relied on:
- **Materialized Views** → Auto-refresh but limited SQL.
- **Streams + Tasks** → Flexible but required orchestration.

Dynamic Tables unify both:
- **Declarative setup** — define outcome, not schedule.  
- **Self-refreshing pipelines** — freshness-driven execution.  
- **Automatic dependency handling** — Snowflake manages refresh order.

</details>

---

<details>
<summary>⚡ **Dynamic Tables in Data CD Pipelines**</summary>

Dynamic Tables form the **core layer** of a Snowflake **Data Continuous Delivery (CD)** pipeline — handling both **batch** and **streaming** workloads.

| Feature | Description |
|----------|-------------|
| **Declarative Setup** | Define final state; Snowflake decides how and when to refresh. |
| **Self-Refreshing** | Detects upstream changes and refreshes automatically. |
| **Materialized Results** | Persists results incrementally. |
| **Continuous Maintenance** | No need for tasks, schedulers, or manual refresh logic. |

#### 🚀 Benefits

- Simplifies ETL orchestration  
- Reduces pipeline complexity  
- Optimizes compute through incremental updates  
- Enables cost-effective, always-fresh analytics  

</details>

---

<details>
<summary>⚙️ **Key Features**</summary>

| Feature | Description |
|----------|-------------|
| **Declarative Pipelines** | Define the final dataset — Snowflake manages refresh logic. |
| **Target Freshness (`TARGET_LAG`)** | Defines how fresh data should be. |
| **Dependency Tracking** | Refreshes in dependency order (DAG). |
| **Incremental Processing** | Processes only changed rows. |
| **Warehouse-Aware Execution** | Choose which warehouse performs refreshes. |
| **Complex Query Support** | Supports joins, aggregations, window functions, and CTEs. |
| **Cross-Schema Support** | Dependencies can span databases and schemas. |

</details>

---

<details>
<summary>💻 **Syntax & Components**</summary>

### Basic Syntax
```sql
CREATE OR REPLACE DYNAMIC TABLE <table_name>
  [WAREHOUSE = <warehouse_name>]
  [TARGET_LAG = <interval>]
AS
  SELECT_statement;
````

### Core Components

| Component                   | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| **DYNAMIC TABLE**           | Table type that maintains itself based on upstream changes. |
| **WAREHOUSE**               | Specifies the compute resource used for refreshes.          |
| **TARGET_LAG**              | Maximum time lag between source updates and refresh.        |
| **AS SELECT**               | Defines the logic for the data content.                     |
| **INCREMENTAL COMPUTATION** | Processes only changed records.                             |
| **DAG AUTOMATION**          | Manages refresh order automatically across dependencies.    |

</details>

---

<details>
<summary>🚀 **Typical Use Cases**</summary>

Dynamic Tables are ideal when you want to:

* Automate incremental ETL (Bronze → Silver → Gold)
* Build **real-time dashboards** or **data marts**
* Chain transformations declaratively
* Continuously compute **data quality** or **ML feature tables**

Use Cases:

* Incremental ETL
* Real-time dashboards
* Chained transformations
* Materialized analytics marts
* Continuous ML data refresh

</details>

---

<details>
<summary>🧱 **Architecture Concept**</summary>

Dynamic Tables follow a **multi-hop medallion architecture**:

```
RAW → BRONZE → SILVER → GOLD
↑       ↑        ↑
Hop1   Hop2     Hop3
```

* Each layer depends on the previous
* Snowflake tracks dependencies automatically
* Ensures consistent, synchronized snapshots

</details>

---

<details>
<summary>🔄 **Comparison with Other Approaches**</summary>

| Feature                    | Dynamic Table (DT)                | Streams + Tasks              | Materialized View (MV)        |
| -------------------------- | --------------------------------- | ---------------------------- | ----------------------------- |
| **Auto-refresh**           | ✅ Fully automated (`TARGET_LAG`)  | ❌ Requires manual scheduling | ✅ Auto-refresh, limited scope |
| **Dependency Handling**    | ✅ Cross-schema DAG refresh        | ❌ Limited to same schema     | ❌ None                        |
| **Incremental Processing** | ✅ Automatic                       | ✅ Manual via Streams         | ✅ Simple only                 |
| **Scheduler Required**     | ❌ No                              | ✅ Yes                        | ❌ No (but not configurable)   |
| **Complex SQL Support**    | ✅ Joins, CTEs, aggregates         | ✅ Full                       | ❌ Simple only                 |
| **Warehouse Control**      | ✅ Configurable                    | ✅ Manual                     | ❌ Managed by Snowflake        |
| **Monitoring**             | ✅ `DYNAMIC_TABLE_REFRESH_HISTORY` | ✅ `TASK_HISTORY`             | ⚠️ Limited                    |
| **Cross-DB Support**       | ✅ Yes                             | ❌ No                         | ❌ No                          |
| **Use Case Fit**           | 🧠 Declarative pipelines          | 🔧 Procedural ETL            | ⚙️ Simple summaries           |
| **Cost Behavior**          | 💸 Efficient, freshness-driven    | 💸 Per schedule              | 💸 Built-in                   |
| **Maintenance**            | 🪶 Low                            | ⚙️ Medium–High               | 🪶 Low                        |

</details>

---

<details>
<summary>⚡ **Advanced Use Cases**</summary>

* **SCD Type 1/2:** Use streams + window functions for handling updates/deletes.
* **Precomputed Joins & Aggregations:** Incrementally maintain heavy computations.
* **Batch ↔ Streaming Transition:** Adjust `TARGET_LAG` dynamically via `ALTER DYNAMIC TABLE`.

</details>

---

<details>
<summary>💡 **Best Practices**</summary>

1. Use **layered medallion design** (bronze → silver → gold).
2. Start with **larger `TARGET_LAG`** and refine for SLA.
3. Avoid unnecessary dependencies.
4. Prefer incremental updates over full refreshes.
5. Use dedicated **ETL warehouses** for refreshes.
6. Apply proper **RBAC** for controlled access.

</details>

---

<details>
<summary>🧩 **Summary**</summary>

Dynamic Tables are **smart, self-refreshing, dependency-aware pipelines** in Snowflake.

They remove the need for:

* Manual orchestration
* Scheduling logic
* Custom refresh code

> ✅ Perfect for **continuous ETL, analytics marts, dashboards, and ML pipelines**.

</details>

</div>
