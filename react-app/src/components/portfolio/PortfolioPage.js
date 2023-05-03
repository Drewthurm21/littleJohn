import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PortfolioPage() {
  const dispatch = useDispatch
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getPortfoliosThunk(user.id))
  }, [user])

  return (
    <div>
      <h1>Portfolio Page</h1>
    </div>
  );
}