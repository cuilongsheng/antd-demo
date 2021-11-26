<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="更新流程"
      cancelText="取消"
      okText="确定"
      @ok="handleOk"
      @cancel="handleCancle"
      :confirmLoading="isLoading"
      :centered="true"
      :maskClosable="true"
    >
      <p class="modal-list">
        <a-radio-group v-model:value="currFlow" size="large">
          <a-radio v-for="item in list" :key="item.value" class="modal-item" :value="item.value">{{ item.label }}</a-radio>
        </a-radio-group>
      </p>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Modal, Radio, message } from "ant-design-vue";
export type TFlowType = {
  value: string,
  label: string
}
export default defineComponent({
  name: "update-flow-modal",
  components: {
    "a-modal": Modal,
    "a-radio": Radio,
    "a-radio-group": Radio.Group,
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const currFlow = ref<string>("")
    const list = ref<TFlowType[]>([])
    const getFlowTypes = async () => {
      const res = [
        {
          value: "11",
          label: "推荐至北深"
        },
        {
          value: "12",
          label: "淘汰"
        },
        {
          value: "13",
          label: "淘汰"
        },
        {
          value: "14",
          label: "淘汰"
        },
        {
          value: "15",
          label: "淘汰"
        },
        {
          value: "16",
          label: "淘汰"
        },
        {
          value: "17",
          label: "淘汰"
        },
        {
          value: "18",
          label: "淘汰"
        },
        {
          value: "19",
          label: "淘汰"
        }
      ];
      return res;
    };
    // 打开模态框
    const showModal = async () => {
      list.value = await getFlowTypes();
      console.log(list.value);
      visible.value = true;
    };
    // 确认按钮
    const handleOk = (e: MouseEvent) => {
      e.stopPropagation();
      if (!currFlow.value) {
        return message.warning("请选择一项");
      }
      console.log(currFlow.value);
      isLoading.value = true;
      // 调用接口，接口成功返回，关闭loading，关闭模态框，返回失败，关闭loading，提示信息
      // let res = await addAction(currFlow.value);
      setTimeout((status: string) => {
        isLoading.value = false;
        visible.value = false;
        emit("handleOkCallBack", status || "200");
        currFlow.value = "";
      }, 1000);
    };
    // 取消
    const handleCancle = () => {
      isLoading.value = false;
      visible.value = false;
      currFlow.value = "";
    };
    return {
      visible,
      isLoading,
      list,
      currFlow,
      showModal,
      handleOk,
      handleCancle
    }
  }
});
</script>
<style lang="less" scoped>
.modal-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .modal-item {
    padding: 10px 5px;
  }
}
</style>
