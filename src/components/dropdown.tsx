import { Button } from "@/components/ui/button";
import { DropdownPropType } from '../types/index';
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dropdown: React.FC<DropdownPropType> = ({ label, children, icon = null,  cn = "w-56" }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className={`flex justify-between ${cn}`}>
          <span className="flex items-center gap-2">
            {icon && icon}
            {label}
          </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
