/**
 * Sidebar configuration for snowflake Job-Oriented Training Demo
 */

module.exports = {
  snowflakeTraining: [
    {
      type: 'category',
      label: '🏗️ Data Engineering with Snowflake and DBT',
      items: [
        'snowflake-training/demo-content/00-course-overview',
        'snowflake-training/demo-content/02-topics-overview-snowflake',
        'snowflake-training/demo-content/02-topics-overview-dbt',
        'snowflake-training/demo-content/09-registration-link',
        {
          type: 'category',
          label: 'Dynamic Tables',
          items: [
            {
              type: 'doc',
              //  'snowflake-training/Module-01-Cloud-Data-Warehousing-Concepts/module-07-data-loading-techniques-07-15-introduction-to-dynamic-table',
              id: 'snowflake-training/demo-content/module-07-data-loading-techniques-07-15-introduction-to-dynamic-table',
              label: 'Demo Dynamic Table',
              className: 'custom-sidebar-item'
            },
            {
              type: 'doc',
              id: 'snowflake-training/demo-content/module-07-data-loading-techniques-07-16-etl-pipeline-with-streams-tasks',
              label: 'Traditional ETL Pipeline with Task and Streams',
              className: 'custom-sidebar-item'
            },          
            {
              type: 'doc',
              id: 'snowflake-training/demo-content/module-07-data-loading-techniques-07-17-etl-pipeline-with-dynamic-tables',
              label: 'ETL Pipeline with Dynamic Tables',
              className: 'custom-sidebar-item'
            }
          ]
        },
        'demo-video/Sample-Recording-Exploring Collections',
        'snowflake-training/demo-content/10-contact-details',
      ],
    },
  ],
};
