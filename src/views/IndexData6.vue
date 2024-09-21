<template>

  <div ref="refecharts" class="interior">
  </div>
</template>

<script lang="ts">
import {info3} from "./api"
import {ref, onMounted, nextTick, watch} from "vue"
import * as echarts from 'echarts';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
        const transactionPartners = props.data.get_expense_by_category.map((item: any) => item.transaction_partner)
    const total_expense = props.data.get_expense_by_category.map((item: any) => item.total_expense)
    const expense_count = props.data.get_expense_by_category.map((item: any) => item.expense_count) // 添加支出次数数据
    const totalExpense = props.data.get_expense_by_category.reduce((sum: number, item: any) => sum + item.total_expense, 0);
    const loading = ref(true)
    const refecharts = ref()
    const setecharts = () => {
      const myChart = echarts.init(refecharts.value)
      let option = {
        title: {
          text: '正常支出',
          subtext: `总支出 (总计: ${totalExpense} 元)`,
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
          {
            type: 'value',
            name: '次数' // 第二个Y轴，用于展示支出次数
          }
        ],
        series: [
          {
            name: '支出金额',
            type: 'bar',
            data: total_expense,
            yAxisIndex: 0 // 对应第一个Y轴（金额）
          },
          {
            name: '支出次数',
            type: 'line',
            data: expense_count,
            yAxisIndex: 1 // 对应第二个Y轴（次数）
          }
        ]
      }
      option && myChart.setOption(option);
    }
    watch(() => props.data, () => {
      setecharts()
    }, {deep: true})  //开启深度监听，当props更新时，更新echarts图表

    onMounted(() => {
      setecharts()

    })

    return {
      refecharts, loading
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