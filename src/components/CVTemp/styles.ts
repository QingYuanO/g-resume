import { StyleSheet } from "@react-pdf/renderer";

const globalStyles = StyleSheet.create({
  page: {
    fontFamily: "LXGWFasmartGothic",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  itemP: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    letterSpacing: -1.5,
    fontSize: 12,
  },
});

export const border = "1px solid #ededed";

export default globalStyles;
