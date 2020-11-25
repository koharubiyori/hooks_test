import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import useLazyState from '../useLazyState'

// 设置effectedRef后ref将不会在setState时更新，而是在下一次执行useEffect中更新
export default function useStateWithRef<S>(initialState: S | (() => S), effectedRef = false): 
  [S, Dispatch<SetStateAction<S>>, Readonly<{ current: S }>] 
{
  const [state, setState] = useLazyState(initialState)
  const stateRef = useRef(state)

  useEffect(() => {
    if (effectedRef) stateRef.current = state 
  })

  const setStateWithRef: Dispatch<SetStateAction<S>> = newValue => {
    let _newValue = newValue
    if (typeof newValue === 'function') _newValue = (newValue as any)(state)
    setState(_newValue)
    if (!effectedRef) stateRef.current = _newValue as S
  }
  
  return [state, setStateWithRef, stateRef]
}