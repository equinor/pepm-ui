import { Tabs } from '@equinor/eds-core-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tabs } from '../../../router';
import * as Styled from './Navigation.styled';

export const Navigation = () => {
  const navigate = useNavigate();

  const active = tabs.find(
    (tab) => `/${tab.path}` === window.location.pathname,
  );

  useEffect(() => {
    if (!active) navigate('models');
  }, [active, navigate]);

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
