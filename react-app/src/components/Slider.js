import * as sc from './styledComponents'
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { StyledSpan } from './styledComponents/misc';

const {
  containers: { Container },
  misc: { StyledDiv, StyledImg },
  buttons: { CustomBtn }
} = sc

export const SliderCard = ({ cardInfo }) => {
  const { titleText, imgSrc, infoText, btnText, disclaimer } = cardInfo

  const history = useHistory()

  const goToSignup = () => {
    history.push('/signup')
  }

  return (
    <StyledDiv onClick={goToSignup} h='550px' w='45vw' cursor='pointer'>
      <Container rounded col bgColor='white'>

        {/* card top */}
        <StyledDiv w='100%' h='100%' >
          <StyledImg radius='20px 20px 0 0' src={imgSrc} />
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
          <StyledDiv w='48%' direction='column' justify='space-between'>
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
    setTimeout(() => {
      setIndex((index + 1) % cards.length);
      console.log(index);
    }, 5000);
  }, [index]);

  return (
    <div className="slider">
      <div className="carousel">
        {cards.map((item, i) => {
          const indexLeft = mod(index - 1, cards.length);
          const indexRight = mod(index + 1, cards.length);

          let className = "card";

          if (i === index) {
            className = "card card--active";
          } else if (i === indexRight) {
            className = "card card--right";
          } else if (i === indexLeft) {
            className = "card card--left";
          } else className = "card";

          return (
            <div to='/signup'
              key={item.id}
              className={className}
              src={item.image}
              alt="Comic"
            >
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
const fourPctImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/goldsweep__7fe8c8990e5cf136ba96ceb4bab4e08b.png'
const cardOne = {
  titleText: ['Step up to the', 'new 4.4% APY'],
  imgSrc: fourPctImgSrc,
}


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

const mod = (n, m) => {
  let result = n % m;
  // Return a positive value
  return result >= 0 ? result : result + m;
};













































/*

export default function ResponsiveSlider({ cards }) {

  return (
    <SliderContainer>
      <h1>YO</h1>
      <Slider {...defaultSliderSettings}>
        <SliderCard index={1} options={cardOne} />
        <SliderCard index={2} options={cardOne} />
        <SliderCard index={3} options={cardOne} />
        <SliderCard index={4} options={cardOne} />
      </Slider>
    </SliderContainer>
  );
}


const defaultSliderSettings = {
  dots: true,
  infinite: false,
  initialSlide: 0,
  className: "slider",
  centerMode: true,
  centerPadding: "60px",
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

*/