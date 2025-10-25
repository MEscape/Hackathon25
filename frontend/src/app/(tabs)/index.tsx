import React from 'react';
import { ViewStyle } from 'react-native';
import { Screen } from '@/components/Screen';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

export function IndexScreen() {
    const { themed } = useAppTheme();

    return (
        <Screen preset="fixed" style={themed($container)}>
            {/* Empty placeholder */}
        </Screen>
    );
}

const $container: ThemedStyle<ViewStyle> = () => ({
    flex: 1,
});
