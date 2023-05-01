import * as sc from './styledComponents'
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const {
  containers: { Container },
  misc: { StyledDiv, StyledImg, StyledSpan },
  buttons: { CustomBtn }
} = sc

export const SliderCard = ({ cardInfo }) => {
  const { titleText, imgSrc, infoText, btnText, disclaimer } = cardInfo
  const history = useHistory()

  const goToSignup = () => history.push('/signup')

  return (
    <StyledDiv onClick={goToSignup} h='600px' w='45vw' cursor='pointer'>
      <Container rounded col bgColor='white'>

        {/* card top */}
        <StyledDiv w='100%' h='100%' >
          <StyledImg cursor='pointer' radius='20px 20px 0 0' src={imgSrc} />
        </StyledDiv>

        {/* card bottom */}
        <StyledDiv minH='50%' w='100%' margin='1vh 0px 0px 2vw'>

          {/* bottom left */}
          <StyledDiv w='40%' direction='column' >
            {titleText && titleText.map((text, i) => (
              <StyledDiv txSize='2vw' key={i} >{text}</StyledDiv>
            ))}
          </StyledDiv>

          {/* bottom right */}
          <StyledDiv w='48%' direction='column' spaceBetween>
            <StyledDiv>
              {infoText && infoText.map((text, i) => (
                <StyledDiv txSize='1vw' key={i} >{text}</StyledDiv>
              ))}
            </StyledDiv>
            <StyledDiv>
              <StyledSpan margin='0px 15px 0px 0px'>
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000", }} />
              </StyledSpan>
              {disclaimer}
            </StyledDiv>
            <CustomBtn margin='0 0 28px 0' txSmall rounded border='1px solid white'
              h='45px' minW='240px' bgColor='var(--bright-green)'>{btnText}</CustomBtn>
          </StyledDiv>
        </StyledDiv>
      </Container>
    </StyledDiv>
  );
};

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setIndex((index + 1) % cards.length), 3500);

    return () => clearTimeout();
  }, [index]);

  return (
    <div className="slider">
      <div className="carousel">
        {cards.map((item, i) => {
          const indexLeft = ((index + 1) % cards.length);

          let className = "card";
          if (i === index) className += " card--active"
          else if (i === indexLeft) className += " card--right"
          else className += " card--left";

          return (
            <div key={item.id} className={className}>
              <SliderCard cardInfo={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const blocksImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/fractional__37876c3de0a752366b0b352fad9b9be5.png'
const phoneImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/ncw__977abc0ba9a87ade9df79b4e33db30a7.jpg'
const stockLendingImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/stocklending__9e8a647e0363cbbbd79dc4a2509c9b62.png'

const cards = [
  {
    id: "1",
    titleText: ['Choose your free', 'stock.'],
    infoText: ['Sign up for Robinhood or refer a friend to', 'choose your free fractional share in',
      'companies you love. Certain limitations', 'apply.'],
    disclaimer: ['Certain limitations apply'],
    imgSrc: blocksImgSrc,
    btnText: 'Sign up now to claim your free stock'
  },
  {
    id: "2",
    titleText: ['Own & control', 'your crypto. Swap', 'with no network', 'fees.'],
    infoText: ['Robinhood Wallet is your self-custody home', 'for crypto, NFTs, web3, and dapps.'],
    disclaimer: ['NCW Disclosures'],
    imgSrc: phoneImgSrc,
    btnText: 'Learn more about Cash Management'
  },
  {
    id: "3",
    titleText: ['Earn income on', 'stocks you own'],
    infoText: ['Get the opportunity to earn income on', 'stocks you already own—just by turning on',
      'Stock Lending.'],
    disclaimer: ['Stock Lending Disclosures'],
    imgSrc: stockLendingImgSrc,
    btnText: 'Learn more'
  },
];

