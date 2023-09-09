import { Link } from "@react-pdf/renderer";

const ResumePDFLink = ({
  src,
  isPDF,
  style,
  children,
}: {
  src: string;
  isPDF: boolean;
  style?: Record<string,any>;
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
