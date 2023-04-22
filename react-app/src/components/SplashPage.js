import styled from 'styled-components';
import { containers } from './styledComponents/'
const { ColContainer, PageContainer, RowContainer, PageContentContainer } = containers;
const imgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__d3559005213c848c01f05060ac9469e0.png'

const PhoneImg = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSection = styled.section`
  width: ${({ w }) => w || '100%'};
  height: ${({ h }) => h || '100%'};
  min-height: ${({ mh }) => mh || ''};
  min-width: ${({ mw }) => mw || ''};
  background-color: ${({ bgColor }) => bgColor || '#fff'};
`;

export default function SplashPage() {

  return (
    <PageContainer>
      <StyledSection mh={'100vh'} bgColor={'#000'}>
        <PageContentContainer>

        </PageContentContainer>
      </StyledSection>
      <StyledSection bgColor={'#c3f53c'}>
        <PageContentContainer>
          <PhoneImg >
            <img src={imgSrc} alt="phone" />
          </PhoneImg>
          <ColContainer>
            <div style={{ fontSize: '3em' }}>Investing</div>
            <div>Intuitively</div>
          </ColContainer>
        </PageContentContainer>
      </StyledSection>
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