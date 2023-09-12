import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { IconType, ResumePDFIcon } from "./ResumePDFIcon";
import ResumePDFLink from "./ResumePDFLink";
import globalStyles from "./styles";

export default function IconText(props: {
  name?: string;
  url?: string;
  icon: IconType;
  isPDF?: boolean;
  color: string;
}) {
  const { name = "-", url, icon, isPDF = false, color } = props;
  return (
    <View
      style={{ ...globalStyles.flexRow, columnGap: 4, alignItems: "center" }}
    >
      <ResumePDFIcon type={icon} isPDF={isPDF} style={{ fill: color }} />
      {url ? (
        <ResumePDFLink
          src={url}
          isPDF={isPDF}
          style={{
            alignSelf: "flex-start",
            color: color,
          }}
        >
          {name}
        </ResumePDFLink>
      ) : (
        <Text style={{position:'relative'}}>{name}</Text>
      )}
    </View>
  );
}
