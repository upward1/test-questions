<template>
  <div>
    <div class="options-input">
      <el-date-picker v-model="value"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      unlink-panels>
      </el-date-picker>
      <el-input v-model="input"
                clearable
                :maxlength="maxLength"
                @input="inputNumber"
                placeholder="请输入数字"></el-input>
    </div>

    <el-button class="add-btn"
               @click="dialogVisible = true"
               size="small">新增</el-button>
    <el-dialog title="添加"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <div class="dialog-date-picker">
        <el-date-picker v-model="addValue"
                        type="daterange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        unlink-panels>
        </el-date-picker>

        <el-input v-model="addInput"
                  clearable
                  :maxlength="maxLength"
                  @input="inputNumber"
                  placeholder="请输入数字"></el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">添加</el-button>
      </span>
    </el-dialog>

    <hr>
    <div class="view">
      <span>第一次</span>
      <div>
        日期：<span>{{$moment(value[0]).format('YYYY-MM-DD') + ' ~ '+ $moment(value[1]).format('YYYY-MM-DD')}}</span>
      </div>
      <div> 整数：<span>{{input}}</span></div>

    </div>
    <div class="view">
      <span>第二次</span>
      <div>
        日期：<span>{{$moment(addValue[0]).format('YYYY-MM-DD') + ' ~ '+ $moment(addValue[1]).format('YYYY-MM-DD')}}</span>
      </div>
      <div> 整数：<span>{{addInput}}</span></div>

    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      value: '',
      addValue: '',
      input: '',
      addInput: '',
      maxLength: 9,
      dialogVisible: false
    }
  },
  computed: {
    pickerOptions () {
      const that = this
      return {

        disabledDate (time) {
          const maxDate = Date.parse(that.value[0])
          const minDate = Date.parse(that.value[1])
          return time.getTime() > maxDate && time.getTime() < minDate
        }
      }
    }
  },
  methods: {
    inputNumber () {
      this.input = this.input.replace(/[^\d-]/g, '')
      if (this.input.lastIndexOf('-') === 0 && this.input.indexOf('-') !== -1) {
        this.maxLength = 10
      }
      if (this.input.lastIndexOf('-') !== 0 && this.input.indexOf('-') !== -1) {
        this.input = this.input.substr(0, this.input.lastIndexOf('-'))
      }
    },
    handleClose () {
      this.addInput = ''
      this.addValue = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.options-input {
  display: flex;
}
.el-input {
  margin-left: 10px;
  width: 200px;
}
.add-btn {
  margin-top: 10px;
  width: 70px;
  color: #f2a55d;
  font-weight: 600;
  font-size: 14px;
}
hr {
  border: none;
  border-top: 2px dashed #6c66d0;
  /* float: left;
  width: 50%; */
}
.dialog-date-picker {
  display: flex;
  justify-content: center;
}
.view {
  display: flex;
  justify-content: space-around;
  font-size: 18px;
}
</style>
