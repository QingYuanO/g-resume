import { StyleSheet } from "@react-pdf/renderer";

export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  7: "21pt",
  8: "24pt",
  9: "27pt",
  10: "30pt",
  11: "33pt",
  12: "36pt",
  14: "42pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
  28: "84pt",
  32: "96pt",
  36: "108pt",
  40: "120pt",
  44: "132pt",
  48: "144pt",
  52: "156pt",
  56: "168pt",
  60: "180pt",
  64: "192pt",
  72: "216pt",
  80: "240pt",
  96: "288pt",
  full: "100%",
} as const;

const globalStyles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansSC",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontSize: 12,
    height:'100%'
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    width: "13pt",
    height: "13pt",
    fill: "#525252", // text-neutral-600
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
