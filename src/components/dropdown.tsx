/** @format */

import { DropdownOption, DynamicDropdownProps } from "../types/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";

const Dropdown: React.FC<DynamicDropdownProps> = ({
  label,
  options,
  icon,
  cn,
  value,
  showArrow = true,
  dropdownType = null,
  changeFunction,
  openChange,
  dropDownClickFn,
}) => {
  const renderDropdownItems = (items: DropdownOption[]) => {
    return (
      items &&
      items.map((item, index) => {
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

        return dropdownType === "button" || dropdownType === null ? (
          <DropdownMenuItem className={cn} onClick={dropDownClickFn}>
            {item.child ? item.child : item.label}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuRadioItem value={item.label} className={cn}>
            {item.label}
          </DropdownMenuRadioItem>
        );
      })
    );
  };

  return (
    <DropdownMenu onOpenChange={openChange}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className={`flex justify-between ${cn}`}>
          <span className='flex items-center gap-2'>
            {icon && icon}
            {label}
          </span>
          {showArrow && (
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownType === "button" || dropdownType === null ? (
          <DropdownMenuGroup>{renderDropdownItems(options)}</DropdownMenuGroup>
        ) : (
          <DropdownMenuRadioGroup value={value} onValueChange={changeFunction}>
            {renderDropdownItems(options)}
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
