import React from 'react';
import { Image, type ImageStyle, type ImageURISource } from 'react-native';

export interface IconProps {
  name: string;
  size: number;
}

export const PredeterminedIcon = ({ name, size }: IconProps) => {
  let imageSource;
  switch (name) {
    case 'red-eye':
      imageSource =
        require('../../assets/icons/red-eye-outline.png') as ImageURISource;
      break;
    case 'red-eye-off':
      imageSource =
        require('../../assets/icons/red-eye-off-outline.png') as ImageURISource;
      break;
    case 'eye':
      imageSource =
        require('../../assets/icons/eye-outline.png') as ImageURISource;
      break;
    case 'eye-off':
      imageSource =
        require('../../assets/icons/eye-off-outline.png') as ImageURISource;
      break;
    case 'content-copy':
    default:
      imageSource =
        require('../../assets/icons/content-copy.png') as ImageURISource;
      break;
  }

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
  };

  return <Image source={imageSource} style={imageStyle} />;
};
