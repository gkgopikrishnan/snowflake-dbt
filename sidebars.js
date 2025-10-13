/**
 * Sidebar configuration for Databricks Job-Oriented Training Demo
 */

module.exports = {
  databricksTraining: [
    {
      type: 'category',
      label: 'Databricks AI & Data Engineering',
      items: [
        'databricks-training/demo-content/00-course-overview',
        // {
        //   type: 'category',
        //   label: 'Trainer Introduction',
        //   items: [
        //     'databricks-training/demo-content/01-trainer-introduction-profile',
        //     'databricks-training/demo-content/01-trainer-introduction-experience',
        //     'databricks-training/demo-content/01-trainer-introduction-projects',
        //   ],
        // },
        {
          type: 'category',
          label: 'Topics & Modules',
          items: [
            'databricks-training/demo-content/02-topics-overview',
          ],
        },
        // {
        //   type: 'category',
        //   label: 'Job Assistance',
        //   items: [
        //     'databricks-training/demo-content/06-job-assistance-overview',
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Demo Walkthrough',
        //   items: [
        //     'databricks-training/demo-content/07-demo-walkthrough',
        //   ],
        // },
        {
          type: 'category',
          label: 'Registration',
          items: [
            'databricks-training/demo-content/09-registration-link',
          ],
        },
        {
          type: 'category',
          label: 'Contact',
          items: [
            'databricks-training/demo-content/10-contact-details',
          ],
        },
      ],
    },
  ],
};
