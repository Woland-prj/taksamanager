'use client'
import { PropsWithChildren, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../../redux/store'

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
