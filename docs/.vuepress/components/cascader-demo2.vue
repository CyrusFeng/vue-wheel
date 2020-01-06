<template>
    <div class="container">
        <h2>展示完整数据</h2>
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
            <div>
                <c-cascader :complete-source="source"></c-cascader>
            </div>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>

</template>

<script>
  import CIcon from '../../../src/components/icon/c-icon'
  import CCascader from '../../../src/components/cascader/c-cascader'
  import db from '../../../tests/fixtrues/region'

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
        { name: '金华' }
      ]
    }
  ]

  export default {
    name: "demo-cascader",
    components: {
      'c-icon': CIcon,
      'c-cascader': CCascader,
    },
    data() {
      return {
        completeSource: [],
        source,
        code: `<c-cascader :complete-source="source"></c-cascader>
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
    { name: '金华' }
  ]
}
]`
      }
    }
  }

</script>

<style scoped lang="scss">
    .wrap {
        > * {
            margin-bottom: 100px;
        }
    }
</style>