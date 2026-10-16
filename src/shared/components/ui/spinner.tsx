import { LoaderCircle } from 'lucide-react-native';
import { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icon } from './icon';

type SpinnerProps = {
  /** Classe de cor por token, ex.: `text-brand-action`. */
  className: string;
  /** 20 em botoes e campos, 32 em blocos (docs/design-guidelines.md). */
  size?: number;
};

export function Spinner({ className, size = 20 }: SpinnerProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1);
    return () => cancelAnimation(rotation);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Icon icon={LoaderCircle} size={size} className={className} />
    </Animated.View>
  );
}
