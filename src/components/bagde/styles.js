import styled, { css } from "styled-components";
import { COLOR, FONT } from "../../styles/variables";

export const SimpleBadgeStyled = styled.div`
  background-color: ${props =>
    props.bgColor ? props.bgColor : COLOR.contrast};
  display: flex;
  padding: ${props => props.padding};
  justify-content: center;
  align-items: center;
  opacity: ${props => props.disabled ? "0.5" : "1"}
  border-radius: 20px;

  > span {
    font-size: ${props => props.fontSize}px;
    line-height: ${props => props.fontSize}px;
    font-family: ${FONT.workSansBold};
    color: ${props => (props.textColor ? props.textColor : COLOR.white)};
    text-transform: uppercase;
  }

  &.type2 {
    background-color: ${COLOR.primaryContrast2};
    height: 40px;
    width: 80px;
    > span {
      font-size: 12px;
      line-height: 12px;
    }
  }

  ${props =>
    props.isStyleSecondary &&
    css`
      min-height: 20px;
      background-color: ${COLOR.white};
      border: 1px solid ${COLOR.contrast};
      padding: 3px 10px;
      border-radius: 3px;
      > span {
        color: ${COLOR.contrast};
        font-size: 10px;
        line-height: 10px;
        font-family: ${FONT.workSansRegular};
      }
    `}

  &.rounded {
    border-radius: 3px;
    background-color: ${props =>
      props.bgColor ? props.bgColor : COLOR.contrast};
    height: ${props => (props.height ? props.height : "25px")};
    padding: ${props => (props.padding ? props.padding : "0px")};
  }

  &.tag {
    border-radius: 20px;
    background-color: ${props => (props.bgColor ? props.bgColor : COLOR.white)};
    border: 1px solid
      ${props => (props.borderColor ? props.borderColor : COLOR.contrast)};
      ${props => (props.textColor ? props.textColor : COLOR.contrast)};
    > span {
      font-family: ${FONT.workSansBold};
      font-size: 12px;
    }
  }

  &.text-light {
    > span {
      font-family: ${FONT.robotoLight};
    }
  }

  &.text-bold {
    > span {
      font-family: ${FONT.robotoBold};
    }
  }

  &.font-secondary {
    > span {
      font-family: ${FONT.workSansRegular};
    }

    &.text-light {
      > span {
        font-family: ${FONT.workSansLight};
      }
    }

    &.text-bold {
      > span {
        font-family: ${FONT.workSansBold};
      }
    }
  }
`;
