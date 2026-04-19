import { useContext, useEffect, useState } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'
import { type Key, Label, ToggleButton, ToggleButtonGroup } from '@heroui/react'

const ModeSelect = () => {
  const { mode, setMode } = useContext(GuessrContext)

  const [aangKeys, setAangKeys] = useState(new Set<Key>(['0', '1', '2']))
  const [korraKeys, setKorraKeys] = useState(new Set<Key>([]))

  useEffect(() => {
    const keys = [
      ...Array.from(aangKeys.values()),
      ...Array.from(korraKeys.values()),
    ]
    const newMode = keys
      .map((key) => Number(key))
      .map((num) => 2 ** num)
      .reduce((total, num) => total + num, 0)
    setMode(newMode)
  }, [aangKeys, korraKeys])

  return (
    <div className="flex gap-4 min-h-full">
      <ToggleButtonGroup
        orientation="vertical"
        selectionMode="multiple"
        selectedKeys={aangKeys}
        onSelectionChange={setAangKeys}
      >
        <ToggleButton id="0" aria-label="Water" className="w-12 justify-center">
          <Label className="text-blue-500">W</Label>
        </ToggleButton>
        <ToggleButton id="1" aria-label="Earth" className="w-12 justify-center">
          <ToggleButtonGroup.Separator />
          <Label className="text-green-500">E</Label>
        </ToggleButton>
        <ToggleButton id="2" aria-label="Fire" className="w-12 justify-center">
          <ToggleButtonGroup.Separator />
          <Label className="text-red-400">F</Label>
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        orientation="vertical"
        selectionMode="multiple"
        selectedKeys={korraKeys}
        onSelectionChange={setKorraKeys}
      >
        <ToggleButton id="3" aria-label="Air" className="w-12 justify-center">
          <Label className="text-cyan-500">A</Label>
        </ToggleButton>
        <ToggleButton
          id="4"
          aria-label="Spirits"
          className="w-12 justify-center"
        >
          <ToggleButtonGroup.Separator />
          <Label className="text-orange-300">S</Label>
        </ToggleButton>
        <ToggleButton
          id="5"
          aria-label="Change"
          className="w-12 justify-center"
        >
          <ToggleButtonGroup.Separator />
          <Label className="text-indigo-400">C</Label>
        </ToggleButton>
        <ToggleButton
          id="6"
          aria-label="Balance"
          className="w-12 justify-center"
        >
          <ToggleButtonGroup.Separator />
          <Label className="text-emerald-600">B</Label>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ModeSelect
