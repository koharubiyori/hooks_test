import useLazyState from '../useLazyState'

export interface BooleanStateController {
  setTrue(): void
  setFalse(): void
  toggle(): void
  setFromValue(value: boolean | number | string): void
}

export default function useBoolean(initialValue = false): [boolean, BooleanStateController] {
  const [state, setState] = useLazyState(initialValue)

  const setTrue = () => setState(true)
  const setFalse = () => setState(false)
  const toggle = () => state ? setFalse() : setTrue()
  const setFromValue: BooleanStateController['setFromValue'] = value => setState(!!value)

  return [state, {
    setTrue,
    setFalse,
    toggle,
    setFromValue
  }]
}