import React from "react";
import { SimpleBadgeStyled } from "./styles";
import { COLOR } from "../../styles/variables";

export default function SimpleBadge({
  text,
  textColor,
  bgColor,
  borderColor,
  children,
  isRounded,
  isTag,
  isTextBold,
  isTextLight,
  isFontSecondary,
  fontSize,
  height,
  padding,
  className,
  disabled,
  isStyleSecondary,
  ...props
}) {
  let classNameX = "badge ";
  classNameX += isRounded ? "rounded " : "";
  classNameX += isTag ? "tag " : "";
  classNameX += isTextBold ? "text-bold " : "";
  classNameX += isTextLight ? "text-light " : "";
  classNameX += isFontSecondary ? "font-secondary " : "";
  classNameX += className;
  return (
    <SimpleBadgeStyled
      textColor={textColor}
      bgColor={bgColor}
      borderColor={borderColor}
      className={classNameX}
      fontSize={fontSize}
      padding={padding}
      height={height}
      disabled={disabled}
      isStyleSecondary={isStyleSecondary}
      {...props}
    >
      <span>{text && text}</span>
      {children && children}
    </SimpleBadgeStyled>
  );
}
SimpleBadge.defaultProps = {
  text: "Default text",
  textColor: COLOR.white,
  bgColor: COLOR.contrast,
  isRounded: false,
  isTextBold: false,
  isTextLight: false,
  isFontSecondary: false,
  disabled: false,
  fontSize: 15,
  padding: "5px 10px"
};
