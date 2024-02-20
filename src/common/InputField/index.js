import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './style';

const InputField = ({ label, containerStyle, name, onChange, multiline, inputStyle, error, ...rest }) => {

  const onChangeText = (val) => {
    onChange && onChange(name, val)
  }

  return (
    // <View style={containerStyle}>
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        placeholderTextColor='#6D6F71'
        placeholder={label}
        style={[styles.input, multiline && { alignSelf: 'flex-start' }, inputStyle]}
        {...rest}
      />
    // </View>
  );
};

export default InputField;
