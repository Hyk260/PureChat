export interface MenuItem {
  key: string
  label: string
  icon?: any
  disabled?: boolean
  danger?: boolean
  hide?: boolean
  divider?: boolean
  children?: MenuItem[]
  action?: (item: MenuItem, data?: any) => void
}

export interface ContextMenuProps {
  items: MenuItem[]
  triggerData?: any
}
