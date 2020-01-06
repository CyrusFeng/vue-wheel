import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount,mount } from '@vue/test-utils'
import Slides from '../../src/components/slide/c-slides'
import CSlidesItem from '../../src/components/slide/c-slides-item'

let expect = chai.expect
chai.use(sinonChai)
import Vue from 'vue'

describe('Slides.vue', () => {
  it('存在', () => {
    // const msg = 'new message'
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    // expect(wrapper.text()).to.include(msg)
    expect(Slides).to.exist
  })
  it('接受c-slides-item组件', (done) => {
    Vue.component('CSlidesItem',CSlidesItem)
    const wrapper = mount(Slides, {
      slots:{
        default:`
          <c-slides-item name="1" class="slide1">
              <div class="box1">1</div>
          </c-slides-item>
          <c-slides-item name="2">
              <div class="box2">2</div>
          </c-slides-item>
          <c-slides-item name="3">
              <div class="box3">3</div>
          </c-slides-item>
        `
      }
    })
    setTimeout(()=>{
      // console.log(wrapper.find('.box1').text())
      expect(wrapper.find('.box1')).to.exist
      done()
    })
  })

  it('selected默认什么显示什么', (done) => {
    Vue.component('CSlidesItem',CSlidesItem)
    const wrapper = mount(Slides, {
      propsData:{
        selected:'3'
      },
      slots:{
        default:`
          <c-slides-item name="1" class="slide1">
              <div class="box1">1</div>
          </c-slides-item>
          <c-slides-item name="2">
              <div class="box2">2</div>
          </c-slides-item>
          <c-slides-item name="3">
              <div class="box3">3</div>
          </c-slides-item>
        `
      }
    })
    setTimeout(()=>{
      // console.log(wrapper.find('.box1').text())
      expect(wrapper.find('.box3')).to.exist
      done()
    })
  })

  it('点击第二个显示第二个', (done) => {
    Vue.component('CSlidesItem',CSlidesItem)
    const wrapper = mount(Slides, {
      slots:{
        default:`
          <c-slides-item name="1" class="slide1">
              <div class="box1">1</div>
          </c-slides-item>
          <c-slides-item name="2">
              <div class="box2">2</div>
          </c-slides-item>
          <c-slides-item name="3">
              <div class="box3">3</div>
          </c-slides-item>
        `
      }
    })
    setTimeout(()=>{
      wrapper.find("[data-index='1']").trigger('click')
      expect(wrapper.find('.box2')).to.exist
      done()
    })
  })

  it('自动播放', (done) => {
    const callback = sinon.fake()
    Vue.component('CSlidesItem',CSlidesItem)
    const wrapper = mount(Slides, {
      propsData:{
        autoPlayDelay:500,
      },
      slots:{
        default:`
          <c-slides-item name="1" class="slide1">
              <div class="box1">1</div>
          </c-slides-item>
          <c-slides-item name="2">
              <div class="box2">2</div>
          </c-slides-item>
          <c-slides-item name="3">
              <div class="box3">3</div>
          </c-slides-item>
        `
      },
      listeners:{
        'update:selected':callback
      }
    })
    setTimeout(()=>{
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith('2')
      done()
    },500)
  })
})
