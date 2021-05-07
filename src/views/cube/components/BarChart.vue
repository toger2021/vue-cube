<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    datax: {
      type: Array,
      default: function() {
        return [{
          type: 'category',
          data: ['红', '蓝', '黄', '绿', '青', '紫'],
          axisTick: {
            alignWithLabel: true
          }
        }]
      }
    },
    dataseries: {
      type: Array,
      default: function() {
        return [{
          name: '数量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration: 6000
        }]
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    // 观察option的变化
    dataseries: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true // 对象内部属性的监听，关键。
    },
    datax: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: this.datax,
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: this.dataseries
      })
    }
  }
}
</script>
