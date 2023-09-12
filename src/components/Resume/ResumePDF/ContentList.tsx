import React from "react";
import BWText from "./BWText";
import globalStyles from "./styles";
import { Text,View } from "@react-pdf/renderer";

export default function ContentList({
  content,
  dotColor,
  color,
}: {
  content?: string[];
  dotColor: string;
  color: string;
}) {
  if (!content) return null;
  return (
    <View
      style={{
        ...globalStyles.flexCol,
      }}
    >
      {content?.map((c, i) => {
        return (
          <Text key={i}>
            <Text style={{ color: dotColor }}>{"•"}</Text>
            <BWText
              style={{
                color: color,
              }}
              text={c}
            />
          </Text>
        );
      })}
    </View>
  );
}
