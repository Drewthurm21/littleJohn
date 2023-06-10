import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usdFormatter } from "../../utilities";
import { CustomBtn, PlusBtn } from "../styledComponents/buttons";
import { StyledDiv, StyledInput } from "../styledComponents/misc";
import { createPortfolioThunk, enactPortfolioTrade } from "../../store/portfolios";

export default function PortfolioSection() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const portfolios = useSelector(state => state.portfolios)

  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const [confirmNewPortfolio, setConfirmNewPortfolio] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [editingPortfolio, setEditingPortfolio] = useState(false)
  const [newPortfolioName, setNewPortfolioName] = useState("")
  const [updatedPortfolioName, setUpdatedPortfolioName] = useState("")
  const [showDepositInput, setShowDepositInput] = useState(false)
  const [initialDeposit, setInitialDeposit] = useState("")
  const [depositAmount, setDepositAmount] = useState("")

  useEffect(() => {

  }, [portfolios])

  const handleCreatePortfolio = async () => {
    const newPortfolio = {
      name: newPortfolioName,
      owner_id: currentUser.id,
      balance: Number(initialDeposit),
      timestamp: `${Date.now()}`,
    };

    let newPortfolioId = dispatch(createPortfolioThunk(newPortfolio))

    const initialDepositTrade = {
      portfolio_id: newPortfolioId,
      ticker: 'USD',
      quantity: Number(initialDeposit),
      price: 1,
      trade_type: 'buy',
      timestamp: `${Date.now()}`,
    }

    dispatch(enactPortfolioTrade(initialDepositTrade))
    setTimeout(() => {
      setShowCreateMenu(false)
    }, 1500)
  };

  const handleShowCreateMenu = () => {
    setShowCreateMenu(!showCreateMenu)
    setNewPortfolioName('')
    setEditingPortfolio(false)
  };

  const handleSelectPortfolio = (e) => {
    setSelectedPortfolio(portfolios[e.target.value])
    setNewPortfolioName(portfolios[e.target.value]?.name || '')
    setShowCreateMenu(false)
    setEditingPortfolio(true)
    setShowDepositInput(false)
  };

  const handleDepositFunds = () => {
    const newDeposit = {
      portfolio_id: selectedPortfolio.id,
      ticker: 'USD',
      quantity: Number(depositAmount),
      price: 1,
      trade_type: 'deposit',
      timestamp: `${Date.now()}`,
    }

    dispatch(enactPortfolioTrade(newDeposit))
    setTimeout(() => setShowDepositInput(false), 1500)
  };

  const keyPressHandler = (event, callback) => {
    const { key } = event;
    callback((prevValue) =>
      key !== 'Backspace'
        ? !Number.isNaN(parseInt(key)) || key === ',' || key === '.'
          ? prevValue + key
          : prevValue
        : prevValue.substring(0, prevValue.length - 1)
    );
  };

  return (
    <>
      <StyledDiv col spaceBetween bottomBorder
        txSize='18px' txWeight='bold' margin='20px 0' pad='20px 0' minH='3vh'>
        <StyledDiv w='100%' spaceBetween>
          <StyledDiv bold>Portfolios</StyledDiv>
          <StyledDiv w='15px' h='15px' margin='5px 2% 0 0'>
            <PlusBtn colorHover='var(--money-green)'
              onClick={handleShowCreateMenu} />
          </StyledDiv>
        </StyledDiv>
        {showCreateMenu && Object.values(portfolios).length >= 3 &&
          <StyledDiv justify='center'>
            <StyledDiv w='100%' pad='0 0 12px 0'> You have reached the maximum number of portfolios</StyledDiv>
            <CustomBtn rounded txColor='white' bgColor='black'
              onClick={() => setShowCreateMenu(false)}>Cancel</CustomBtn>
          </StyledDiv>
        }
        {showCreateMenu && Object.values(portfolios).length < 3 &&
          <StyledDiv justify='center'>
            <StyledDiv w='100%' pad='0 0 12px 0'> Create a new portfolio</StyledDiv>
            <label>Name
              <StyledInput type='text'
                w='100%' h='30px' margin='5px 0'
                defaultValue={newPortfolioName}
                placeholder='Enter name here...'
                phSize='10px'
                onChange={(e) => setNewPortfolioName(e.target.value)}
              />
            </label>
            <label>Initial Deposit
              <StyledInput
                w='100%' h='30px' margin='5px 0'
                phSize='10px'
                placeholder='Initial deposit amount...'
                value={initialDeposit !== "" ? usdFormatter.format(initialDeposit) : ""}
                onKeyDown={(e) => keyPressHandler(e, setInitialDeposit)}
              />
            </label>
            {showCreateMenu && !confirmNewPortfolio &&
              <CustomBtn rounded txColor='white' bgColor='black'
                disabled={!newPortfolioName || !initialDeposit || initialDeposit === 0}
                onClick={() => setConfirmNewPortfolio(true)}>Create Portfolio</CustomBtn>
            }
            {showCreateMenu && confirmNewPortfolio &&
              <StyledDiv margin='30px 0 20px 0' w='100%' spaceBetween>
                <CustomBtn rounded w='47%' txColor='white' bgColor='black'
                  onClick={handleCreatePortfolio}>Confirm</CustomBtn>
                <CustomBtn rounded w='47%' txColor='white' bgColor='black'
                  onClick={() => setConfirmNewPortfolio(false)}>Cancel</CustomBtn>
              </StyledDiv>}
          </StyledDiv>
        }
      </StyledDiv>
      <StyledDiv col pad='0 0 12px 0'>
        {!selectedPortfolio && <StyledDiv>Select a portfolio to edit</StyledDiv>}
        <select onChange={handleSelectPortfolio}>
          <option value={0}>Choose a portfolio</option>
          {Object.values(portfolios).map(portfolio => (
            <option key={portfolio.id} value={portfolio.id}>{portfolio.name}</option>
          ))}
        </select>
      </StyledDiv>
      <StyledDiv col spaceBetween pad='0 0 20px 0' bottomBorder>
        {selectedPortfolio && editingPortfolio &&
          <>
            <label> Enter new portfolio Name
              <StyledInput w='100%' h='30px' margin='12px 0'
                value={updatedPortfolioName} onChange={e => setUpdatedPortfolioName(e.target.value)} />
            </label>
            <StyledDiv bold>
              {!showDepositInput && <>
                <StyledDiv txSize='18px' margin='20px 0 0 0' txAlign='end'
                  onClick={() => setShowDepositInput(true)}>+ Deposit funds</StyledDiv>
                <CustomBtn rounded margin='60px 0 0 0' txColor='white' bgColor='black'
                  onClick={handleDepositFunds}>Confirm</CustomBtn>
              </>
              }

              {showDepositInput &&
                <StyledDiv col align='center' h='200px' margin='12px 0' spaceBetween >
                  <StyledDiv>Current balance: {usdFormatter.format(selectedPortfolio.balance)}</StyledDiv>
                  <label > Deposit Amount
                    <StyledInput txSize='18px' txAlign='end' name='depositAmount'
                      value={depositAmount !== "" ? usdFormatter.format(depositAmount) : ""}
                      onKeyDown={(e) => keyPressHandler(e, setDepositAmount)} />
                  </label>
                  <CustomBtn rounded margin='60px 0 0 0' txColor='white' bgColor='black'
                    onClick={handleDepositFunds}>Confirm</CustomBtn>
                </StyledDiv>}
            </StyledDiv>
          </>
        }
      </StyledDiv>
    </>
  )
}