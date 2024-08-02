import dayjs from 'dayjs';
import { useBoolean } from './other';
import { domToJpeg, domToPng, domToSvg, domToWebp } from 'modern-screenshot';

export const ImageType = {
  JPG: "jpg",
  PNG: "png",
  SVG: "svg",
  WEBP: "webp",
};

export const imageTypeOptions = [
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

export const useScreenshot = (title = '') => {
  
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
      }

      const dataUrl = await screenshotFn(document.querySelector('#preview'), {
        features: {
          // 不启用移除控制符，否则会导致 safari emoji 报错
          removeControlCharacter: false,
        },
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `PureChat_${title}_${dayjs().format('YYYY-MM-DD')}.${imageType}`;
      link.href = dataUrl;
      link.click();
      setLoading(false);
    } catch (error) {
      console.error('Failed to download image', error);
      setLoading(false);
    }
  };

  return {
    loading,
    onDownload: handleDownload,
    title,
  };
};
