import { StyledDiv } from "../styledComponents/misc";
import WatchlistSection from "./WatchlistSection";
import TradeviewSection from "./TradeviewSection";

export default function Sidebar({ tradeView, watchlists }) {

  return (
    <StyledDiv
      col w='20vw' minH='40vh' margin='0 2vw 0 0' pad='4px'
      border='1px solid var(--gray-400)'>

      {tradeView && <TradeviewSection />}

      {watchlists && <WatchlistSection />}
    </StyledDiv>
  )
};