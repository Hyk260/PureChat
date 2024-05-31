<template>
  <div
    class="image_preview select-none"
    :class="self ? 'is-text-self' : 'is-text-other'"
    @click="geiPic(url)"
  >
    <el-image
      :src="url"
      @load="loadImg"
      :style="imgStyle"
      :preview-src-list="showCheckbox ? null : imgUrlList"
      :hide-on-click-modal="true"
      :initial-index="index"
      :infinite="false"
      fit="cover"
    />
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { showIMPic, getImageSize } from "../utils/utils";

const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
  self: {
    type: Boolean,
    default: false,
  },
});
const imgStyle = ref({});
const index = ref(0);
const { message, self } = toRefs(props);
const { imgUrlList } = useGetters(["imgUrlList"]);
const { showCheckbox } = useState({
  showCheckbox: (state) => state.conversation.showCheckbox,
});

function getImageProperties(num = 1) {
  try {
    const {
      payload: { imageInfoArray },
    } = message.value;
    const imageInfo = imageInfoArray[num];
    return imageInfo;
  } catch (error) {
    return null;
  }
}

index.value = imgUrlList.value.findIndex((item) => {
  return item == getImageProperties(0)?.url;
});

const url = getImageProperties()?.url;

async function initImageSize() {
  try {
    let width = getImageProperties()?.width || 0;
    let height = getImageProperties()?.height || 0;
    if (width <= 0 || height <= 0) {
      const { width: newWidth, height: newHeight } = await getImageSize(url);
      width = newWidth;
      height = newHeight;
    }
    const { width: finalWidth, height: finalHeight } = showIMPic(width, height);
    imgStyle.value = { width: finalWidth, height: finalHeight };
  } catch (error) {
    const { width, height } = await getImageSize(url);
    imgStyle.value = { width: width + "px", height: height + "px" };
  }
}

initImageSize();

const geiPic = async (url) => {
  console.log(message.value);
  console.log(imgStyle.value);
};
const loadImg = (e) => {};
</script>

<style lang="scss" scoped>
.is-text-self {
  background: var(--self-msg-color);
}
.is-text-other {
  background: var(--other-msg-color);
}
.image_preview {
  width: fit-content;
  max-width: 142px;
  // padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgb(208, 221, 215);
  :deep(.el-image) {
    border-radius: 5px;
    vertical-align: bottom;
  }
}
</style>
