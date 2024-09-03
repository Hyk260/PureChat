import dayjs from "dayjs";
import store from "@/store/index";
import { useBoolean } from "./other";
import { domToJpeg, domToPng, domToSvg, domToWebp, domToBlob } from "modern-screenshot";

export const ImageType = {
  Blob: "blob",
  JPG: "jpg",
  PNG: "png",
  SVG: "svg",
  WEBP: "webp",
};

export const imageTypeOptions = [
  {
    label: "Blob",
    value: ImageType.Blob,
  },
  {
    label: "JPG",
    value: ImageType.JPG,
  },
  {
    label: "PNG",
    value: ImageType.PNG,
  },
  {
    label: "SVG",
    value: ImageType.SVG,
  },
  {
    label: "WEBP",
    value: ImageType.WEBP,
  },
];

/**
 * 将图像数据URL写入系统的剪贴板。
 *
 * @param {string} dataUrl - 图像数据URL。
 */
function copyImageToClipboard(dataUrl) {
  const clipboardItem = new ClipboardItem({ "image/png": dataUrl });
  navigator.clipboard
    .write([clipboardItem])
    .then(() => {
      store.commit("showMessage", { message: "图片复制成功" });
    })
    .catch((error) => {
      console.error("写入剪贴板时出错:", error);
    });
}

export const useScreenshot = (title = "") => {
  const [loading, setLoading] = useBoolean();

  const handleDownload = async (imageType = ImageType.JPG) => {
    setLoading(true);

    try {
      let screenshotFn = null;
      switch (imageType) {
        case ImageType.JPG: {
          screenshotFn = domToJpeg;
          break;
        }
        case ImageType.PNG: {
          screenshotFn = domToPng;
          break;
        }
        case ImageType.SVG: {
          screenshotFn = domToSvg;
          break;
        }
        case ImageType.WEBP: {
          screenshotFn = domToWebp;
          break;
        }
        case ImageType.Blob: {
          screenshotFn = domToBlob;
          break;
        }
      }

      const dataUrl = await screenshotFn(document.querySelector("#preview"), {
        features: {
          // 不启用移除控制符，否则会导致 safari emoji 报错
          removeControlCharacter: false,
        },
        scale: 2,
      });
      if (imageType === ImageType.Blob) {
        copyImageToClipboard(dataUrl);
      } else {
        const link = document.createElement("a");
        link.download = `PureChat_${title}_${dayjs().format("YYYY-MM-DD")}.${imageType}`;
        link.href = dataUrl;
        link.click();
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to download image", error);
      setLoading(false);
    }
  };

  return {
    loading,
    onDownload: handleDownload,
    title,
  };
};
