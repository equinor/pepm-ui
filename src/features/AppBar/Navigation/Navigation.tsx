import { Tabs } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tabs } from '../../../router'
import * as Styled from './Navigation.styled'

export const Navigation = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0])

  function clickTab(tab: number) {
    navigate(tabs[tab].path)
    setActiveTab(tabs[tab])
  }

  return (
    <Styled.Tabs activeTab={tabs.indexOf(activeTab)} onChange={clickTab}>
      <Tabs.List>
        {tabs.map((tab) => (
          // TODO: Ensure that default accessibility concerns are met
          // This doesn't support browser's default behaviour to "open in new tab"
          <Tabs.Tab key={tab.title} active={tab === activeTab}>
            {tab.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Styled.Tabs>
  )
}
