/* eslint-disable camelcase */
import { useRef, useState } from 'react';
import { Button, Icon, Popover, Typography } from '@equinor/eds-core-react';
import { close, help_outline } from '@equinor/eds-icons';

const TooltipPopover = (props: {
  tooltipTitle: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  const popoverActionButton = () => {
    return (
      <Button
        aria-haspopup
        aria-expanded={isOpen}
        ref={anchorRef}
        onClick={openPopover}
        variant={'ghost_icon'}
      >
        <Icon data={help_outline}></Icon>
      </Button>
    );
  };

  const popoverTitle = () => {
    return (
      <Popover.Title
        style={{
          display: 'flex',
          flexGrow: '1',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '0.5rem',
        }}
      >
        <Typography variant="h6" as="h5">
          {props.tooltipTitle}
        </Typography>
        <Button
          style={{
            height: '32px',
            width: '32px',
          }}
          variant="ghost"
          aria-label="Close popover"
          onClick={closePopover}
        >
          <Icon name="close" data={close} size={24} />
        </Button>
      </Popover.Title>
    );
  };

  const popover = () => {
    return (
      <Popover
        anchorEl={anchorRef.current}
        onClose={closePopover}
        open={isOpen}
        placement={'right'}
        withinPortal
      >
        <Popover.Header style={{ marginBottom: '-0.9rem' }}>
          {popoverTitle()}
        </Popover.Header>
        <Popover.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{ margin: '1rem' }}>
            {props.description}
          </Typography>
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <div>
      {popoverActionButton()}
      {popover()}
    </div>
  );
};

export default TooltipPopover;
