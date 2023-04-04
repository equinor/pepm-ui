import { Menu } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { useRef, useState } from 'react'
import IconButton from '../IconButton/IconButton'

const MenuIcon = ({
  icon,
  children,
}: {
  icon: { title: string; data: IconData }
  children?: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLButtonElement>(null)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <IconButton
        title={icon.title}
        icon={icon.data}
        onClick={toggle}
        ref={ref}
      />
      <Menu
        open={isOpen}
        onClose={toggle}
        anchorEl={ref.current}
        placement="bottom-end"
      >
        {children}
      </Menu>
    </>
  )
}

export default MenuIcon
