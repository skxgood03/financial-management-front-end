<template>
  <div ref="main" class="interior">
  </div>

</template>
<script lang="ts">
import * as echarts from 'echarts';
import {ref, onMounted, watch} from "vue"

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {

    const main = ref()
    const echartsfun = () => {
      const transactionPartners = props.data.annual_income_month.map((item: any) => item.month)
      const total_expense = props.data.annual_income_month.map((item: any) => item.total_expense)
      // const expense_count = props.data.sum_expense_by_category.map((item: any) => item.expense_count) // 添加支出次数数据
      const totalExpense = props.data.annual_income_month.reduce((sum: number, item: any) => sum + item.total_expense, 0);
      const myChart = echarts.init(main.value);
      const option = {
        title: {
          text: '总收入',
          subtext: `(总计: ${totalExpense} 元)`,
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
        yAxis: [
          {
            type: 'value',
            name: '金额（元）' // Y轴名称
          },
          // {
          //   type: 'value',
          //   name: '次数' // 第二个Y轴，用于展示支出次数
          // }
        ],
        series: [
          {
            name: '收入金额',
            type: 'bar',
            data: total_expense,
            yAxisIndex: 0 // 对应第一个Y轴（金额）
          },
          // {
          //   name: '支出次数',
          //   type: 'line',
          //   data: expense_count,
          //   yAxisIndex: 1 // 对应第二个Y轴（次数）
          // }
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
      main
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