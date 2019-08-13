<template>
    <div>
        <!--<c-icon name="loading"></c-icon>-->
        <c-cascader :complete-source="completeSource" :load-data="loadData"></c-cascader>

        <c-cascader :complete-source="source"></c-cascader>
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


        <!--<c-nav :active-items.sync="activeItems" :vertical="false">-->
        <!--<c-nav-item name="home">首页</c-nav-item>-->
        <!--<c-sub-nav name="about">-->
        <!--<template slot="title">关于</template>-->

        <!--<c-nav-item name="culture">企业文化</c-nav-item>-->
        <!--<c-nav-item name="dev">开发团队</c-nav-item>-->
        <!--<c-sub-nav name="contact">-->
        <!--<template slot="title">联系方式</template>-->
        <!--<c-nav-item name="qq">QQ</c-nav-item>-->
        <!--<c-nav-item name="wechat">WeChat</c-nav-item>-->
        <!--<c-sub-nav name="phone">-->
        <!--<template slot="title">手机号</template>-->
        <!--<c-nav-item name="in">国内：111</c-nav-item>-->
        <!--<c-nav-item name="out">国外：222</c-nav-item>-->
        <!--</c-sub-nav>-->
        <!--</c-sub-nav>-->
        <!--</c-sub-nav>-->
        <!--<c-nav-item name="other">其他</c-nav-item>-->
        <!--</c-nav>-->

        <!--<c-nav :active-items.sync="activeItems" :vertical="true" style="width: 8em;">-->
        <!--<c-nav-item name="home">-->
        <!--<a href="">首页</a>-->
        <!--</c-nav-item>-->
        <!--<c-sub-nav name="about">-->
        <!--<template slot="title">关于</template>-->

        <!--<c-nav-item name="culture">企业文化</c-nav-item>-->
        <!--<c-nav-item name="dev">开发团队</c-nav-item>-->
        <!--<c-sub-nav name="contact">-->
        <!--<template slot="title">联系方式</template>-->
        <!--<c-nav-item name="qq">QQ</c-nav-item>-->
        <!--<c-nav-item name="wechat">WeChat</c-nav-item>-->
        <!--<c-sub-nav name="phone">-->
        <!--<template slot="title">手机号</template>-->
        <!--<c-nav-item name="in">国内：111</c-nav-item>-->
        <!--<c-nav-item name="out">国外：222</c-nav-item>-->
        <!--</c-sub-nav>-->
        <!--</c-sub-nav>-->
        <!--</c-sub-nav>-->
        <!--<c-nav-item name="other">其他</c-nav-item>-->
        <!--</c-nav>-->

        <c-table :columns="columns"
                 :data-source.sync="dataSource"
                 :selected-table-items.sync="selectedTableItems"
                 :columns.sync="columns"
                 @update:columns="order"
                 :is-frontend-sort="isFrontendSort"
                 :loading="loading"
                 height="300">
            <template slot-scope="item">
                <a href="" @click="edit(item)">编辑</a>
            </template>
        </c-table>

        <c-pagination :totalPage="totalPage" :currentPage="currentPage" @update:currentPage="getCurrentPage"></c-pagination>
        <!--<c-popover position="left" event-type="click">点击-->
            <!--<template name="pop">出现</template>-->
        <!--</c-popover>-->
        <c-popover position="left" event-type="click">
           弹出
            <template slot="pop">
                弹出内容
            </template>
        </c-popover>
        <c-popover position="top" event-type="hover">
            弹出
            <template slot="pop">
                弹出内容
            </template>
        </c-popover>
        <c-popover position="right" event-type="click">
            弹出
            <template slot="pop">
                弹出内容
            </template>
        </c-popover>
        <c-popover position="bottom" event-type="hover">
            弹出
            <template slot="pop">
                弹出内容
            </template>
        </c-popover>
        <div>
            <c-tabs :selected.sync="selectedTab">
                <c-tabs-nav>
                    <c-tabs-nav-item name="tab1">
                        <c-icon name="setting" class="tabs-icon"></c-icon>
                        体育
                    </c-tabs-nav-item>
                    <c-tabs-nav-item name="tab2">财经</c-tabs-nav-item>
                    <!--<div class="icon" slot="extra">我是图标</div>-->
                    <c-icon name="setting" class="tabs-icon" slot="extra"></c-icon>

                </c-tabs-nav>
                <c-tabs-content>
                    <c-tabs-content-item name="tab1">体育文章</c-tabs-content-item>
                    <c-tabs-content-item name="tab2">财经文章</c-tabs-content-item>
                </c-tabs-content>
            </c-tabs>
        </div>
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
  import Tabs from './components/tab/c-tabs'
  import TabsNav from './components/tab/c-tabs-nav'
  import TabsNavItem from './components/tab/c-tabs-nav-item'
  import TabsContent from './components/tab/c-tabs-content'
  import TabsContentItem from './components/tab/c-tabs-content-item'
  import CTable from './components/c-table'
  import CPagination from './components/pagination'

  import CPopover from './components/c-popover'


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
      'c-table': CTable,
      'c-pagination':CPagination,
      'c-popover':CPopover,
      'c-tabs':Tabs,
      'c-tabs-nav':TabsNav,
      'c-tabs-nav-item':TabsNavItem,
      'c-tabs-content':TabsContent,
      'c-tabs-content-item':TabsContentItem,
    },
    data() {
      return {
        completeSource: [],
        source,
        selected: '1',
        reserve: false,
        activeItems: ['home'],
        columns: [
          { text: '姓名', field: 'name', openSort: true, sort: 'asc' ,width:150},
          { text: '分数', field: 'score', openSort: true, sort: 'asc' ,width:150},
        ],
        dataSource: [
          { id: 1, name: 'CyrusFeng', score: 100 },
          { id: 2, name: 'jack', score: 70 },
          { id: 3, name: 'zzz', score: 80 },
          { id: 4, name: 'frank', score: 80 },
          { id: 5, name: 'drank', score: 80 },
          { id: 6, name: 'hrank', score: 80 },
          { id: 7, name: 'brank', score: 80 },
          { id: 8, name: 'brank', score: 80 },
          { id: 9, name: 'trank', score: 80 },
          { id: 10, name: 'nrank', score: 80 },
          { id: 11, name: 'nrank', score: 80 },
          { id: 12, name: 'nrank', score: 80 },
          { id: 13, name: 'nrank', score: 80 },
          { id: 14, name: 'nrank', score: 80 },
        ],
        selectedTableItems: [],
        isFrontendSort: true,
        loading:false,

        currentPage:1,
        totalPage:10,
        selectedTab:'tab1',//tabs
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
      getChangeItem(obj) {
        if (obj.selected) {
          this.selectedTableItem.push(obj.item)
          console.log('add', this.selectedTableItem)

        } else {
          this.selectedTableItem.splice(this.selectedTableItem.indexOf(obj.item), 1)
          console.log('delete', this.selectedTableItem)

        }
      },
      order(columns) {
        this.loading = true
        columns.forEach((column) => {
          if (column.openSort) {
            setTimeout(() => {
                this.loading = false
            }, 1000)
          }
        })
        // this.dataSource = this.dataSource.sort((a,b)=>a-b)
      },
      sortByKey(array, key, order) {
        return array.sort((a, b) => {
          let x = a[key];
          let y = b[key];
          if (order === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
          } else if (order === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
          }
        });
      },
      edit(item){

      },
      getCurrentPage($event){
        this.currentPage = $event
      }
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
    .tabs-icon{
        margin-right: 8px;
    }
</style>