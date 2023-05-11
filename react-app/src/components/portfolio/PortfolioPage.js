import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PortfolioPage() {
  const dispatch = useDispatch
  const currentUser = useSelector(state => state.session.user)

  if (!currentUser) history.push('/');

  useEffect(() => {
    dispatch(getPortfoliosThunk(user.id))
  }, [dispatch, currentUser])

  return (
    <div>
      <h1>Portfolio Page</h1>
    </div>
  );
}