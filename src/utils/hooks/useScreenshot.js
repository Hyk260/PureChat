import dayjs from 'dayjs';
import { useBoolean } from './other';
import { domToJpeg, domToPng, domToSvg, domToWebp } from 'modern-screenshot';

export const useScreenshot = (imageType, title) => {
  const [loading, setLoading] = useBoolean();

  const handleDownload = async () => {
    setLoading(true);
    try {
      let screenshotFn = null;
      switch (imageType) {
        case 'JPG': {
          screenshotFn = domToJpeg;
          break;
        }
        case 'PNG': {
          screenshotFn = domToPng;
          break;
        }
        case 'SVG': {
          screenshotFn = domToSvg;
          break;
        }
        case 'WEBP': {
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
