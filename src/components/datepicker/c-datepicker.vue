<template>
    <div class="wheel-date-picker-wrap" ref="pickerWrap">
        <c-popover position="bottom" event-type="click"
                   :pop-class-name="addPrefix('pop')" :container="theWrapper">
            <c-input></c-input>
            <template slot="pop">
                <div class="wheel-date-picker-nav">
                    <div class="wheel-choose-year wheel-header" v-show="showYear">
                        <span><<</span>
                        <div class="middle">
                            <span>2019</span>
                            <span>-</span>
                            <span>2029</span>
                        </div>
                        <span>>></span>
                    </div>
                    <div class="wheel-choose-month wheel-header" v-show="showMonth">
                        <span><<</span>
                        <div class="middle">
                            <span>2019</span>
                        </div>
                        <span>>></span>
                    </div>
                    <div class="wheel-choose-day wheel-header" v-show="showDay">
                        <span><<</span>
                        <span><</span>
                        <div class="middle">
                            <div class="block" @click="onClickToChooseYear">
                                <span>2019</span>
                                <span>年</span>
                            </div>
                            <div class="block" @click="onClickToChooseMonth">
                                <span>12</span>
                                <span>月</span>
                            </div>
                        </div>
                        <span>></span>
                        <span>>></span>
                    </div>
                </div>
                <div class="wheel-date-picker-panels">
                    <div class="wheel-date-picker-content" v-show="showYear" @click="onClickToChooseDay">
                        年
                    </div>
                    <div class="wheel-date-picker-content" v-show="showMonth" @click="onClickToChooseDay">
                        月
                    </div>
                    <div class="wheel-date-picker-content" v-show="showDay">
                        <!--<span class="date" v-for="date in datesArr">{{date.getDate()}}</span>-->
                        <div class="row">
                            <span>一</span>
                            <span>二</span>
                            <span>三</span>
                            <span>四</span>
                            <span>五</span>
                            <span>六</span>
                            <span>日</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(0,7)" :key="n.getDate()" :class="{}"
                                  @click="changeDate(n.getDate(),'first')">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(7,14)" :key="n.getDate()" :class="{}"
                                  @click="changeDate(n.getDate())">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(14,21)" :key="n.getDate()" :class="{}"
                                  @click="changeDate(n.getDate())">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(21,28)" :key="n.getDate()" :class="{}"
                                  @click="changeDate(n.getDate())">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(28,35)" :key="n.getDate()" :class="{}"
                                  @click="changeDate(n.getDate(),'last')">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(35,42)" :key="n.getDate()" :class=""
                                  @click="changeDate(n.getDate(),'last')">{{n.getDate()}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </c-popover>
    </div>
</template>

<script>
  import Input from '../c-input'
  import Popover from '../c-popover'
  import auxiliary from './auxiliary'

  export default {
    name: "c-datepicker",
    components: {
      'c-input': Input,
      'c-popover': Popover
    },
    data() {
      return {
        mode: 'day',
        showYear: false,
        showMonth: false,
        showDay: true,
        value: new Date(2019, 1, 1),
        datesArr: [],
        theWrapper:null
      }
    },
    computed: {
      visibleDays() {
        let date = this.value
        let first = auxiliary.getFirstDateOfMonth(date)
        let last = auxiliary.getLastDateOfMonth(date)
        let [year, month, day] = auxiliary.getYearMonthDay(first)
        let frontDaysNumOfMonth = first.getDay() === 0 ? 6 : first.getDay() - 1
        let x = day - frontDaysNumOfMonth
        let xDate = new Date(year, month, x)
        console.log(xDate)
        let array = []
        for (let i = 0; i < 42; i++) {
          let [year, month, day] = auxiliary.getYearMonthDay(xDate)
          array.push(new Date(year, month, day + i))
        }
        return array
        // console.log(array)
      },
      // theWrapper(){
      //   return this.$refs.pickerWrap
      // }
    },
    mounted() {
      this.theWrapper = this.$refs.pickerWrap
    },
    methods: {
      onClickToChooseYear() {
        this.showYear = true
        this.showMonth = false
        this.showDay = false
      },
      onClickToChooseMonth() {
        this.showYear = false
        this.showMonth = true
        this.showDay = false
      },
      onClickToChooseDay() {
        this.showYear = false
        this.showMonth = false
        this.showDay = true
      },
      addPrefix(className) {
        return 'wheel-date-picker-' + className
      }
    }
  }
</script>

<style scoped lang="scss">
    * {
        font-size: 12px;
    }

    .wheel-date-picker {
        &-wrap {

        }
        &-content {
            max-width: 140px;
            .row {
                span {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 20px;
                    &.selected {
                        background: #dff2f2;
                    }
                    &.sub {
                        color: rgba(0, 0, 0, 0.25);
                    }
                    &.value {
                        background: #36b1bf;
                        color: rgba(255, 255, 255, 0.85);
                    }
                }
            }
        }
        /deep/ &-pop{
            padding: 0;
        }
    }

    .wheel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /*.wheel-date-picker-content {*/
        /*max-width: 140px;*/
        /*.row {*/
            /*span {*/
                /*display: inline-flex;*/
                /*justify-content: center;*/
                /*align-items: center;*/
                /*width: 20px;*/
                /*height: 20px;*/
                /*&.selected {*/
                    /*background: #dff2f2;*/
                /*}*/
                /*&.sub {*/
                    /*color: rgba(0, 0, 0, 0.25);*/
                /*}*/
                /*&.value {*/
                    /*background: #36b1bf;*/
                    /*color: rgba(255, 255, 255, 0.85);*/
                /*}*/
            /*}*/
        /*}*/
    /*}*/
</style>