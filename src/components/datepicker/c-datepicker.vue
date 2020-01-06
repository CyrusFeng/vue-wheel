<template>
    <div class="wheel-date-picker-wrap" ref="pickerWrap">
        <c-popover position="bottom" event-type="click"
                   :pop-class-name="addPrefix('pop')" :container="theWrapper">
            <c-input :value="formattedDate"></c-input>
            <template slot="pop">
                <div class="wheel-date-picker-nav">
                    <div class="wheel-choose-year wheel-header" v-show="showYear">
                        <span @click="onClickPrevTenYear"><<</span>
                        <div class="middle">
                            <span>{{yearAreaBase}}</span>
                            <span>-</span>
                            <span>{{yearAreaBase+9}}</span>
                        </div>
                        <span @click="onClickNextTenYear">>></span>
                    </div>
                    <div class="wheel-choose-month wheel-header" v-show="showMonth">
                        <span><<</span>
                        <div class="middle">
                            <span>2019</span>
                        </div>
                        <span>>></span>
                    </div>
                    <div class="wheel-choose-day wheel-header" v-show="showDay">
                        <span :class="addPrefix('prevYear','nav')" @click="onClickPrevYear()"><<</span>
                        <span :class="addPrefix('prevMonth','nav')" @click="onClickPrevMonth()"><</span>
                        <div class="middle">
                            <div class="block" @click="onClickToChooseYear">
                                <span>{{showDate.year}}</span>
                                <span>年</span>
                            </div>
                            <div class="block" @click="onClickToChooseMonth">
                                <span>{{showDate.month+1}}</span>
                                <span>月</span>
                            </div>
                        </div>
                        <span :class="addPrefix('nextMonth','nav')" @click="onClickNextMonth()">></span>
                        <span :class="addPrefix('nextYear','nav')" @click="onClickNextYear()">>></span>
                    </div>
                </div>
                <div class="wheel-date-picker-panels">
                    <div class="wheel-date-picker-content year-list" v-show="showYear" @click="">
                        <div class="row">
                            <span v-for="n in yearArray.slice(0,3)" :key="n" @click="setYear(n)"
                                  :class="{sub:n<yearAreaBase,selected:showDate.year===n}">{{n}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in yearArray.slice(3,6)" :key="n" @click="setYear(n)"
                                  :class="{selected:showDate.year===n}">{{n}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in yearArray.slice(6,9)" :key="n" @click="setYear(n)"
                                  :class="{selected:showDate.year===n}">{{n}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in yearArray.slice(9,12)" :key="n" @click="setYear(n)"
                                  :class="{sub:n>yearAreaBase+9,selected:showDate.year===n}">{{n}}</span>
                        </div>
                    </div>
                    <div class="wheel-date-picker-content month-list" v-show="showMonth" @click="onClickToChooseDay">
                        <div class="row">
                            <span :class="{selected:showDate.month===0}" @click="setMonth(1)">一月</span>
                            <span :class="{selected:showDate.month===1}" @click="setMonth(2)">二月</span>
                            <span :class="{selected:showDate.month===2}" @click="setMonth(3)">三月</span>
                        </div>
                        <div class="row">
                            <span :class="{selected:showDate.month===3}" @click="setMonth(4)">四月</span>
                            <span :class="{selected:showDate.month===4}" @click="setMonth(5)">五月</span>
                            <span :class="{selected:showDate.month===5}" @click="setMonth(6)">六月</span>
                        </div>
                        <div class="row">
                            <span :class="{selected:showDate.month===6}" @click="setMonth(7)">七月</span>
                            <span :class="{selected:showDate.month===7}" @click="setMonth(8)">八月</span>
                            <span :class="{selected:showDate.month===8}" @click="setMonth(9)">九月</span>
                        </div>
                        <div class="row">
                            <span :class="{selected:showDate.month===9}" @click="setMonth(10)">十月</span>
                            <span :class="{selected:showDate.month===10}" @click="setMonth(11)">十一月</span>
                            <span :class="{selected:showDate.month===11}" @click="setMonth(12)">十二月</span>
                        </div>
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
                            <span v-for="n in visibleDays.slice(0,7)" :key="n.getDate()"
                                  :class="{currentMonth:isCurrentMonth(n),selected:isSelected(n)}"
                                  @click="changeDate(n)">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(7,14)" :key="n.getDate()"
                                  :class="{currentMonth:isCurrentMonth(n),selected:isSelected(n)}"
                                  @click="changeDate(n)">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(14,21)" :key="n.getDate()"
                                  :class="{currentMonth:isCurrentMonth(n),selected:isSelected(n)}"
                                  @click="changeDate(n)">{{n.getDate()}}</span>

                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(21,28)" :key="n.getDate()"
                                  :class="{currentMonth:isCurrentMonth(n),selected:isSelected(n)}"
                                  @click="changeDate(n)">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(28,35)" :key="n.getDate()"
                                  :class="{currentMonth:isCurrentMonth(n),selected:isSelected(n)}"
                                  @click="changeDate(n)">{{n.getDate()}}</span>
                        </div>
                        <div class="row">
                            <span v-for="n in visibleDays.slice(35,42)" :key="n.getDate()"
                                  :class="{currentMonth:isCurrentMonth(n),selected:isSelected(n)}"
                                  @click="changeDate(n)">{{n.getDate()}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </c-popover>
    </div>
</template>

<script>
  import Input from '../input/c-input'
  import Popover from '../popover/c-popover'
  import auxiliary from './auxiliary'

  export default {
    name: "c-datepicker",
    components: {
      'c-input': Input,
      'c-popover': Popover
    },
    data() {
      let [year, month] = auxiliary.getYearMonthDay(this.value)
      console.log('month', month)
      return {
        mode: 'day',
        showYear: false,
        showMonth: false,
        showDay: true,
        // value: new Date(),
        datesArr: [],
        theWrapper: null,
        showDate: {
          year,
          month
        },
        yearAreaBase: 0
      }
    },
    props: {
      value: {
        type: Date
      }
    },
    computed: {
      visibleDays() {
        let date = new Date(this.showDate.year, this.showDate.month, 1)
        console.log('date', date)
        let first = auxiliary.getFirstDateOfMonth(date)
        let last = auxiliary.getLastDateOfMonth(date)
        let [year, month, day] = auxiliary.getYearMonthDay(first)
        console.log('monthmonthmonth', month)
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
      formattedDate() {
        const [year, month, day] = auxiliary.getYearMonthDay(this.value)
        return `${year}-${month + 1}-${day}`
      },
      yearArray() {
        return Array.from({ length: 12 },
          (val, index) => this.yearAreaBase - 1 + index
        )
      },
    },
    watch: {
      value() {
        let [year, month] = auxiliary.getYearMonthDay(this.value)
        console.log('watch value', month)
        this.showDate.year = year
        this.showDate.month = month
      },
      showYear(val) {
        if (val) {
          //已有，则不赋值
          this.yearAreaBase = this.yearAreaBase || Math.floor(this.showDate.year / 10) * 10
          console.log(this.yearAreaBase)
        }
      },
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
      addPrefix(...classNames) {
        return classNames.map((className) => {
          return 'wheel-date-picker-' + className
        })
      },
      changeDate(date) {
        // this.value = date
        console.log('changeDate', date)
        this.$emit('update:value', date)

      },
      isCurrentMonth(date) {
        const [year1, month1] = auxiliary.getYearMonthDay(date)
        const [year2, month2] = auxiliary.getYearMonthDay(new Date(this.showDate.year, this.showDate.month, 1))

        return year1 === year2 && month1 === month2
      },
      isSelected(date) {
        const [year1, month1, date1] = auxiliary.getYearMonthDay(date)
        const [year2, month2, date2] = auxiliary.getYearMonthDay(this.value)

        return year1 === year2 && month1 === month2 && date1 === date2
      },
      onClickPrevYear() {
        this.showDate.year -= 1
      },
      onClickPrevMonth() {
        let newDate = auxiliary.addMonth(new Date(this.showDate.year, this.showDate.month, 1), -1)
        let newMonth = newDate.getMonth()
        let newYear = newDate.getFullYear()
        console.log(newMonth);
        this.showDate.year = newYear
        this.showDate.month = newMonth
      },
      onClickNextMonth() {
        let newDate = auxiliary.addMonth(new Date(this.showDate.year, this.showDate.month, 1), 1)
        let newMonth = newDate.getMonth()
        let newYear = newDate.getFullYear()
        console.log(newMonth);
        this.showDate.year = newYear
        this.showDate.month = newMonth
      },
      onClickNextYear() {
        this.showDate.year += 1
      },
      onClickPrevTenYear(){
        this.yearAreaBase -= 10
      },
      onClickNextTenYear(){
        this.yearAreaBase += 10
      },
      setYear(n) {
        // this.value.setFullYear(n)

        if (n < this.yearAreaBase) {
          setTimeout(() => {
            this.yearAreaBase -= 10
          }, 100)

          // this.showYear = true
        } else if (n > this.yearAreaBase + 9) {
          setTimeout(() => {
            this.yearAreaBase += 10
          }, 100)
          // this.showYear = true
        } else {
          let newDate = new Date(this.value)
          newDate.setFullYear(n)

          console.log('newDate', newDate)
          // this.$emit('update:value', newDate)
          let [year, month] = auxiliary.getYearMonthDay(newDate)
          console.log('watch value', month)
          this.showDate.year = year
          this.showDate.month = month

          this.showYear = false
          this.showMonth = false
          this.showDay = true
        }
      },
      setMonth(n){
        let newDate = new Date(this.value)
        newDate.setMonth(n-1)

        console.log('newDate', newDate)
        // this.$emit('update:value', newDate)

        let [year, month] = auxiliary.getYearMonthDay(newDate)
        console.log('watch value', month)
        this.showDate.year = year
        this.showDate.month = month

        this.showYear = false
        this.showMonth = false
        this.showDay = true
      }
    },

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
            max-width: 182px;
            min-width: 182px;
            height: 182px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .row {
                span {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 26px;
                    height: 26px;
                    color: rgba(0, 0, 0, 0.25);
                    transition: all .2s linear;
                    border-radius: 2px;
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
                    &.currentMonth {
                        color: rgba(0, 0, 0, 0.65);
                    }
                    &:hover {
                        background: #dff2f2;
                    }
                    &.selected {
                        background: #36b1bf;
                        color: hsla(0, 0%, 100%, .85);
                    }
                }
            }
            &.year-list {
                .row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        width: 50px;
                        height: 24px;
                        cursor: pointer;
                        background: #fff;
                        transition: all .2s linear;
                        font-size: 14px;
                        border-radius: 2px;
                        color: rgba(0, 0, 0, .65);
                        &.selected {
                            background-color: #dff2f2
                        }
                        &.sub {
                            color: rgba(0, 0, 0, .25);
                        }
                    }
                }
            }
            &.month-list{
                .row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        width: 50px;
                        height: 24px;
                        cursor: pointer;
                        background: #fff;
                        transition: all .2s linear;
                        font-size: 14px;
                        border-radius: 2px;
                        color: rgba(0, 0, 0, .65);
                        &.selected {
                            background-color: #dff2f2
                        }
                        &.sub {
                            color: rgba(0, 0, 0, .25);
                        }
                    }
                }
            }
        }
        &-nav {
            /*display: inline-flex;*/
            /*justify-content: center;*/
            /*align-items: center;*/
            /*width: 20px;*/
            /*height: 20px;*/
        }
        /deep/ &-pop {
            padding: 0;
        }

    }

    .wheel-header {
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 26px;
        .middle {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
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