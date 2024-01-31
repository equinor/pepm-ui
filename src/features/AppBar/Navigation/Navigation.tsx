import { Tabs } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './Navigation.styled';

interface Tab {
  title: string;
  path: string;
}

const tabs: Tab[] = [
  { title: 'Models', path: '/' },
  { title: 'API', path: 'api' },
  { title: 'About', path: 'about' },
];

export const Navigation = () => {
  const navigate = useNavigate();

  const active = tabs.find(
    (tab) => `/${tab.path}` === window.location.pathname,
  );

  function clickTab(tab: number) {
    navigate(tabs[tab].path);
  }

  return (
    <Styled.Tabs activeTab={active && tabs.indexOf(active)} onChange={clickTab}>
      <Tabs.List>
        {tabs.map((tab) => (
          // TODO: Ensure that default accessibility concerns are met
          // This doesn't support browser's default behaviour to "open in new tab"
          <Tabs.Tab key={tab.title} active={tab === active}>
            {tab.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Styled.Tabs>
  );
};
