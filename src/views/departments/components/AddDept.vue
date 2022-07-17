<template>
  <el-dialog :visible="showadd" :title="title" @close="cancel">
    <el-form ref="formData" :model="formData" label-width="100px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" filterable placeholder="请选择负责人" @focus="simpleEmployeeList">
          <el-option v-for="(item1, index) in userlist" :key="index" :label="item1.username" :value="item1.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { simpleEmployeeList, getDepartmentsList, addDepartment, getDepartment, editDepartment } from '@/api/departments'
export default {
  filters: {},
  components: {},
  props: {
    showadd: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    // 同一个部门下部门名称不能一致
    const validateName = async(rule, value, callback) => {
      const { depts } = await getDepartmentsList()
      // 查找统计部门下部门名称是否重复
      let isRepeat = ''
      if (this.formData.id) {
        // 如果是编辑，查找兄弟部门
        isRepeat = depts.filter(item1 => item1.pid === this.item.pid && item1.id !== this.item.id).some(item2 => item2.name === value)
      } else {
        isRepeat = depts.filter(item1 => item1.pid === this.item.id).some(item2 => item2.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    const validateCode = async(rule, value, callback) => {
      const { depts } = await getDepartmentsList()
      // 查找部门编码是否重复
      const isRepeat = depts.some(item2 => item2.code === value)
      console.log(isRepeat)
      isRepeat ? callback(new Error(`部门编码${value}不能重复`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '部门名称不能为空' }, { validator: validateName, trigger: 'blur' }],
        code: [{ required: true, trigger: 'blur', message: '部门编码不能为空' }, { validator: validateCode, trigger: 'blur' }],
        manager: [{ required: true, trigger: 'blur', message: '部门负责人不能为空' }],
        introduce: [{ required: true, trigger: 'blur', message: '部门介绍不能为空' }]
      },
      userlist: []
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created() {},
  methods: {
    async simpleEmployeeList() {
      this.userlist = await simpleEmployeeList()
    },
    async getDepartment(id) {
      this.formData = await getDepartment(id)
    },
    cancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.formData.resetFields()
      this.$emit('update:showadd', false)
    },
    async sure() {
      await this.$refs.formData.validate()
      if (this.formData.id) {
        console.log(this.formData)
        await editDepartment(this.formData)
      } else {
        await addDepartment({ ...this.formData, pid: this.item.id })
      }
      this.$emit('update:showadd', false)
      this.$emit('add')
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-dialog__header{
  background-color: #8ea9ff;
  span ,i{
    color: #fff!important
  }
}
</style>
