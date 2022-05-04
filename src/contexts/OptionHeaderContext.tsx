import { createContext, ReactNode, useState } from 'react'

type OptionHeaderContextData = {
    optionSelect: string,
    setOptionSelect: (state: string) => void,
}

type OptionHeaderContextProviderProps = {
    children: ReactNode,
}

export const OptionHeaderContext = createContext({} as OptionHeaderContextData)

export function OptionHeaderContextProvider({children}: OptionHeaderContextProviderProps) {
  const [optionSelect, setOptionSelect] = useState<string>('Albuns')

  return(
    <OptionHeaderContext.Provider 
        value = {{
            optionSelect,
            setOptionSelect,
        }}>
        {children}
    </OptionHeaderContext.Provider>
  )
}