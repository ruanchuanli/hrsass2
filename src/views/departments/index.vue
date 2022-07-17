<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane v-loading="loading" label="组织架构" name="first" style="padding:30px  140px;font-size:16px;">
            <!-- 用了一个行列布局 -->
            <TreeItem :item="firstobj" @addDept="addDept" />
            <el-tree
              :data="data"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :props="{label:'name'}"
            >
              <template v-slot="{node}">
                <TreeItem :item="node.data" @delDept="getDepartmentsList" @addDept="addDept" @editDept="editDept" />
              </template>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <AddDept ref="addDept" :showadd.sync="showadd" :item="item" @add="getDepartmentsList" />
    </div>
  </div>
</template>

<script>
import TreeItem from './components/TreeItem.vue'
import { mapGetters } from 'vuex'
import { getDepartmentsList } from '@/api/departments'
import AddDept from './components/AddDept.vue'
import { transferListToTree } from '@/utils'
export default {
  filters: {},
  components: { TreeItem, AddDept },
  data() {
    return {
      activeName: 'first',
      data: [],
      depts: [],
      firstobj: {},
      loading: false,
      showadd: false,
      item: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {
    this.getDepartmentsList()
  },
  methods: {
    async getDepartmentsList() {
      this.loading = true
      const res1 = await getDepartmentsList()
      this.firstobj = res1.depts[0]
      this.data = transferListToTree(res1.depts, '')
      this.loading = false
    },
    addDept(showadd, item) {
      this.item = item
      this.showadd = showadd
    },
    async editDept(showadd, item) {
      this.item = item
      await this.$refs.addDept.getDepartment(item.id)
      this.showadd = showadd
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
