<template>
    <div class="container">
        <h2>支持图标</h2>
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
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
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CIcon from '../../../src/components/icon/c-icon'
  import Tabs from '../../../src/components/tab/c-tabs'
  import TabsNav from '../../../src/components/tab/c-tabs-nav'
  import TabsNavItem from '../../../src/components/tab/c-tabs-nav-item'
  import TabsContent from '../../../src/components/tab/c-tabs-content'
  import TabsContentItem from '../../../src/components/tab/c-tabs-content-item'
  export default {
    name: "tabs-demo",
    components: {
      'c-icon': CIcon,
      'c-tabs':Tabs,
      'c-tabs-nav':TabsNav,
      'c-tabs-nav-item':TabsNavItem,
      'c-tabs-content':TabsContent,
      'c-tabs-content-item':TabsContentItem,
    },
    data() {
      return {
        code:`<c-tabs :selected.sync="selectedTab">
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
</c-tabs>`,
        selectedTab:'tab1',//tabs
      }
    },
  }
</script>

<style lang="scss" scoped>
    .container{
        /*font-size: 16px;*/
        .wrap{
            font-size: 16px;
        }
        pre{
            code{
                font-size: 14px;
            }
        }
    }
    .tabs-icon{
        margin-right: 8px;
    }
</style>