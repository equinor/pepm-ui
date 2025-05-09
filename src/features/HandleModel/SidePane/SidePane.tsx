import { SideBar, SidebarLinkProps, Tooltip } from '@equinor/eds-core-react';
import { arrow_back as BACK } from '@equinor/eds-icons';
import { useNavigate } from 'react-router-dom';

import * as Styled from './SidePane.styled';
import { usePepmContextStore } from '../../../stores/GlobalStore';
import { useAddModelStore } from '../../../pages/AddModel/stores/AddModelStore';

export const SidePane = ({ uploading }: { uploading: boolean }) => {
  const { setAnalogueModelDefault } = usePepmContextStore();
  const { resetState } = useAddModelStore();
  const navigate = useNavigate();

  const backItems: SidebarLinkProps = {
    label: 'Back to models',
    icon: BACK,
    href: '/',
    active: false,
  };
  return (
    <Styled.SidebarWrapper>
      <SideBar open>
        <Styled.SidebarContent>
          {uploading ? (
            <Tooltip title="Button disabled until model has finished uploading.">
              <Styled.Back
                label={backItems.label}
                icon={backItems.icon}
              ></Styled.Back>
            </Tooltip>
          ) : (
            <Styled.Back
              label={backItems.label}
              icon={backItems.icon}
              onClick={() => {
                setAnalogueModelDefault();
                resetState();
                navigate('/');
              }}
            ></Styled.Back>
          )}
        </Styled.SidebarContent>
      </SideBar>
    </Styled.SidebarWrapper>
  );
};
