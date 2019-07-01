module.exports = {
  title: 'vue-wheel',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      '/install/',
      {
        title: 'components',
        collapsable: false,
        children: [
          '../components/cascader.md',
          '../components/slides.md',
        ]
      },
    ]
  }
}