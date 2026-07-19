import QRCode from 'qrcode.react';
import { View } from 'react-native';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 256,
}) => {
  return (
    <View style={{ alignItems: 'center', padding: 16 }}>
      <QRCode
        value={value}
        size={size}
        level="H"
        includeMargin={true}
        renderAs="svg"
      />
    </View>
  );
};

export default QRCodeGenerator;
