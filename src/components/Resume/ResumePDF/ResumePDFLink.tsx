import ReactPDF, { Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

const ResumePDFLink = ({
  src,
  isPDF,
  style,
  children,
}: {
  src: string;
  isPDF: boolean;
  style?: Style;
  children: React.ReactNode;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none", ...style }}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={src}
      style={{ textDecoration: "none", ...style }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default ResumePDFLink;
