<template>
    <div class="container">
        <h2>纵向</h2>
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
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
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CNav from '../../../src/components/nav/nav'
  import CNavItem from '../../../src/components/nav/nav-item'
  import CSubNav from '../../../src/components/nav/sub-nav'
  export default {
    name: "nav-demo",
    components: {
      'c-nav': CNav,
      'c-nav-item': CNavItem,
      'c-sub-nav': CSubNav,
    },
    data() {
      return {
        activeItems:['home'],
        code:`<c-nav :active-items.sync="activeItems" :vertical="true" style="width: 8em;">
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
</c-nav>`
      }
    },
  }
</script>

<style scoped lang="scss">
    /*@import "../../../src/reset.css";*/
    .container{
        font-size: 16px;
        .first{
            margin-bottom: 240px;
        }
        .wrap{
            p{
                margin: 0 !important;
                line-height: 1 !important;
            }
        }
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