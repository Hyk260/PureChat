import dayjs from "dayjs";
import { domToJpeg, domToPng, domToSvg, domToWebp, domToBlob } from "modern-screenshot";
import { useAppStore } from "@/stores/index";
import { useState } from "./useState";

export const { VITE_APP_NAME } = import.meta.env;

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
      useAppStore().showMessage({ message: "图片复制成功" });
    })
    .catch((error) => {
      console.error("写入剪贴板时出错:", error);
    });
}

export const useScreenshot = () => {
  const [loading, setLoading] = useState();

  const handleDownload = async (imageType = ImageType.JPG, title = "", cd) => {
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
        let link = document.createElement("a");
        let name = `${VITE_APP_NAME}_`;
        if (title) name = `${VITE_APP_NAME}_${title}_`;
        link.download = name + `${dayjs().format("YYYY-MM-DD")}.${imageType}`;
        link.href = dataUrl;
        link.click();
      }

      setTimeout(() => {
        setLoading(false);
        cd && cd?.();
      }, 300);
      
    } catch (error) {
      console.error("Failed to download image", error);
      setLoading(false);
    }
  };

  return {
    loading,
    onDownload: handleDownload,
  };
};
