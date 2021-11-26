<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="创建新分组"
      cancelText="取消"
      okText="确定"
      @ok="handleOk"
      @cancel="handleCancle"
      :confirmLoading="isLoading"
      :centered="true"
      :maskClosable="true"
      :bodyStyle="{ padding: '40px' }"
    >
      <a-input
        placeholder="请输入分组名"
        v-model:value="params"
        :maxlength="15"
      >
        <template #suffix>
          <div class="input-tip">{{ params.length || 0 }}/15</div>
        </template>
      </a-input>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Modal, Input, message } from "ant-design-vue";
interface IGroup {
  name: string;
  id: string;
}

export default defineComponent({
  name: "create-group-modal",
  components: {
    "a-input": Input,
    "a-modal": Modal,
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const params = ref<string>(""); // 分组名称
    // 打开模态框
    const showModal = () => {
      visible.value = true;
    };
    // 确认按钮
    const handleOk = (e: MouseEvent) => {
      e.stopPropagation();
      if (!params.value) {
        return message.warning("分组名称不能为空");
      }
      isLoading.value = true;
      // 调用接口，接口成功返回，关闭loading，关闭模态框，返回失败，关闭loading，提示信息
      // let res = await addAction(params);
      setTimeout((group: IGroup) => {
        isLoading.value = false;
        visible.value = false;
        emit("handleOkCallBack", group || { name: params.value, id: "123" });
        params.value = "";
      }, 1000);
    };
    // 取消
    const handleCancle = () => {
      isLoading.value = false;
      visible.value = false;
      params.value = "";
    };

    return {
      visible,
      isLoading,
      params,
      showModal,
      handleOk,
      handleCancle,
    };
  },
});
</script>
<style lang="less" scoped>
.input-tip {
  color: #d6d6d6;
}
</style>
