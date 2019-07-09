<template>
    <div>
        <!--<c-icon name="loading"></c-icon>-->
        <!--<c-cascader :complete-source="completeSource" :load-data="loadData"></c-cascader>-->

        <!--<c-cascader :complete-source="source"></c-cascader>-->
        <!--<c-slides :selected.sync="selected" :reserve="reserve" :autoPlayDelay="2000">-->
            <!--<c-slides-item name="1">-->
                <!--<div class="box">1</div>-->
            <!--</c-slides-item>-->
            <!--<c-slides-item name="2">-->
                <!--<div class="box">2</div>-->
            <!--</c-slides-item>-->
            <!--<c-slides-item name="3">-->
                <!--<div class="box">3</div>-->
            <!--</c-slides-item>-->
        <!--</c-slides>-->

        <!--<div data-v-f42f38c8="" class="c-slides">-->
            <!--<div data-v-f42f38c8="" class="c-slides-window">-->
                <!--<div data-v-f42f38c8="" class="c-slides-wrapper">&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;</div>-->
            <!--</div>-->
            <!--<div data-v-f42f38c8="" class="dot-wrap">-->
                <!--<span data-v-f42f38c8="">-->
                    <!--<svg data-v-5cc1379a="" data-v-f42f38c8="" class="c-icon icon">-->
                        <!--<use data-v-5cc1379a="" xlink:href="#icon-left"></use>-->
                    <!--</svg>-->
                <!--</span>-->
                <!--<span data-v-f42f38c8="">-->
                    <!--<svg data-v-5cc1379a="" data-v-f42f38c8="" class="c-icon icon">-->
                        <!--<use data-v-5cc1379a="" xlink:href="#icon-right"></use>-->
                    <!--</svg>-->
                <!--</span>-->
            <!--</div>-->
        <!--</div>-->
        <!--<c-nav :active-items="activeItems" @update:activeItems="activeItems=$event" :multiple="false">-->


        <c-nav :active-items.sync="activeItems" :vertical="false">
            <c-nav-item name="home">首页</c-nav-item>
            <c-sub-nav name="about">
                <template slot="title">关于</template>

                <c-nav-item name="culture">企业文化</c-nav-item>
                <c-nav-item name="dev">开发团队</c-nav-item>
                <c-sub-nav name="contact">
                    <template slot="title">联系方式</template>
                    <c-nav-item name="qq">QQ</c-nav-item>
                    <c-nav-item name="wechat">WeChat</c-nav-item>
                    <c-sub-nav name="phone">
                        <template slot="title">手机号</template>
                        <c-nav-item name="in">国内：111</c-nav-item>
                        <c-nav-item name="out">国外：222</c-nav-item>
                    </c-sub-nav>
                </c-sub-nav>
            </c-sub-nav>
            <c-nav-item name="other">其他</c-nav-item>
        </c-nav>

        <c-nav :active-items.sync="activeItems" :vertical="true" style="width: 8em;">
            <c-nav-item name="home">
                <a href="">首页</a>
            </c-nav-item>
            <c-sub-nav name="about">
                <template slot="title">关于</template>

                <c-nav-item name="culture">企业文化</c-nav-item>
                <c-nav-item name="dev">开发团队</c-nav-item>
                <c-sub-nav name="contact">
                    <template slot="title">联系方式</template>
                    <c-nav-item name="qq">QQ</c-nav-item>
                    <c-nav-item name="wechat">WeChat</c-nav-item>
                    <c-sub-nav name="phone">
                        <template slot="title">手机号</template>
                        <c-nav-item name="in">国内：111</c-nav-item>
                        <c-nav-item name="out">国外：222</c-nav-item>
                    </c-sub-nav>
                </c-sub-nav>
            </c-sub-nav>
            <c-nav-item name="other">其他</c-nav-item>
        </c-nav>

    </div>
</template>

<script>
  import CIcon from './components/c-icon'
  import CCascader from './components/c-cascader'
  import db from '../tests/fixtrues/region'

  import CSlides from './components/c-slides'
  import CSlidesItem from './components/c-slides-item'
  import CNav from './components/nav/nav'
  import CNavItem from './components/nav/nav-item'
  import CSubNav from './components/nav/sub-nav'


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
    name: "demo",
    components: {
      'c-icon': CIcon,
      'c-cascader': CCascader,
      'c-slides': CSlides,
      'c-slides-item': CSlidesItem,
      'c-nav': CNav,
      'c-nav-item': CNavItem,
      'c-sub-nav': CSubNav,
    },
    data() {
      return {
        completeSource: [],
        source,
        selected: '1',
        reserve: false,
        activeItems:['home']
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
      loadData(lastItem, callback) {
        this.ajax(lastItem.id).then(callback)
      },
    }

  }
</script>

<style scoped>
    * {
        font-size: 16px;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 300px;
        background-color: #666666;
    }
</style>