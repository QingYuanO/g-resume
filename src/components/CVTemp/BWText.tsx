import { bw } from '@/utils';
import ReactPDF, { Text } from '@react-pdf/renderer';

export default function BWText({ text, style }: { text?: string; style?: ReactPDF.TextProps['style'] }) {
  return <Text style={[{ ...style, letterSpacing: -3 }]}>{bw(text ?? '')}</Text>;
}
