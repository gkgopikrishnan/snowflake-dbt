// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import path from 'path';
import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '🏗️ Data Engineering with Snowflake and DBT',
  tagline: '',
  favicon: 'img/favicon.ico',

  url: 'https://snowflake-dbt-kickoff.netlify.app',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // ✅ Enable Mermaid support in Markdown
  markdown: {
    mermaid: true,
  },

  // ✅ Load Mermaid theme
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    path.resolve(__dirname, 'plugins/webpack-polyfills'),
    path.resolve(__dirname, 'plugins/webpack-aliases.js'),
  ],

  themeConfig: { 
    image: 'img/beems-social-card.jpg',
    navbar: {
      title: 'Beems Technologies',
      logo: {
        alt: 'Beems Technologies Logo',
        src: 'img/image.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'snowflakeTraining',
          position: 'left',
          label: 'About Program',
          to: '/docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contact',
          items: [
            {
              label: '📞 (+91) 91769 04546',
              href: 'tel:(+91) 91769 04546',
            },
            {
              label: '✉️ contact@beems.in',
              href: 'mailto:contact@beems.in',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Beems Technologies — Empowering Data, AI & Cloud Careers`,
    } ,

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
