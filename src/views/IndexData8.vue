<template>

    <div ref="refecharts" class="interior">
    </div>
</template>

<script lang="ts">
import { info3 } from "./api"
import { ref, onMounted, nextTick, watch } from "vue"
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
      const datas = props.data.get_expense_by_method
      const myChart = echarts.init(refecharts.value);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
      // 自定义 tooltip 显示，包含支出金额和支出次数
      return `${params.name}<br/>支出金额: ${params.value} 元<br/>支出次数: ${params.data.expense_count} 次`;
    }
        },
        legend: {
          top: '1%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ["40%", "60%"],
            data: datas ,
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
      myChart.setOption(option);
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
    width: 615px
}
</style>