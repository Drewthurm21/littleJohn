import styled from "styled-components";
const littleJohnLogo = require('../../assets/littleJohnBanner.png');

export const CrossBar = styled.div`
  min-height: 2em;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor || `var(--green-ljt)`};
  position: relative;
  padding-bottom: 2px;
  transition: all 0.3s ease-in-out;
`;

export const BannerImg = styled.div`
  width: 15em;
  height: 2.5em;
  background-image: url(${littleJohnLogo});
  background-size: cover;
  left: 0;
  border: none;
`;

export const GlassDiv = styled.div`
  content: '';
  min-height: 2.5em;
  position: absolute;
  top: ${({ top }) => top || '0'};
  width: 100%;
  /* background: linear-gradient()(transparent 20%, transparent 30%, black); */
  backdrop-filter: blur(${({ blur }) => blur || '5px'});
  z-index: 0;
  -webkit-backdrop-filter:${({ blur }) => `blur(${blur})` || 'blur( 1px )'};
  -webkit-mask-image: linear-gradient(to bottom,black 10%,transparent 80%);
  mask-image: linear-gradient(to bottom,black 10%,transparent 80%);
`;