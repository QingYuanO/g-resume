import { View } from "@react-pdf/renderer";
import BWText from "./BWText";

const Tag = ({ tag, color }: { tag: string; color: string }) => {
  return (
    <View
      style={{
        padding: "3pt 8pt",
        border: `1px solid ${color}`,
        borderRadius: 4,
      }}
    >
      <BWText
        style={{
          color: color,
        }}
        text={tag}
      />
    </View>
  );
};


export default Tag