<template>

    <div ref="refecharts" class="interior">
    </div>
</template>

<script lang="ts">

import { ref, onMounted, watch } from "vue"
import * as echarts from 'echarts';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {

    const loading1 = ref(true)
    const refecharts = ref()
    const echartsfun = () => {
      const datas = props.data.get_transfer_expense_by_partner
      const totalExpense = datas.reduce((sum: number, item: any) => sum + item.value, 0);
      const myChart = echarts.init(refecharts.value);
      const option = {
        title: {
          text: '转账支出',
          subtext: `非正常支出 (总计: ${totalExpense} 元)`,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            // 自定义 tooltip 显示，包含支出金额和支出次数
            return `${params.name}<br/>支出金额: ${params.value} 元<br/>支出次数: ${params.data.expense_count} 次<br/>`;
          }

        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '转账',
            type: 'pie',
            radius: '50%',
            data: datas,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.clear(); //是否把之前的缓存给清除掉，提高性能，清除掉后在重新进行渲染,如何需要更换不同的表，建议加上，清除缓存
      myChart.setOption(option, true);
    }
    watch(() => props.data, () => {
      echartsfun()
    }, {deep: true})  //开启深度监听，当props更新时，更新echarts图表

    onMounted(() => {
      echartsfun()
    })

    return {
      refecharts, loading1
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