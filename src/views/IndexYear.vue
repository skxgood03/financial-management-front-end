<template>
  <AdaptiveView>

    <dv-border-box11 title="私人财务年度报表" :title-width="400" :animate="false"
                     class="box-title"
    >


      <!-- 上部分 -->
      <div class="box">
        <div>
          <dv-border-box1 class="frame" @click="showDatePicker = true">
            <dv-loading v-if="loading1"></dv-loading>
            <AnnualIncome :data="data1.list" v-else></AnnualIncome>
          </dv-border-box1>
        </div>
        <div>
          <dv-border-box2 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <MonthlyIncome :data="data1.list" v-else></MonthlyIncome>
          </dv-border-box2>

        </div>
        <div>
          <dv-border-box3 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <MonthlyAnnualExpenditure :data="data1.list" v-else></MonthlyAnnualExpenditure>
          </dv-border-box3>

        </div>
      </div>

      <!--      &lt;!&ndash; 中部分 &ndash;&gt;-->
      <!--      <div class="box">-->

      <!--        <div>-->
      <!--          <dv-border-box4 class="frame">-->
      <!--            <dv-loading v-if="loading1"></dv-loading>-->
      <!--            <IndexData4 :data="data1.list" v-else></IndexData4>-->
      <!--          </dv-border-box4>-->

      <!--        </div>-->
      <!--        <div>-->
      <!--          <dv-border-box5 class="frame">-->
      <!--            <dv-loading v-if="loading1"></dv-loading>-->
      <!--            <IndexData5 :data="data1.list" v-else></IndexData5>-->
      <!--          </dv-border-box5>-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          <dv-border-box6 class="frame">-->
      <!--            <dv-loading v-if="loading1"></dv-loading>-->
      <!--            <IndexData6 :data="data1.list" v-else></IndexData6>-->
      <!--          </dv-border-box6>-->

      <!--        </div>-->
      <!--      </div>-->
      <!--      &lt;!&ndash; 下部分 &ndash;&gt;-->
      <!--      <div class="box">-->
      <!--        <div>-->
      <!--          <dv-border-box7 class="frame" backgroundColor="#ffffff">-->
      <!--            <dv-loading v-if="loading1"></dv-loading>-->
      <!--            <IndexData7 :data="data1.list" v-else></IndexData7>-->
      <!--          </dv-border-box7>-->

      <!--        </div>-->
      <!--        <div>-->
      <!--          <dv-border-box8 class="frame">-->
      <!--            <dv-loading v-if="loading1"></dv-loading>-->
      <!--            <IndexData8 :data="data1.list" v-else></IndexData8>-->
      <!--          </dv-border-box8>-->

      <!--        </div>-->
      <!--        <div>-->
      <!--          <dv-border-box9 class="frame">-->
      <!--            <dv-loading v-if="loading1"></dv-loading>-->
      <!--            <IndexData9 :data="data1.list" v-else></IndexData9>-->
      <!--          </dv-border-box9>-->

      <!--        </div>-->
      <!--      </div>-->

    </dv-border-box11>
    <!-- Element Plus 日期选择器 -->
    <el-dialog v-model="showDatePicker" title="选择年月" width="30%">
      <el-date-picker
          v-model="selectedDate"
          type="month"
          placeholder="选择年月"
          format="YYYY-MM"
          value-format="YYYY-MM"
          @change="handleDateChange"

      />
      <!--      <el-date-picker-->
      <!--          v-model="year"-->
      <!--          type="years"-->
      <!--          placeholder="选择年"-->
      <!--          format="YYYY"-->
      <!--          value-format="YYYY"-->
      <!--           @change="handleDateChange"-->
      <!--      />-->
      <template #footer>
        <el-button @click="showDatePicker = false">取消</el-button>
        <el-button type="primary" @click="confirmDate">确定</el-button>
      </template>
    </el-dialog>

  </AdaptiveView>
</template>
<script lang="ts">
import {ref, onMounted, reactive} from "vue"
import AnnualIncome from './AnnualIncome.vue';
import MonthlyIncome from './MonthlyIncome.vue';
import MonthlyAnnualExpenditure from './MonthlyAnnualExpenditure.vue';


import AdaptiveView from '@/components/AdaptiveView.vue';
import {total} from './api';
import 'element-plus/theme-chalk/el-date-picker.css'; // 引入样式


export default {
  setup() {
    const loading1 = ref(true)
    const showDatePicker = ref(false); // 控制弹框显示
    const selectedDate = ref<Date | null>(null); // 选中的日期
    const year = ref<Date | null>(null); // 选中的日期

    const handleDateChange = (date: Date) => {
      console.log('选中的日期:', date);
    };

    const getCurrentYearMonth = (): string => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 确保月份是两位数
      return `${year}-${month}`;
    };

// 调用函数获取当前年月


    const confirmDate = () => {
      if (selectedDate.value) {
        console.log('确认的日期:', selectedDate.value) //string;
        const dateString = String(selectedDate.value).trim()
        getdata(dateString)
      }
      showDatePicker.value = false;
      if (year.value) {
        console.log('确认的日期:', year.value) //string;
        const dateString = String(year.value).trim()
        getdata(dateString)
      }
      showDatePicker.value = false;

    };

    let data1: any = reactive({
      list: ""
    })

    const getdata = async (date: string) => {
      loading1.value = true
      const {data} = await total(date);

      loading1.value = false
      data1.list = data
      // data1.value.list = data.list; // 更新数据
    };
    onMounted(() => {

      getdata("2024")


    })
    return {
      data1, loading1, showDatePicker,
      year,
      selectedDate,
      handleDateChange,
      confirmDate
    }
  },

  components: {
    AdaptiveView,
    AnnualIncome,
    MonthlyIncome,
    MonthlyAnnualExpenditure
    // IndexData5,
    // IndexData6,
    // IndexData7,
    // IndexData8,
    // IndexData9

  }
}
</script>
<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.frame {
  height: 330px;
  width: 615px;
  margin-top: 10px;
}

.box-title {
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}

/* 自定义样式 */
.custom-date-picker .el-input {
  border-radius: 8px; /* 圆角 */
  padding: 10px; /* 内边距 */
  border: 1px solid #dcdfe6; /* 边框颜色 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 阴影 */
  transition: all 0.3s ease;
}

.custom-date-picker .el-input:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* 悬停时阴影增强 */
  border-color: #409eff; /* 悬停时边框变色 */
}

.custom-date-picker .el-input__inner {
  font-size: 16px; /* 字体大小 */
  color: #606266; /* 字体颜色 */
}

.custom-date-picker .el-date-editor--month .el-input__inner {
  border-radius: 8px; /* 月选择器的圆角 */
}

.custom-date-picker .el-input.is-focus {
  border-color: #409eff; /* 聚焦时的边框颜色 */
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2); /* 聚焦时阴影增强 */
}

.custom-date-picker .el-picker-panel {
  border-radius: 8px; /* 弹框圆角 */
  background-color: #fff; /* 背景色 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* 弹框阴影 */
  padding: 10px; /* 内边距 */
}

</style>