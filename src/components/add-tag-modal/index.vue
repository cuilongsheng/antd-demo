<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="添加标签"
      cancelText="取消"
      okText="确定"
      @ok="handleOk"
      @cancel="handleCancle"
      :confirmLoading="isLoading"
      :centered="true"
      :maskClosable="true"
    >
    <a-input
        placeholder="请输入"
        v-model:value="searchParam"
        @change="onSearchChange"
        :loading="searchLoading"
        class="search-input"
      ></a-input>
    <p class="modal-list">
      <template v-for="item in list" :key="item.id">
        <p class="modal-item" :class="item.type">
          <span class="item-name">{{ item.name }}</span>
          <a-checkbox v-model:checked="item.isSelected" @change="onSelecteChange(item)"></a-checkbox>
        </p>
      </template>
    </p>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Modal, Checkbox, Input, message } from "ant-design-vue";
import {throttle, debounce, random} from "lodash";
export type TTag = {
  name: string,
  id: string,
  type?: string,
  isSelected: boolean
}
export default defineComponent({
  name: "update-flow-modal",
  components: {
    "a-modal": Modal,
    "a-checkbox": Checkbox,
    "a-input": Input.Search,
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const searchLoading = ref<boolean>(false);
    const list = ref<Array<TTag>>([])
    const searchParam = ref<string>("")
    const selectedTags = ref<Array<TTag>>([])
    const getFlowTypes = async () => {
      const res: Array<TTag> = [{
        name: "取消",
        id: "1",
        type: "cancel", // 取消
        isSelected: false
      }, {
        name: "结束",
        id: "2",
        type: "finish", // 结束
        isSelected: false
      },{
        name: "招聘中",
        id: "3",
        type: "hiring", // 招聘中
        isSelected: false
      },{
        name: "非常长长长长长长长的标签",
        id: "4",
        type: "hiring",
        isSelected: false
      },{
        name: "标签标签标签标签标签标签标签标签标签",
        id: "5",
        type: "hiring",
        isSelected: false
      },{
        name: "已暂停",
        id: "5",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      },{
        name: "已暂停",
        id: "6",
        type: "paused",
        isSelected: false
      }]
      let num = random(0, 100);
      console.log("num ", num);
      return res.slice(0, num);
    };
    const onSearchChange = debounce(async () => {
      if(!searchParam.value) {
        return;
      }
      console.log(searchParam.value);
      searchLoading.value = true;
      list.value = await getFlowTypes();
      setTimeout(() => {searchLoading.value = false;}, 1000)
    }, 300)
    const onSelecteChange = throttle((item: TTag) => {
      console.log(item);
      selectedTags.value = list.value.filter((v) => v.isSelected);
      // 判断是否超过6个标签
      if (selectedTags.value.length > 6) {
        item.isSelected = false;
        return message.warning("不能超过6个标签");
      }
    }, 500)
    // 打开模态框
    const showModal = async () => {
      list.value = await getFlowTypes();
      visible.value = true;
    };
    // 确认按钮
    const handleOk = (e: MouseEvent) => {
      e.stopPropagation();
      if (!selectedTags.value.length) {
        return message.warning("请选择至少一个标签");
      }
      isLoading.value = true;
      // 调用接口，接口成功返回，关闭loading，关闭模态框，返回失败，关闭loading，提示信息
      // let res = await addAction(selectedTags.value);
      setTimeout((status: string) => {
        handleCancle()
        emit("handleOkCallBack", status || "200");
      }, 1000);
    };
    // 取消, modal状态初始化
    const handleCancle = () => {
      isLoading.value = false;
      visible.value = false;
      list.value = [];
      selectedTags.value = [];
    };
    return {
      searchParam,
      visible,
      isLoading,
      searchLoading,
      list,
      selectedTags,
      showModal,
      handleOk,
      handleCancle,
      onSelecteChange,
      onSearchChange
    }
  }
});
</script>
<style lang="less" scoped>
.search-input {
  margin-bottom: 20px;
  height: 44px;
}
.modal-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .modal-item {
    padding: 4px 10px;
    color: #096dd9;
    background: #e6f7ff;
    margin-right: 10px;
    border-radius: 4px;
    .item-name {
      margin-right: 5px;
    }
    .ready {
      color: #389e0d;
    background: #f6ffed;
    }
    .cancel {
      color: #000000d9;
      background: #fff7e6;
    }
    .finish {
      color:#3b5999;
      background: #fff7e6;
    }
    .paused {
      color: #d46b08;
      background: #fff7e6;
    }
    .warning {
      color: #d46b08;
      background: #fff7e6;
    }
  }
}
</style>
