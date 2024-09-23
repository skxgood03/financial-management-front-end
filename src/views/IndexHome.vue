<template>
  <AdaptiveView>
    <dv-border-box11 title="私人财务报表" :title-width="400" @click="showDatePicker = true" :animate="false"
                     class="box-title"
    >
      <!-- 上部分 -->
      <div class="box">
        <div>
          <dv-border-box1 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData1 :data="data1.list" v-else></IndexData1>
          </dv-border-box1>
        </div>
        <div>
          <dv-border-box2 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData2 :data="data1.list" v-else></IndexData2>
          </dv-border-box2>

        </div>
        <div>
          <dv-border-box3 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData3 :data="data1.list" v-else></IndexData3>
          </dv-border-box3>

        </div>
      </div>

      <!-- 中部分 -->
      <div class="box">

        <div>
          <dv-border-box4 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData4 :data="data1.list" v-else></IndexData4>
          </dv-border-box4>

        </div>
        <div>
          <dv-border-box5 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData5 :data="data1.list" v-else></IndexData5>
          </dv-border-box5>
        </div>
        <div>
          <dv-border-box6 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData6 :data="data1.list" v-else></IndexData6>
          </dv-border-box6>

        </div>
      </div>
      <!-- 下部分 -->
      <div class="box">
        <div>
          <dv-border-box7 class="frame" backgroundColor="#ffffff">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData7 :data="data1.list" v-else></IndexData7>
          </dv-border-box7>

        </div>
        <div>
          <dv-border-box8 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData8 :data="data1.list" v-else></IndexData8>
          </dv-border-box8>

        </div>
        <div>
          <dv-border-box9 class="frame">
            <dv-loading v-if="loading1"></dv-loading>
            <IndexData9 :data="data1.list" v-else></IndexData9>
          </dv-border-box9>

        </div>
      </div>

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
      <template #footer>
        <el-button @click="showDatePicker = false">取消</el-button>
        <el-button type="primary" @click="confirmDate">确定</el-button>
      </template>
    </el-dialog>

  </AdaptiveView>
</template>
<script lang="ts">
import {ref, onMounted, reactive} from "vue"
import IndexData1 from './IndexData1.vue';
import IndexData2 from './IndexData2.vue';
import IndexData3 from './IndexData3.vue';
import IndexData4 from './IndexData4.vue';
import IndexData5 from './IndexData5.vue';
import IndexData6 from './IndexData6.vue';
import IndexData7 from './IndexData7.vue';
import IndexData8 from './IndexData8.vue';
import IndexData9 from './IndexData9.vue';
import AdaptiveView from '@/components/AdaptiveView.vue';
import {info} from './api';
import 'element-plus/theme-chalk/el-date-picker.css'; // 引入样式

export default {
  setup() {
    const loading1 = ref(true)
    const showDatePicker = ref(false); // 控制弹框显示
    const selectedDate = ref<Date | null>(null); // 选中的日期

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
        console.log('确认的日期:',  selectedDate.value) //string;
        const dateString = String(selectedDate.value).trim()
        getdata(dateString)
      }
      showDatePicker.value = false;

    };

    let data1: any = reactive({
      list: ""
    })

    const getdata = async (date: string) => {
      loading1.value = true
      const {data} = await info(date);

      loading1.value = false
      data1.list = data
      // data1.value.list = data.list; // 更新数据
    };
    onMounted(() => {

      getdata(getCurrentYearMonth())


    })
    return {
      data1, loading1, showDatePicker,
      selectedDate,
      handleDateChange,
      confirmDate
    }
  },

  components: {
    AdaptiveView,
    IndexData1,
    IndexData2,
    IndexData3,
    IndexData4,
    IndexData5,
    IndexData6,
    IndexData7,
    IndexData8,
    IndexData9

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