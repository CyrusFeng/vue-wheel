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

          '../components/icon.md',
          '../components/radio.md',
          '../components/slides.md',
          // '../components/nav.md',
          '../components/table.md',
          '../components/pagination.md',
          '../components/popover.md',
          '../components/datepicker.md',
          '../components/cascader.md',
          // '../components/tabs.md',
          '../components/toast.md',
          '../components/upload.md',
        ]
      },
    ]
  }
}