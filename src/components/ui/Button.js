import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, SHADOWS } from '../../theme/theme';

/**
 * Modern Button Component with variants and animations
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} loading - Shows loading spinner
 * @param {boolean} disabled - Disables button
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {object} style - Additional styles
 * @param {React.ReactNode} icon - Optional icon
 */
export default function Button({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  title,
  onPress,
  style,
  icon,
  fullWidth = false,
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const isDisabled = disabled || loading;

  // Size configurations
  const sizeConfig = {
    small: {
      paddingVertical: SPACING.s,
      paddingHorizontal: SPACING.l,
      fontSize: 14,
      height: 36,
    },
    medium: {
      paddingVertical: SPACING.m + 2,
      paddingHorizontal: SPACING.xl,
      fontSize: 16,
      height: 48,
    },
    large: {
      paddingVertical: SPACING.l,
      paddingHorizontal: SPACING.xxl,
      fontSize: 18,
      height: 56,
    },
  };

  const config = sizeConfig[size];

  // Render button content
  const renderContent = () => (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? COLORS.text : COLORS.primary}
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && (
            <Text
              style={[
                styles.text,
                styles[`text_${variant}`],
                { fontSize: config.fontSize },
              ]}
            >
              {title}
            </Text>
          )}
        </>
      )}
    </View>
  );

  // Primary button with gradient
  if (variant === 'primary') {
    return (
      <Animated.View
        style={[
          styles.button,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        <TouchableOpacity
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          activeOpacity={1}
          style={[
            styles.touchable,
            { height: config.height },
            isDisabled && styles.disabled,
          ]}
        >
          <LinearGradient
            colors={
              isDisabled
                ? [COLORS.surfaceLight, COLORS.surfaceLight]
                : [COLORS.primary, COLORS.primaryDark]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, { borderRadius: config.height / 2 }]}
          >
            {renderContent()}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Secondary button
  if (variant === 'secondary') {
    return (
      <Animated.View
        style={[
          styles.button,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        <TouchableOpacity
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          activeOpacity={1}
          style={[
            styles.touchable,
            styles.secondaryButton,
            { height: config.height, borderRadius: config.height / 2 },
            isDisabled && styles.disabled,
          ]}
        >
          {renderContent()}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Outline button
  if (variant === 'outline') {
    return (
      <Animated.View
        style={[
          styles.button,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        <TouchableOpacity
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          activeOpacity={1}
          style={[
            styles.touchable,
            styles.outlineButton,
            { height: config.height, borderRadius: config.height / 2 },
            isDisabled && styles.disabledOutline,
          ]}
        >
          {renderContent()}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Ghost button
  return (
    <Animated.View
      style={[
        styles.button,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={1}
        style={[
          styles.touchable,
          styles.ghostButton,
          { height: config.height },
          isDisabled && styles.disabled,
        ]}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    ...SHADOWS.medium,
  },
  fullWidth: {
    width: '100%',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledOutline: {
    opacity: 0.5,
    borderColor: COLORS.textDim,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.s,
  },
  iconContainer: {
    marginRight: SPACING.xs,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  text_primary: {
    color: COLORS.text,
  },
  text_secondary: {
    color: COLORS.text,
  },
  text_outline: {
    color: COLORS.primary,
  },
  text_ghost: {
    color: COLORS.primary,
  },
});

