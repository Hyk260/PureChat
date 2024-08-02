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
      :initial-index="initialIndex"
      :infinite="false"
      :zoom-rate="1.2"
      :max-scale="3"
      :min-scale="0.3"
      :preview-teleported="true"
      fit="cover"
    />
  </div>
</template>

<script setup>
import { ref, toRefs, computed } from "vue";
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
const { message, self } = toRefs(props);
const { imgUrlList } = useGetters(["imgUrlList"]);
const { showCheckbox } = useState({
  showCheckbox: (state) => state.conversation.showCheckbox,
});

function getImageProperties(num = 0) {
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

const url = getImageProperties()?.url;

const initialIndex = computed(() => {
  return imgUrlList.value.findIndex((item) => {
    return item == getImageProperties(0)?.url;
  });
});


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

const geiPic = (url) => {};
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
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid var(--color-border-default);
  :deep(.el-image) {
    border-radius: 5px;
    vertical-align: bottom;
  }
}
</style>
