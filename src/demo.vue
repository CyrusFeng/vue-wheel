<template>
    <div>
        <c-icon name="loading"></c-icon>
        <c-cascader :complete-source="completeSource" :load-data="loadData"></c-cascader>
        <c-cascader :complete-source="source"></c-cascader>
    </div>
</template>

<script>
  import Icon from './components/c-icon'
  import CCascader from './components/g-cascader'
  import db from './region'

  var source = [
    {
      name: '北京',
      children: [
        { name: '东城' },
        { name: '西城' },
        { name: '朝阳' }
      ]
    },
    {
      name: '河北',
      children: [
        { name: '廊坊' },
        { name: '保定' },
        {
          name: '石家庄',
          children: [
            {
              name: '石家庄1区',
              children: [
                { name: '石家庄1区1' },
                { name: '石家庄1区2' }
              ]
            },
            { name: '石家庄2区' },
            { name: '石家庄3区' },
            {
              name: '石家庄4区',
              children: [
                { name: '石家庄4区1' },
                { name: '石家庄4区2' }
              ]
            }
          ]
        }
      ]
    },
    {
      name: '浙江',
      children: [
        {
          name: '杭州',
          children: [
            {
              name: '阿里',
              children: [
                { name: '优酷' },
                { name: '饿了么' }
              ]
            },
            {
              name: '海康威视',
              children: [
                { name: '摄像头' },
                { name: '监控器' }
              ]
            },
          ]
        },
        { name: '金华'}
      ]
    }
  ]
  export default {
    name: "demo",
    components: {
      'c-icon': Icon,
      'c-cascader':CCascader
    },
    data() {
      return {
        completeSource: [],
        source
      }
    },
    created() {
      this.ajax(0).then((result) => {
        this.completeSource = result
      })
    },
    methods: {
      ajax(parentId = 0) {
        return new Promise((resolve, reject) => {

          //模拟ajax请求
          setTimeout(() => {
            let result = db.filter((item) => item.parentId === parentId)
            resolve(result)
          }, 1000)

        })
      },
      loadData(lastItem,callback){
        this.ajax(lastItem.id).then(callback)
      },
    }

  }
</script>

<style scoped>
    *{
        font-size: 16px;
    }
</style>