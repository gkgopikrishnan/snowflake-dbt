---
id: 02-topics-overview
title: Topics Overview
sidebar_label: Detailed Topics
---

# 📚 Detailed Databricks Modules & Hands-Ons

Our Databricks program is structured into modules that ensure **strong conceptual understanding, hands-on learning, and interview readiness**.

<details>
<summary>Module 1: Databricks Fundamentals</summary>

**Focus Area:** Workspace setup, Clusters, Repos  
**Hands-On Outcome:** Cluster setup, workspace navigation, creating Repos, running notebooks  

<details>
<summary>Topics & Subtopics</summary>

- **Introduction to Databricks**
  - Overview of Databricks and the Lakehouse architecture
  - Comparing Databricks with Snowflake and Synapse
  - Key components: Workspace, Clusters, DBFS, Jobs, and Repos
- **Cluster Management**
  - Types of clusters: All-purpose, Job, High concurrency
  - Creating and configuring clusters, autoscaling options
  - Monitoring cluster performance and troubleshooting
- **DBFS & Repositories**
  - Working with Databricks File System (DBFS)
  - Mounting external storage (S3, ADLS)
  - Git integration and version control with Repos

</details>

<details>
<summary>Practical Exercises</summary>

- Launch Databricks workspace and create clusters  
- Explore notebooks and DBFS, mount S3/ADLS storage  
- Create a Repo, link GitHub, and perform push/pull operations  

</details>

</details>

<details>
<summary>Module 2: PySpark & DataFrames</summary>

**Focus Area:** Data ingestion, transformations, and optimizations  
**Hands-On Outcome:** Load, transform, and optimize data using PySpark  

<details>
<summary>Topics & Subtopics</summary>

- **Spark Architecture**
  - Understanding Driver, Executors, DAGs, and lazy evaluation
- **DataFrames vs RDDs**
  - Differences, use-cases, and performance considerations
  - Schema inspection and validation
- **Transformations & Actions**
  - Narrow vs wide transformations
  - Filter, map, groupBy, and join operations
- **Advanced PySpark Techniques**
  - Window functions, broadcast joins, and skew handling
  - User-defined functions (UDFs)
  - PySpark SQL API
- **Performance Optimization**
  - Partitioning, caching, and bucketing
  - Using `EXPLAIN` to analyze query plans
  - Practical performance tuning tips

</details>

<details>
<summary>Practical Exercises</summary>

- Load CSV/JSON into DataFrames and perform filters, aggregations, and joins  
- Apply advanced PySpark transformations including window functions and UDFs  
- Optimize queries using caching, partitioning, and `EXPLAIN` for DAG analysis  

</details>

</details>

<details>
<summary>Module 3: Delta Lake</summary>

**Focus Area:** Delta Lake fundamentals, versioning, and data reliability  
**Hands-On Outcome:** Build Delta tables, perform MERGE operations, and implement Time Travel  

<details>
<summary>Topics & Subtopics</summary>

- **Delta Lake Basics**
  - ACID transactions, schema enforcement, and MERGE operations
- **Medallion Architecture**
  - Bronze → Silver → Gold design for layered data storage
- **Time Travel & Versioning**
  - Querying previous versions of data
  - Rollback scenarios
- **Optimization Techniques**
  - OPTIMIZE, Z-Ordering, and VACUUM for performance

</details>

<details>
<summary>Practical Exercises</summary>

- Create Delta tables and explore schema enforcement and Time Travel  
- Perform INSERT, UPDATE, DELETE, MERGE operations  
- Build a Bronze → Silver → Gold pipeline for a sample dataset  

</details>

</details>

<details>
<summary>Module 4: ETL Pipelines & Streaming</summary>

**Focus Area:** Batch and streaming ETL pipelines, incremental data processing  
**Hands-On Outcome:** Develop end-to-end pipelines including Auto Loader and structured streaming  

<details>
<summary>Topics & Subtopics</summary>

- **Batch ETL Pipelines**
  - Design incremental ETL processes
- **Auto Loader**
  - Real-time file ingestion and schema handling
- **Structured Streaming**
  - Streaming concepts, triggers, and watermarks
- **Late-Arriving Data Handling**
  - Techniques to manage late data in streaming pipelines

</details>

<details>
<summary>Practical Exercises</summary>

- Build a batch ETL pipeline with incremental loads  
- Configure Auto Loader for streaming ingestion  
- Implement structured streaming with triggers, watermarks, and late data handling  

</details>

</details>

<details>
<summary>Module 5: Databricks SQL & Analytics</summary>

**Focus Area:** Querying Delta tables and creating dashboards  
**Hands-On Outcome:** Build SQL queries and interactive dashboards for data insights  

<details>
<summary>Topics & Subtopics</summary>

- **Databricks SQL Overview**
  - SQL workspace and querying capabilities
- **Querying Delta Tables**
  - Joins, aggregations, and window functions
- **Dashboards & Visualizations**
  - Creating interactive charts and reports
- **Query Optimization**
  - Caching strategies and `EXPLAIN` usage

</details>

<details>
<summary>Practical Exercises</summary>

- Run SQL queries on Delta tables for analytics  
- Create interactive dashboards with charts and filters  
- Optimize queries using caching and query plan analysis  

</details>

</details>

<details>
<summary>Module 6: Integration</summary>

**Focus Area:** External system integration and data visualization  
**Hands-On Outcome:** Connect Databricks to Snowflake, Power BI, and REST APIs  

<details>
<summary>Topics & Subtopics</summary>

- **Snowflake Integration**
  - Data exchange between Databricks and Snowflake
- **Power BI Integration**
  - Creating live dashboards from Delta tables
- **REST API Integration**
  - Programmatic data ingestion and exports
- **Automated Data Ingestion**
  - Scheduling and monitoring pipelines

</details>

<details>
<summary>Practical Exercises</summary>

- Connect Databricks to Snowflake and push data  
- Create Power BI dashboards from Databricks data  
- Use REST API to ingest or export sample datasets  

</details>

</details>

<details>
<summary>Module 7: ML & AI in Databricks</summary>

**Focus Area:** Machine learning workflow and AutoML  
**Hands-On Outcome:** Track ML experiments, train models, and deploy pipelines  

<details>
<summary>Topics & Subtopics</summary>

- **MLflow Experiment Tracking**
  - Logging experiments and tracking metrics
- **Model Registry**
  - Registering, versioning, and deploying models
- **Databricks AutoML**
  - Automated model training and hyperparameter tuning
- **ML Integration with ETL**
  - Using processed Delta tables as ML inputs

</details>

<details>
<summary>Practical Exercises</summary>

- Track experiments using MLflow and deploy a simple model  
- Train models with AutoML and evaluate performance  
- Integrate ML workflow with ETL pipeline data  

</details>

</details>

<details>
<summary>Module 8: Real-World Project</summary>

**Focus Area:** End-to-end pipeline implementation  
**Hands-On Outcome:** Build complete ETL, streaming, visualization, and optional ML project  

<details>
<summary>Topics & Subtopics</summary>

- End-to-End Implementation: Ingest → Transform → Load → Visualize  
- CI/CD and Job Automation  
- Project Documentation and Review  

</details>

<details>
<summary>Practical Exercises</summary>

- Build a complete pipeline using Bronze → Silver → Gold architecture  
- Schedule and monitor jobs, implement error handling  
- Deliver project with documentation and dashboards  

</details>

</details>

<details>
<summary>Module 9: Interview Preparation & Practice</summary>

**Focus Area:** Mock interviews and coding challenges  
**Hands-On Outcome:** Real interview simulation with PySpark, Delta Lake, and SQL exercises  

<details>
<summary>Topics & Subtopics</summary>

- Common interview questions for Databricks and PySpark  
- Case studies: incremental ETL, pipeline troubleshooting  
- Coding challenges: transformations, merges, and streaming  

</details>

<details>
<summary>Practical Exercises</summary>

- Solve PySpark transformation and Delta merge exercises  
- Write SQL queries for practical scenarios  
- Conduct mock interviews and review solutions  

</details>

</details>
