import { StyleSheet } from "@react-pdf/renderer";

const globalStyles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansSC",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontSize: 12,
  },
  itemP: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export const textStyles = StyleSheet.create({
  xs: {
    fontSize: 8,
  },
  sm: {
    fontSize: 10,
  },
  base: {
    fontSize: 12,
  },
  lg: {
    fontSize: 14,
  },
  xl: {
    fontSize: 16,
  },
});

export const border = "1px solid #ededed";

export default globalStyles;
