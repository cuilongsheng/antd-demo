<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="添加至收藏夹"
      cancelText="取消"
      okText="确定"
      @ok="handleOk"
      @cancel="handleCancle"
      :confirmLoading="isLoading"
      :centered="true"
      :maskClosable="true"
    >
      <template v-for="item in favs" :key="item.id">
        <p class="model-fav-list">
          <span class="fav-icon"> X </span>
          <span class="fav-name">
            {{ item.name }}
            <span v-if="item.isDefault">（默认收藏夹）</span></span
          >
          <a-checkbox v-model:checked="item.isSelected"></a-checkbox>
        </p>
      </template>
      <!-- <p class="footer-btns">
        <a-button type="primary" @click="handleOk">确定</a-button>
        <a-button @click="handleCancle">取消</a-button>
      </p> -->
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Modal, Checkbox, message } from "ant-design-vue";
export type ResultType = {
  status: string;
};
export interface IItem {
  id: string;
  name: string;
  isSelected: boolean;
  isDefault?: boolean;
}
export default defineComponent({
  name: "add-to-favorite-modal",
  components: {
    "a-modal": Modal,
    "a-checkbox": Checkbox,
    // "a-button": Button,
  },
  setup(props, { emit }) {
    // console.log(props);
    const visible = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const favs = ref<IItem[]>([]); // 收藏夹列表
    // 查询收藏夹列表
    const getFavs = async () => {
      const res = [
        {
          id: "11",
          name: "收藏夹111111111111",
          isSelected: true,
          isDefault: true,
        },
        {
          id: "12",
          name: "收藏夹2",
          isSelected: false,
        },
      ];
      return res;
    };
    // 打开模态框
    const showModal = async () => {
      let res = await getFavs();
      console.log(res);
      favs.value = res;
      visible.value = true;
    };
    // 确认按钮
    const handleOk = (e: MouseEvent) => {
      e.stopPropagation();
      let selectedFavs = favs.value.filter((v) => v.isSelected);
      if (!selectedFavs.length) {
        return message.warning("至少选一个收藏夹");
      }
      isLoading.value = true;
      // 调用接口，接口成功返回，关闭loading，关闭模态框，返回失败，关闭loading，提示信息
      // let res = await addAction(favs);
      setTimeout(() => {
        isLoading.value = false;
        visible.value = false;
        emit("handleOkCallBack", selectedFavs);
        favs.value = [];
        console.log("handleOkCallBack ", selectedFavs, favs.value);
      }, 1000);
    };
    // 取消
    const handleCancle = () => {
      isLoading.value = false;
      visible.value = false;
      favs.value = [];
    };

    return {
      props,
      visible,
      isLoading,
      favs,
      showModal,
      handleOk,
      handleCancle,
    };
  },
});
</script>
<style lang="less" scoped>
.model-fav-list {
  display: flex;
  font-size: 16px;
  max-height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .fav-icon {
    flex: 0;
    padding: 0 10px;
  }
  .fav-name {
    padding: 0 10px;
    flex: 1;
  }
  > label {
    align-self: flex-end;
  }
}
.footer-btns {
  margin-bottom: 0;
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  .ant-btn {
    font-size: 16px;
    height: 40px;
    padding: 0 50px;
  }
}
</style>
