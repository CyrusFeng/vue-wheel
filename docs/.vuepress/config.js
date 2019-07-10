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
          '../components/cascader.md',
          '../components/slides.md',
          '../components/nav.md',
        ]
      },
    ]
  }
}