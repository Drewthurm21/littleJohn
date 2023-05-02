
// images
const phoneImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__d3559005213c848c01f05060ac9469e0.png'
const cryptoImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_crypto__6ef026ace9c7f7cf1047e15b98117523.png'
const clockImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_retirement__5374f56dd9d539e25dca91702d2911fb.png'
const cashCardImgSrc = 'https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_rhy__f46716f2b0d33cb50059e1b69fd8c93a.png'


export const splashPageData = [
  {
    heroText: 'Investing',
    mainText: ['Build your', 'portfolio starting', 'with just $1'],
    subText: ['Invest in stocks, options, and ETFs at your pace', 'and commission-free.'],
    disclaimer: 'Stocks & funds offered through Robinhood Financial. Other fees may apply. See our Fee Schedule for more details.',
    imgSrc: phoneImgSrc,
    imgAlt: 'phone',
    heroColor: '#36d136',
    textColor: 'black',
    bgColor: 'var(--bright-green)',
    btnText: 'Learn more',
  },
  {
    heroText: 'Crypto',
    mainText: ['Dive right in', 'without the', 'commission fees'],
    subText: [
      'Other crypto exchanges charge up to 4% just to',
      'buy and sell crypto. We charge 0%. Get BTC,',
      'ETH, LTC, DOGE, and more with as little as $1.'
    ],
    disclaimer: 'Crypto offered through LittleJohn Crypto.',
    imgSrc: cryptoImgSrc,
    imgAlt: 'phone',
    heroColor: '#ff5a87',
    textColor: 'white',
    bgColor: 'var(--indigo-900)',
    btnText: 'Learn more',
  },
  {
    heroText: 'Retirement',
    mainText: ['The only IRA with', 'a match.'],
    subText: [
      'Introducing LittleJohn Retirement — Get a 1%',
      'match, custom recommended portfolios, and no',
      'commission fees.'
    ],
    disclaimer: '',
    imgSrc: clockImgSrc,
    imgAlt: 'phone',
    heroColor: 'var(--bright-green)',
    textColor: 'white',
    bgColor: '#002411',
    btnText: 'Learn more',
  },
  {
    heroText: 'Cash Card',
    mainText: ['Earn weekly', 'rewards as you', 'spend'],
    subText: [
      "Introducing the new LittleJohn Cash Card — it's",
      'the debit card with weekly rewards that helps',
      'you invest when you spend.',
    ],
    disclaimer: 'The LittleJohn Cash Card and other spending products offered through Acme Inc.',
    imgSrc: cashCardImgSrc,
    imgAlt: 'phone',
    heroColor: 'var(--bright-green)',
    textColor: 'white',
    bgColor: '#007ff5',
    btnText: 'Learn more',
  },
]