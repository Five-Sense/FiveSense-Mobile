import { Image, View } from 'react-native';

export function LoginBrand() {
  return (
    <View accessible accessibilityRole="image" accessibilityLabel="Five Sense" className="h-[149px] w-[246px] items-center gap-[9px]">
      <Image accessible={false} source={require('@/assets/images/logo-symbol.png')} resizeMode="contain" className="h-[110px] w-[84px]" />
      <Image accessible={false} source={require('@/assets/images/logo-text.png')} resizeMode="contain" className="h-[30px] w-[246px]" />
    </View>
  );
}
