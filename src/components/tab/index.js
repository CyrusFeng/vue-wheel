import Tabs from './c-tabs.vue'
import TabsContentItem from './c-tabs-content-item.vue'
import TabsContent from './c-tabs-content.vue'
import TabsNav from './c-tabs-nav.vue'
import TabsItem from './c-tabs-nav-item.vue'

Tabs.install = Vue => Vue.component(Tabs.name, Tabs)
TabsContentItem.install = Vue => Vue.component(TabsContentItem.name, TabsContentItem)
TabsContent.install = Vue => Vue.component(TabsContent.name, TabsContent)
TabsNav.install = Vue => Vue.component(TabsNav.name, TabsNav)
TabsItem.install = Vue => Vue.component(TabsItem.name, TabsItem)

export default {Tabs,TabsContentItem,TabsContent,TabsNav,TabsItem}