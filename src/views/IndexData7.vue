<template>

  <div ref="refecharts" class="interior">
  </div>
</template>

<script lang="ts">
import {ref, onMounted, watch} from "vue"
import * as echarts from 'echarts';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {

    const refecharts = ref()
    const echartsfun = () => {
      const transactionPartners = props.data.get_income_per_day.map((item: any) => item.transaction_date)
      const total_expense = props.data.get_income_per_day.map((item: any) => item.daily_income)
      const totalExpense = props.data.get_income_per_day.reduce((sum: number, item: any) => sum + item.daily_income, 0);
      const myChart = echarts.init(refecharts.value);
      const option = {
        title: {
          text: '支付宝收益',
          subtext: `总收益 (总计: ${totalExpense} 元)`,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: '#fff', // 悬浮框背景色
          borderColor: '#000', // 悬浮框边框颜色
          borderWidth: 1, // 悬浮框边框宽度
          textStyle: { // 悬浮框文字样式
            color: '#000',
            fontSize: 12
          }
        },
        xAxis: {
          type: 'category',

          data: transactionPartners
        },
        yAxis:
            {
              type: 'value',
              name: '金额（元）' // Y轴名称
            },
        series: [
          {
            name: '支出金额',
            type: 'bar',
            data: total_expense
          }
        ]
      };

      option && myChart.setOption(option);
    }
    watch(() => props.data, () => {
      echartsfun()
    }, {deep: true})  //开启深度监听，当props更新时，更新echarts图表

    onMounted(() => {
      echartsfun()
    })

    return {
      refecharts
    }
  }
}
</script>

<style scoped>
.interior {
  height: 330px;
  width: 615px;
  top:20px;
}
</style>