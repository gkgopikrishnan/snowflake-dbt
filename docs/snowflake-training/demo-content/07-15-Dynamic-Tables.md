---
id: module-07-data-loading-techniques-07-15-introduction-to-dynamic-table
title: Introduction to Dynamic Table
---

<div class="custom-page-style">

# ❄️ Dynamic Tables in Snowflake

- Dynamic Tables in Snowflake are **next-generation, self-refreshing tables** that automatically refresh based on a defined query and target freshness.  
- They simplify data pipelines by combining the capabilities of **Materialized Views** and **Stream + Task pipelines**, without the need for external schedulers.


- Pls Note: Dynamic Tables are a special type of managed object in Snowflake — they are not permanent, transient, or temporary tables.
- Instead, they are **"their own category**, with some unique lifecycle and metadata characteristics.
---

<details>
<summary>📘 **Overview & Why Dynamic Tables**</summary>

Dynamic Tables in Snowflake are **self-refreshing, dependency-aware result sets** that stay updated automatically based on a defined *freshness target* (`TARGET_LAG`).  
They simplify pipeline management by combining the best of **Materialized Views** and **Streams + Tasks**, without any manual orchestration.

---

### ⚙️ What Dynamic Tables Automatically Manage

| Concept | Description |
|----------|--------------|
| **Incremental Refresh** | **<span class="blink">Automatically</span>** processes only new or changed data instead of reloading the full dataset, optimizing performance and compute cost. |
| **Data Dependencies** | **<span class="blink">Automatically</span>** tracks and maintains refresh order across dependent tables (DAG), ensuring consistent data snapshots in multi-hop pipelines. |
| **Orchestration** | **<span class="blink">Automatically</span>** coordinates refreshes across all dependencies to meet freshness SLAs — no cron jobs, tasks, or external schedulers needed. |

> 🧠 In short: You define *what* your data should look like and *how fresh* it should be — Snowflake handles *how* and *when* to refresh it.

---

### 🧩 Why Dynamic Tables?

Before Dynamic Tables, engineers relied on:
- **Materialized Views (MVs)** — auto-refreshing but limited SQL capabilities  
- **Streams + Tasks** — highly flexible but manually orchestrated  

Dynamic Tables unify both worlds by offering:
- **Declarative pipeline definition** — specify outcome, not schedule  
- **Automated incremental refresh and dependency handling**  
- **Freshness SLA–driven execution**, managed entirely by Snowflake  

---

### 🧱 Under the Hood

- Internally, Snowflake stores Dynamic Tables as **managed tables** with system metadata tracking refresh states and dependencies.  
- They are **not** classified as permanent, transient, or temporary tables — the system manages them as part of the **Dynamic Table framework**.  
- Each refresh is warehouse-driven and optimized automatically by Snowflake’s internal engine.

---

> 💡 Think of Dynamic Tables as *declarative, self-healing data pipelines* — always fresh, dependency-aware, and cost-optimized, with zero manual orchestration.

</details>

<details>
<summary>⚙️ **Key Features**</summary>

| Feature | Description |
|---------|-------------|
| **Declarative Pipelines** | - Define final dataset; <br /> - Snowflake handles the refresh logic automatically. <br /> - A declarative pipeline means you declare what the final data should look like, and the system (in this case, Snowflake) automatically figures out how and when to make it happen.|
| **Target Freshness (`TARGET_LAG`)** | Ensures your data is updated according to the freshness interval you specify. |
| **Dependency Awareness** | Tables are refreshed in the correct order based on dependencies. |
| **Complex Query Support** | Supports joins, aggregations, window functions, and CTEs — much more powerful than MVs. |
| **Incremental Computation** | Only changed rows are processed, reducing compute cost. |
| **Warehouse-Aware Execution** | Specify the warehouse for table refresh computation. |
| **DAG-Based Orchestration** | Automatically manages multi-layer dependencies in pipelines. |

</details>

<details>
<summary>🚀 **Typical Use Cases**</summary>

Dynamic Tables are ideal in scenarios where you want:

- To materialize query results without writing custom orchestration code  
- To avoid manually tracking data dependencies and refresh schedules  
- To chain multiple tables for data transformations  
- To focus on pipeline outcomes declaratively, while Snowflake handles scheduling and execution  

Common use cases include:

- **Incremental ETL pipelines** — automate bronze → silver → gold transformations  
- **Materialized data marts** — maintain pre-aggregated summaries for analytics  
- **Chained transformations** — multi-hop pipeline orchestration  
- **Real-time dashboards** — near-real-time updates without manual refreshes  
- **Data quality & audit metrics** — continuously compute validation KPIs  
- **ML feature tables** — keep model-ready data always up-to-date  

</details>

<details>
<summary>🧱 **Architecture Concept**</summary>

Dynamic Tables follow a **multi-hop architecture** similar to medallion layering:

```

RAW  →  BRONZE  →  SILVER  →  GOLD
↑         ↑         ↑
Hop 1     Hop 2     Hop 3


```

- Each layer depends on the previous layer  
- Snowflake tracks dependencies and refreshes in correct order  
- Ensures **consistent snapshots** across the pipeline  

</details>
<details>
  <summary>🔄 <b>Comparison with Other Approaches</b></summary>

  <div
    style={{
      overflowX: "auto",
      maxWidth: "100%",
      whiteSpace: "normal",
      wordBreak: "break-word",
      tableLayout: "fixed",
      marginTop: "8px"
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ width: "18%", background: "#f3f8fa", padding: "8px" }}>Feature</th>
          <th style={{ width: "27%", background: "#f3f8fa", padding: "8px" }}>Dynamic Table (DT)</th>
          <th style={{ width: "27%", background: "#f3f8fa", padding: "8px" }}>Streams + Tasks</th>
          <th style={{ width: "28%", background: "#f3f8fa", padding: "8px" }}>Materialized View (MV)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Auto-refresh</td>

          <td style={{ padding: "8px", textAlign: "left" }}>
            ✅ <span class="blink"> Fully Automated </span> refresh managed by Snowflake based on <code>TARGET_LAG</code> (freshness SLA).
          </td>
          <td style={{ padding: "8px", textAlign: "left" }}>
            ❌ No built-in auto-refresh; requires explicit task scheduling or chaining.
          </td>
          <td style={{ padding: "8px", textAlign: "left" }}>
            ✅ Automatically refreshes when base tables change, but limited to simple dependencies.
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Handles dependencies</td>
          <td style={{ padding: "8px", textAlign: "left" }}>
            ✅ <span class="blink">  Automatically </span> tracks lineage and refreshes in dependency order (even across schemas).
          </td>
          <td style={{ padding: "8px" , textAlign: "left"}}>
            ❌ Task dependencies limited to same schema (no cross-schema chaining).
          </td>
          <td style={{ padding: "8px", textAlign: "left" }}>
            ❌ No dependency awareness — must refresh manually if multi-level dependencies exist.
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Incremental computation</td>

          <td style={{ padding: "8px", textAlign: "left" }}>
            ✅ Managed <span class="blink"> Automatic incremental </span> ( refresh only changed data recomputed ).
          </td>
          <td style={{ padding: "8px" }}>
            ✅ Possible via Streams & MERGE patterns, defined manually.
          </td>
          <td style={{ padding: "8px" }}>
            ✅ Maintains incrementally but only for simple projections/filters.
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Scheduler required</td>
          <td style={{ padding: "8px" }}>
            ❌ Managed internally by Snowflake; you only define freshness (<code>TARGET_LAG</code>).
          </td>
          <td style={{ padding: "8px" }}>✅ Must manually define schedules or AFTER dependencies.</td>
          <td style={{ padding: "8px" }}>
            ❌ Handled internally, but refresh timing cannot be customized.
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Complex SQL (joins, aggregates)</td>
          <td style={{ padding: "8px" }}>
            ✅ Supports complex joins, aggregations, unions, and transformations across multiple schemas/databases.
          </td>
          <td style={{ padding: "8px" }}>✅ Fully flexible — any SQL logic supported.</td>
          <td style={{ padding: "8px" }}>
            ❌ Restricted to a single base table and limited expressions.
          </td>
        </tr>



        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Warehouse control</td>
          <td style={{ padding: "8px" }}>
            ✅ You define which warehouse is used for refresh (<code>WAREHOUSE =</code>).
          </td>
          <td style={{ padding: "8px" }}>✅ Full control — each task runs on a specific warehouse.</td>
          <td style={{ padding: "8px" }}>
            ❌ Uses Snowflake-managed compute — no visibility or control over cost.
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Monitoring / lineage visibility</td>
          <td style={{ padding: "8px" }}>
            ✅ Built-in lineage view and <code>ACCOUNT_USAGE.DYNAMIC_TABLE_REFRESH_HISTORY</code>.
          </td>
          <td style={{ padding: "8px" }}>
            ✅ Check task history via <code>INFORMATION_SCHEMA.TASK_HISTORY</code>.
          </td>
          <td style={{ padding: "8px" }}>⚠️ Limited metadata visibility.</td>
        </tr>

        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Cross-schema / cross-db support</td>
          <td style={{ padding: "8px" }}>✅ Fully supported — dependencies can span DBs & schemas.</td>
          <td style={{ padding: "8px" }}>❌ `AFTER` chaining limited to same schema.</td>
          <td style={{ padding: "8px" }}>❌ Must be in same schema as base table.</td>
        </tr>

        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Use case fit</td>
          <td style={{ padding: "8px" }}>
            🧠 Ideal for <b>data pipelines</b>, <b>data marts</b>, and <b>multi-layer ETL chains (Bronze → Silver → Gold)</b>.
          </td>
          <td style={{ padding: "8px" }}>
            🔧 Best for <b>procedural ETL workflows</b>, <b>file ingestion</b>, or <b>external triggers</b>.
          </td>
          <td style={{ padding: "8px" }}>
            ⚙️ Great for <b>simple aggregates</b>, <b>summary tables</b>, or <b>report caching</b>.
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Cost behavior</td>
          <td style={{ padding: "8px" }}>
            💸 Uses assigned warehouse only when lag exceeds threshold (efficient).
          </td>
          <td style={{ padding: "8px" }}>
            💸 Pay per run; depends on task frequency and warehouse size.
          </td>
          <td style={{ padding: "8px" }}>
            💸 Cost built into Snowflake compute — not warehouse-visible.
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: "bold", padding: "8px" }}>Maintenance overhead</td>
          <td style={{ padding: "8px" }}>
            🪶 Low — declarative setup, no orchestration once defined.
          </td>
          <td style={{ padding: "8px" }}>
            ⚙️ Medium–High — manual SQL, scheduling, and dependency management.
          </td>
          <td style={{ padding: "8px" }}>
            🪶 Low — simple automatic refresh but limited flexibility.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</details>

<details>
<summary>⚡ **Advanced Use Cases**</summary>

- **Slowly Changing Dimensions (SCDs):** Implement Type 1 and Type 2 SCDs by reading from change streams and applying window functions over record keys ordered by change timestamps. Handles insertions, deletions, and out-of-order updates.  
- **Joins and Aggregations:** Incrementally precompute expensive joins and aggregations to enable fast query response times.  
- **Batch to Streaming Transitions:** Seamlessly switch from batch to streaming pipelines using `ALTER DYNAMIC TABLE`. Adjust refresh frequency to balance cost and freshness.  

</details>

<details>
<summary>💡 **Best Practices**</summary>

1. Define **clear layers** (bronze → silver → gold) for pipeline clarity  
2. Start with **higher `TARGET_LAG`** (e.g., 30 minutes) and tune based on SLA  
3. Minimize unnecessary dependencies to reduce DAG complexity  
4. Leverage **incremental refresh** over full reloads  
5. Use warehouses optimized for **ETL workloads** separate from user queries  
6. Apply **role-based access control** for secure data sharing  

</details>

<details>
<summary>🧩 **Summary**</summary>

Dynamic Tables are **smart, self-refreshing, dependency-aware materialized pipelines** in Snowflake.  

They remove the need for:

- Manual orchestration  
- Custom refresh logic  
- Scheduling management  

> Ideal for **continuous ETL, dashboards, analytics marts, and ML pipelines** with minimal operational overhead.

</details>


</div>

