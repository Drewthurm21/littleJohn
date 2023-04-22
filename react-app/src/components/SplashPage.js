import styled from 'styled-components';
import { containers } from './styledComponents/'
const { ColContainer, PageContainer, RowContainer } = containers;
const imgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__d3559005213c848c01f05060ac9469e0.png'

const PhoneImg = styled.div`
  width: 100%;
  height: 100%;
`

export default function SplashPage() {

  return (
    <PageContainer>
      <RowContainer>
        <PhoneImg >
          <img src={imgSrc} alt="phone" />
        </PhoneImg>
        <ColContainer>
          <div style={{ fontSize: '5em', }}>INVEST</div>
          <div>Intuitively</div>
        </ColContainer>
      </RowContainer>
      <RowContainer>
        <PhoneImg >
          <img src={imgSrc} alt="phone" />
        </PhoneImg>
        <ColContainer>
          <div style={{ fontSize: '5em', }}>INVEST</div>
          <div>Intuitively</div>
        </ColContainer>
      </RowContainer>
    </PageContainer >
  )
};