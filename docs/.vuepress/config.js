module.exports = {
  base:'/vue-wheel/',
  title: 'vue-wheel',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      '/start/',
      {
        title: 'components',
        collapsable: false,
        children: [

          '../components/slides.md',
          '../components/nav.md',
          '../components/table.md',
          '../components/pagination.md',
          '../components/popover.md',
          '../components/cascader.md',
          '../components/tabs.md',
        ]
      },
    ]
  }
}