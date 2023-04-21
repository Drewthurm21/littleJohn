import styled from "styled-components";
const littleJohnLogo = require('../../assets/littleJohnBanner.png');

export const CrossBar = styled.div`
  min-height: 2em;
  width: 100%;
  background-color: var(--green-ljt);
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