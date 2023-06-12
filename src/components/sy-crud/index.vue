<template>
  <div>
    <template v-if="isSplit">
      <el-card
        v-if="
          schema.formColumns &&
            schema.formColumns.columns &&
            schema.formColumns.columns.length > 0
        "
        style="margin-bottom:16px;overflow:visible;"
        ><crud-form
          @formSubmit="formSubmit"
          @resetForm="resetForm"
          :formColumns="schema.formColumns"
        ></crud-form
      ></el-card>
      <el-card style="min-height:300px">
        <slot name="tableBtn"></slot>

        <crud-table
          :searchQuery="searchQuery"
          :tableColumns="schema.tableColumns"
          v-on="$listeners"
        >
          <!-- <div slot="date" slot-scope="text, record">
          <slot name="date" :data="text.data"></slot>
        </div> -->
          <template
            :slot="item.dataIndex"
            slot-scope="text, record"
            v-for="item in slots"
          >
            <slot :name="item.dataIndex" :data="text.data"></slot>
          </template> </crud-table
      ></el-card>
    </template>
    <template v-else>
      <crud-form
        style="margin-bottom:16px"
        @formSubmit="formSubmit"
        @resetForm="resetForm"
        :formColumns="schema.formColumns"
      ></crud-form>
      <crud-table
        :searchQuery="searchQuery"
        :tableColumns="schema.tableColumns"
        v-on="$listeners"
      >
        <template
          :slot="item.dataIndex"
          slot-scope="text, record"
          v-for="item in slots"
        >
          <slot :name="item.dataIndex" :data="text.data"></slot>
        </template>
      </crud-table>
    </template>
  </div>
</template>
<script>
import CrudForm from "./crud-form/index.vue";
import CrudTable from "./crud-table/index.vue";
import { cloneDeep } from "./utils/utils";
export default {
  components: {
    CrudForm,
    CrudTable
  },
  name: "SyCrud",
  props: {
    isSplit: {
      type: Boolean,
      default: true
    },
    schema: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      searchQuery: {},
      slots: []
    };
  },
  mounted() {
    if (this.schema && this.schema.tableColumns) {
      let columns = cloneDeep(this.schema.tableColumns.columns);
      let slots = columns.filter(item => item.slot);
      this.slots = slots;
    }
  },
  methods: {
    formSubmit(e) {
      this.searchQuery = cloneDeep(e);
    },
    resetForm() {
      this.searchQuery = {};
    },
    getSearchQuery(){
      return cloneDeep(this.searchQuery)
    },
  }
};
</script>
<style></style>
