/* eslint-disable jsx-a11y/alt-text */
import { Image } from "@react-pdf/renderer";
const ResumePDFImage = ({
  src,
  isPDF,
  style,
}: {
  src: string;
  isPDF: boolean;
  style?: Record<string, any>;
}) => {
  if (isPDF) {
    return (
      <Image
        style={style}
        src={src}
        source={new Buffer(src, "base64")}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      style={style}
      width={50}
      height={50}
      alt="头像"
    />
  
  );
};

export default ResumePDFImage;
