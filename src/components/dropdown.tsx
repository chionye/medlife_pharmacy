import { DropdownOption, DynamicDropdownProps } from '../types/index';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { ChevronsUpDown } from 'lucide-react';

const Dropdown: React.FC<DynamicDropdownProps> = ({ label, options, icon, cn }) => {
  const renderDropdownItems = (items: DropdownOption[]) => {
    return items && items.map((item, index) => {
      if (item.items) {
        
        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {renderDropdownItems(item.items)}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={index} onClick={item.onClick} className={cn}>
          {item.label}
        </DropdownMenuItem>
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className={`flex justify-between ${cn}`}>
          <span className='flex items-center gap-2'>
            {icon && icon}
            {label}
          </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>{renderDropdownItems(options)}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
