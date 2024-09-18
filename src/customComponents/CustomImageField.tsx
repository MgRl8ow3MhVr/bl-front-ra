// src/components/CustomImageField.tsx
import React from "react";

interface CustomImageFieldProps {
  source: string;
  alt?: string;
  placeholderSrc: string;
  style?: React.CSSProperties; // Optional styling
}

const CustomImageField: React.FC<CustomImageFieldProps> = ({
  source,
  alt,
  placeholderSrc,
  style,
}) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    (event.target as HTMLImageElement).src = placeholderSrc;
  };

  return <img src={source} alt={alt} onError={handleError} style={style} />;
};

export default CustomImageField;
