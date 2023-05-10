import { StyledDiv } from "../styledComponents/misc";
import WatchlistSection from "./WatchlistSection";
import TradeviewSection from "./TradeviewSection";

export default function Sidebar(props) {

  return (
    <StyledDiv col w='20vw' margin='0 2vw 0 0' pad='4px' radius='5px'
      shadow='var(--custom-shadow-2)' border='1px solid var(--gray-100)'>
      {props.tradeView && <TradeviewSection {...props} />}
      {props.watchlists && <WatchlistSection {...props} />}
    </StyledDiv>
  )
};