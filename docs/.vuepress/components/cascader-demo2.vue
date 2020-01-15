<template>
    <div class="container">
        <!--<h2>展示完整数据</h2>-->
        <p>
            <strong>展示完整数据预览：</strong>
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
              name: '长安区',
              children: [
                { name: '桃园镇' },
                { name: '高营镇' }
              ]
            },
            { name: '桥西区' },
            { name: '新华区' },
            {
              name: '鹿泉区',
              children: [
                { name: '获鹿镇' },
                { name: '铜冶镇' }
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
              name: '临安区',
              children: [
                { name: '高虹镇' },
                { name: '天目山镇' }
              ]
            },
            {
              name: '上城区',
              children: [
                { name: '玉皇山' },
                { name: '近江西园' }
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
              name: '长安区',
              children: [
                { name: '桃园镇' },
                { name: '高营镇' }
              ]
            },
            { name: '桥西区' },
            { name: '新华区' },
            {
              name: '鹿泉区',
              children: [
                { name: '获鹿镇' },
                { name: '铜冶镇' }
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
              name: '临安区',
              children: [
                { name: '高虹镇' },
                { name: '天目山镇' }
              ]
            },
            {
              name: '上城区',
              children: [
                { name: '玉皇山' },
                { name: '近江西园' }
              ]
            },
          ]
        },
        { name: '金华' }
      ]
    }
  ]
`
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