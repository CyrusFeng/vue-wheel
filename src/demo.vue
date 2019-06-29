<template>
    <div>
        <c-icon name="loading"></c-icon>
        <c-cascader :complete-source="completeSource" :load-data="loadData"></c-cascader>
        <c-cascader :complete-source="source"></c-cascader>
        <c-slides :selected.sync="selected" :reserve="reserve">
            <c-slides-item name="1">
                <div class="box">1</div>
            </c-slides-item>
            <c-slides-item name="2">
                <div class="box">2</div>
            </c-slides-item>
            <c-slides-item name="3">
                <div class="box">3</div>
            </c-slides-item>
        </c-slides>
    </div>
</template>

<script>
  import CIcon from './components/c-icon'
  import CCascader from './components/c-cascader'
  import db from '../tests/fixtrues/region'

  import CSlides from './components/c-slides'
  import CSlidesItem from './components/c-slides-item'


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
      'c-icon': CIcon,
      'c-cascader':CCascader,
      'c-slides':CSlides,
      'c-slides-item':CSlidesItem
    },
    data() {
      return {
        completeSource: [],
        source,
        selected:'1',
        reserve:false
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
    .box{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height:300px;
        background-color: #666666;
    }
</style>