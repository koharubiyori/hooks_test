import { Dispatch, SetStateAction, useState } from 'react'

const defaultCompareFn = <S>(value1: S, value2: S) => !Object.is(value1, value2)

export default function useLazyState<S>(
  initialState: S | (() => S),
  shouldSetState: (value1: S, value2: S) => boolean = defaultCompareFn
): 
  [S, Dispatch<SetStateAction<S>>] 
{
  const [state, setState] = useState(initialState)
  const setDiffState: Dispatch<SetStateAction<S>> = newValue => {
    let _newValue = newValue
    if (typeof newValue === 'function') _newValue = (newValue as any)(state)
    shouldSetState(state, _newValue as S) && setState(_newValue)
  }

  return [state, setDiffState]
}