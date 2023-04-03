import { Button, Icon } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { forwardRef, Ref } from 'react'

interface IconButtonProps {
  title: string
  icon: IconData
  onClick: () => Promise<void> | void
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { title, icon, onClick }: IconButtonProps,
    ref: Ref<HTMLButtonElement>
  ) {
    return (
      <Button variant="ghost_icon" onClick={onClick} ref={ref}>
        <Icon data={icon} title={title} />
      </Button>
    )
  }
)

export default IconButton
