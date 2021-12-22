<template>
  <div class="container">
    <a-table bordered
             :columns="columns"
             :data-source="data">
      <a slot="operation"
         slot-scope="text,record"
         @click="edit(record)">{{ text }}</a>

    </a-table>

    <a-modal :visible="
            visible"
             title="编辑"
             @ok="handleOk"
             @cancel="handleCancel"
             okText="修改"
             cancelText="取消">
      <a-form :form="form"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }">

        <a-form-item label="字段名称">
          <a-input placeholder="请输入字段名称"
                   v-decorator="['fieldname', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
        </a-form-item>

        <a-form-item label="字段类型">
          <a-select v-decorator="[
          'fieldtype',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
                    @change="handleSelectChange">

            <a-select-option :value="1">
              单行文本
            </a-select-option>
            <a-select-option :value="2">
              日期
            </a-select-option>
            <a-select-option :value="3">
              单选下拉
            </a-select-option>

          </a-select>
        </a-form-item>

        <!-- 时间选项 -->
        <a-form-item v-if="display === 2"
                     label="日期类型">
          <a-radio-group v-decorator="['fieldoption', { valuePropName: 'checked' }]">
            <a-radio :style="radioStyle"
                     :value="1">
              年-月
            </a-radio>
            <a-radio :style="radioStyle"
                     :value="2">
              年-月-日
            </a-radio>
            <a-radio :style="radioStyle"
                     :value="3">
              年-月-日 时：分
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- 选项 -->
        <a-form-item v-if="display === 3"
                     label="选项">
          <a-select v-decorator="[
          'fieldoption',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]">

            <a-select-option value="options 1">
              选项一
            </a-select-option>
            <a-select-option value="options 2">
              选项一
            </a-select-option>

          </a-select>
        </a-form-item>

        <a-form-item label="是否必填">
          <a-checkbox v-decorator="['whether', { valuePropName: 'checked' }]">
            是
          </a-checkbox>
        </a-form-item>

      </a-form>

      <div class="btn">
        <a-button @click="add"
                  type="primary">
          添加
        </a-button>
        <a-popconfirm title="确定要删除吗"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="del"
                      @cancel="cancel">
          <a-button type="primary">
            删除
          </a-button>
        </a-popconfirm>
      </div>

    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
function dateFormat (str) {
  return moment(Date.now()).format(str)
}
const columns = [
  {
    title: '字段名称',
    dataIndex: 'fieldname',
    key: 'fieldname'
  },
  {
    title: '字段类型',
    dataIndex: 'fieldtype',
    key: 'fieldtype',
    customRender: (text) => {
      return text === 1 ? '单行文本' : text === 2 ? '日期' : text === 3 ? '单选下拉' : '单行文本'
    }
  },
  {
    title: '是否必填',
    dataIndex: 'whether',
    key: 'whether',
    width: 100,
    customRender: (text) => {
      return text ? '是' : '否'
    }
  },
  {
    title: '字段选项',
    dataIndex: 'fieldoption',
    key: 'fieldoption',
    customRender: (text) => {
      return text === 1 ? dateFormat('YYYY-MM') : text === 2 ? dateFormat('YYYY-MM-DD') : text === 3 ? dateFormat('YYYY-MM-DD h:mm:ss') : text || '无'
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation ',
    scopedSlots: { customRender: 'operation' }
  }
]

const data = [
  {
    key: '1',
    fieldname: '字段一',
    fieldtype: 1,
    whether: true,
    fieldoption: '无',
    operation: '编辑'

  },
  {
    key: '2',
    fieldname: '字段二',
    fieldtype: 2,
    whether: false,
    fieldoption: '年-月-日',
    operation: '编辑'

  },
  {
    key: '3',
    fieldname: '字段三',
    fieldtype: 3,
    whether: false,
    fieldoption: '选项一、选项二',
    operation: '编辑'

  }

]

export default {

  data () {
    return {
      data,
      columns,
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      isSelect: false,
      value: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      display: 0,
      rowKey: 0
    }
  },
  methods: {
    edit (value) {
      this.rowKey = value.key
      this.visible = true
    },

    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = false
          values.key = this.rowKey
          values.operation = '编辑'

          const index = this.data.findIndex(item => {
            return item.key === this.rowKey
          })
          this.data.splice(index, 1, values)
        }
      })
    },
    handleCancel () {
      this.visible = false
    },

    handleSelectChange (value) {
      console.log(value)
      this.display = value
    },
    add () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = false

          values.key = this.data.length + 1
          values.operation = '编辑'
          this.data = [...this.data, values]
          this.$message.success('添加成功')
        }
      })
    },

    del () {
      this.visible = false
      const index = this.data.findIndex(item => {
        return item.key === this.rowKey
      })
      this.data.splice(index, 1)
      this.$message.success('删除成功')
    },
    cancel () {
      this.$message.error('删除已取消')
    }
  }

}
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
}
.btn {
  display: flex;
  justify-content: space-around;
}
</style>
