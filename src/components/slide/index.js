import Slides from './c-slides.vue'
import SlidesItem from './c-slides-item.vue'

Slides.install = Vue => Vue.component(Slides.name, Slides)
SlidesItem.install = Vue => Vue.component(SlidesItem.name, SlidesItem)


export default {Slides,SlidesItem}

