import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ensure you have imported the icon library
import { Colors } from './AppColors';

const CommonButton = ({
  title,
  imageUrl,        // Optional image URL, no need to pass it
  onPress,
  width,
  backgroundColor,
  textColor,
  buttonStyle,
  iconName,         // Optional icon name
  iconColor,
  iconSize
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, { width: width, backgroundColor: backgroundColor ? backgroundColor : Colors.button }]}
      onPress={onPress}
    >
      <View style={styles.iconTextContainer}>
        {iconName ? (
          <MaterialIcons
            name={iconName}
            size={iconSize || 24}
            color={iconColor || '#A0AEC0'}
            style={styles.icon}
          />
        ) : (
          imageUrl && (
            <Image
              source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} // Handle both local and URL images
              style={styles.image}
            />
          )
        )}

        <Text style={[styles.text, { color: textColor ? textColor : "#000" , paddingHorizontal:15}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15, // Adjusted padding for better touch target
  },
  text: {
    fontSize: 16, // Adjust font size
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'inter',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8, // Spacing between icon and text
  },
  image: {
    width: 20, // Adjust the size of the image
    height: 20,
    marginRight: 8,
  },
});
