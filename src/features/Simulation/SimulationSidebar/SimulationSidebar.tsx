import { SidebarLinkProps } from '@equinor/eds-core-react';
import {
  arrow_back as arrowBack,
  IconData,
  list as listIcon,
  settings as settingsIcon,
  timeline as timelineIcon,
} from '@equinor/eds-icons';
import * as Styled from './SimulationSidebar.styled';

type MenuItems = SidebarLinkProps & {
  subItems?: Array<{
    label: string;
    name: string;
    icon: IconData;
  }>;
};

interface SimulationSidebarProps {
  onBackToQueue: () => void;
  activeSection?: 'progress' | 'parameters';
  onNavigate?: (section: 'progress' | 'parameters') => void;
}

export const SimulationSidebar = ({
  onBackToQueue,
  activeSection = 'progress',
  onNavigate,
}: SimulationSidebarProps) => {
  const scenarioBuildItems: MenuItems = {
    label: 'Scenario build',
    href: '',
    icon: settingsIcon,
    subItems: [
      {
        label: 'Simulation progress',
        name: 'progress',
        icon: timelineIcon,
      },
      {
        label: 'Input parameters',
        name: 'parameters',
        icon: listIcon,
      },
    ],
  };

  return (
    <Styled.Sidebar open>
      <Styled.SidebarContent>
        <Styled.Back
          label="Back to simulation queue"
          icon={arrowBack}
          onClick={onBackToQueue}
        />

        <Styled.SidebarLink
          disabled
          label={scenarioBuildItems.label}
          icon={scenarioBuildItems.icon}
          onClick={() => onNavigate?.('progress')}
        />
        {scenarioBuildItems.subItems?.map((item) => (
          <Styled.AccordionItem
            className={item.name === activeSection ? 'activeTab' : undefined}
            key={item.label}
            label={item.label}
            active={item.name === activeSection}
            onClick={() => onNavigate?.(item.name as 'progress' | 'parameters')}
          />
        ))}
      </Styled.SidebarContent>
    </Styled.Sidebar>
  );
};
