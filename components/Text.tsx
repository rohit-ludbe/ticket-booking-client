import { Platform, Text as RNText, TextProps } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { defaultShortcuts, ShortcutProps } from '@/styles/shortcuts';

export interface CustomTextProps extends PropsWithChildren, ShortcutProps, TextProps {
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
  color?: string;
}

export const Text = ({ fontSize = 18, bold, underline, color, children, style, ...restProps }: CustomTextProps) => {
  return (
    <RNText
      style={[defaultShortcuts(restProps), {
        fontSize,
        fontWeight: bold ? 'bold' : 'normal',
        textDecorationLine: underline ? 'underline' : 'none',
        color,
        fontFamily: "inter"
      }, style]}
      {...restProps}
    >
      {children}
    </RNText>
  );
};
