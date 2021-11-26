<template>
  <div>
    <a-modal
      :width="700"
      v-model:visible="visible"
      title="激活（计数）"
      cancelText="取消"
      okText="确定"
      @ok.stop.prevent="handleOk"
      @cancel="handleCancle"
      :confirmLoading="isLoading"
      :centered="true"
      :maskClosable="true"
    >
    <div class="modal-content">
      <p class="modal-tip">将通过以下发送向所选候选人推送消息，以激活候选人</p>
      <a-form :label-col="labelCol" labelAlign="left" :wrapper-col="wrapperCol">
        <a-form-item label="通知形式" required name="mode" v-bind="validateInfos.mode">
           <a-checkbox-group v-model:value="formState.mode" :options="modes" />
        </a-form-item>
        <a-form-item label="发件人名称" required name="name" v-bind="validateInfos.name">
          <a-input v-model:value="formState.name" placeholder="发件人名称" />
        </a-form-item>
        <a-form-item label="发件人邮箱地址" required name="sendEmail" v-bind="validateInfos.sendEmail">
          <a-input v-model:value="formState.sendEmail" placeholder="请输入发件人邮箱地址" />
        </a-form-item>
        <a-form-item label="回复接收人邮箱地址">
          <a-input v-model:value="formState.receiverEmail" placeholder="请输入回复接收人邮箱地址" />
        </a-form-item>
        <a-form-item label="邮件主题" required name="topic" v-bind="validateInfos.topic">
          <a-input v-model:value="formState.topic" placeholder="请输入邮件主题" />
        </a-form-item>
        <a-form-item label="邮件内容">
          <a-textarea v-model:value="formState.content" :rows="6" placeholder="请输入邮件内容" />
        </a-form-item>
        <a-form-item label="短信内容">
          <a-textarea v-model:value="formState.msgContent" :rows="6" placeholder="请输入短信内容" />
        </a-form-item>
      </a-form>
    </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRaw, reactive } from "vue";
import { Modal, Checkbox, Input, Form } from "ant-design-vue";
import { validateString, validateEmail } from "./validate";
const useForm = Form.useForm;
export interface ModeType {
  name: string
}
export interface FormState {
  mode: number[];
  name: string;
  sendEmail: string;
  receiverEmail: string;
  topic: string;
  content: string;
  msgContent: string;
}
export default defineComponent({
  name: "add-to-favorite",
  components: {
    "a-modal": Modal,
    "a-checkbox-group": Checkbox.Group,
    "a-input": Input,
    "a-textarea": Input.TextArea,
    "a-form": Form,
    "a-form-item": Form.Item,
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const formState = reactive({
      mode: [],
      name: "",
      sendEmail: "",
      receiverEmail: "",
      topic: '',
      content: '',
      msgContent: '',
    });
    const modes = reactive([{label: "邮件", value: "01"}, {label: "短信", value: "02"}])
    // 验证
    const rules = reactive({
      mode: [{ required: true, message: "请至少选择一项通知形式" }],
      name: [{ required: true, validator: validateString,  message: "请填写发件人姓名" }],
      sendEmail: [{ required: true, validator: validateEmail, message: "请填写发件人邮件地址" }],
      topic: [{ required: true, validator: validateString, message: "请填写邮件主题" }],
    })
    const { validate, validateInfos } = useForm(formState, rules);

    // 打开模态框
    const showModal = () => {
      visible.value = true;
    };
    // 确认按钮
    const handleOk = () => {
      validate().then(() => {
        isLoading.value = true;
        // 调用接口，接口成功返回，关闭loading，关闭模态框，返回失败，关闭loading，提示信息
        // let res = await addAction();
        setTimeout(() => {
          console.log(toRaw(formState));
          emit("handleOkCallBack", toRaw(formState));
          handleCancle()
        }, 1000);
      })
      .catch(err => console.log(err))
    };
    // 取消
    const handleCancle = () => {
      isLoading.value = false;
      visible.value = false;
    };

    return {
      props,
      labelCol: { style: { width: '200px' } },
      wrapperCol: { span: 14 },
      modes,
      visible,
      isLoading,
      formState,
      showModal,
      handleOk,
      handleCancle,
      rules,
      validateInfos,
    };
  },
});
</script>
<style lang="less" scoped>
  .modal-content {
    padding: 0 20px;
    height: 500px;
    overflow-y: scroll;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
  }
</style>
