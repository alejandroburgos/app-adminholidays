import { HStack, Radio, useRadioGroup } from '@chakra-ui/react'
import React from 'react'

export const CustomRadioGroup = (props) => {
    const { options, ...rest } = props

    const { getRootProps, getRadioProps, isDisabled } = useRadioGroup({
      ...rest,
    })
  
    const group = getRootProps()
  
    return (
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <Radio isDisabled={isDisabled} key={value} {...radio}>
              {value}
            </Radio>
          )
        })}
      </HStack>
    )
}
