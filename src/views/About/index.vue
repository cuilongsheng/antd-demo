
<template>
  <div>
    <a-button @click="openNewGroupModal">创建新分组</a-button>
    <create-group-modal
      ref="createGroupModalChild"
      @handleOkCallBack="createGroupHandleCallBack"
    ></create-group-modal>
    <a-button @click="openAddToFavModal">添加到收藏夹</a-button>
    <add-to-favorite-modal
      ref="addToFavChild"
      @handleOkCallBack="openAddToFavCallBack"
    ></add-to-favorite-modal>
    <a-button @click="updateFlow">更新流程</a-button>
    <update-flow-modal
      ref="updateFlowChild"
      @handleOkCallBack="updateFlowCallBack"
    ></update-flow-modal>
    <a-button @click="addTag">添加标签</a-button>
    <add-tag-modal
      ref="addTagChild"
      @handleOkCallBack="addTagCallBack"
    ></add-tag-modal>
    <a-button @click="activationCount">激活</a-button>
    <activation-count-modal
      ref="activationCountChild"
      @handleOkCallBack="activationCountCallBack"
    ></activation-count-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Button } from "ant-design-vue";
import CreateGroupModal from "@/components/create-group-modal/index.vue";
import AddToFavoriteModal, {
  ResultType,
} from "@/components/add-to-favorite-modal/index.vue";
import UpdateFlowModal from "@/components/update-flow-modal/index.vue";
import AddTagModal from "@/components/add-tag-modal/index.vue";
import ActivationCountModal from "@/components/activation-count-modal/index.vue";
export default defineComponent({
  name: "About",
  components: {
    "a-button": Button,
    "create-group-modal": CreateGroupModal,
    "add-to-favorite-modal": AddToFavoriteModal,
    "update-flow-modal": UpdateFlowModal,
    "add-tag-modal": AddTagModal,
    "activation-count-modal": ActivationCountModal,
  },
  setup() {
    // 创建新分组
    const createGroupModalChild = ref();
    const openNewGroupModal = () => {
      createGroupModalChild.value.showModal();
      console.log(createGroupModalChild.value.visible);
    };
    const createGroupHandleCallBack = (newGroup: ResultType) => {
      console.log("createGroupHandleCallBack newGroup ", newGroup);
    };
    // 添加到收藏夹
    const addToFavChild = ref();
    // 查询收藏夹列表,打开模态框
    const openAddToFavModal = () => {
      addToFavChild.value.showModal();
    };
    const openAddToFavCallBack = (status: string) => {
      console.log("openAddToFavCallBack status ", status);
    };

    // 更新流程
    const updateFlowChild = ref();
    const updateFlow = () => {
      updateFlowChild.value.showModal();
    };
    const updateFlowCallBack = (status: string): void => {
      console.log("updateFlowCallBack status ", status);
    };

    // 添加标签
    const addTagChild = ref();
    const addTag = () => {
      addTagChild.value.showModal();
    };
    const addTagCallBack = (status: string): void => {
      console.log("updateFlowCallBack status ", status);
    };

    // 激活
    const activationCountChild = ref();
    const activationCount = () => {
      activationCountChild.value.showModal();
    };
    const activationCountCallBack = (status: string): void => {
      console.log("updateFlowCallBack status ", status);
    };

    return {
      createGroupModalChild,
      openNewGroupModal,
      createGroupHandleCallBack,
      addToFavChild,
      openAddToFavModal,
      openAddToFavCallBack,
      updateFlowChild,
      updateFlow,
      updateFlowCallBack,
      addTagChild,
      addTag,
      addTagCallBack,
      activationCountChild,
      activationCount,
      activationCountCallBack
    };
  },
});
</script>
