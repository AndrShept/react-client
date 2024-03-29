import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { increment } from '@/lib/redux/counterSlice';


function App() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div onClick={() => dispatch(increment())}>
      <p>{value}</p>
    </div>
  );
}

export default App;
