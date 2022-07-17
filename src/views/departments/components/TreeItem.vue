<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col>
      <span>{{ item.name }}</span>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ item.manager ||'负责人' }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown style="font-size:16px;" @command="onCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <template v-if="item.pid!='-1'">
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除部门</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  filters: {},
  components: {},
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      userlist: []
    }
  },
  computed: {
  },
  watch: {},
  created() {},
  methods: {
    async onCommand(option) {
      if (option === 'del') {
        try {
          await this.$confirm('确定删除该部门吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          await delDepartment(this.item.id)
          this.$emit('delDept')
        } catch (error) {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      } else if (option === 'add') {
        this.$emit('addDept', true, this.item)
      } else if (option === 'edit') {
        this.$emit('editDept', true, this.item)
      }
    }

  }
}
</script>

<style scoped lang='scss'>

</style>
