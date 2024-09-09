/** @format */

import { Card } from "./ui/card";
import { NavLink, useLocation } from "react-router-dom";
import { NavbarItems } from "../utils/navbar/navbarItems";
import { getConfigByRole } from "@/services/storage";

const BottomNavItem = ({
  to,
  icon,
  label,
  location,
}: {
  to: string;
  icon: React.ReactNode;
  label?: string;
  location: string;
}) => (
  <NavLink
    to={to}
    className={`flex flex-col items-center hover:text-[#D20606] ${
      location.indexOf(to) !== -1 && "text-[#D20606]"
    }`}>
    {icon}
    <span className="hidden">{label}</span>
  </NavLink>
);

function BottomNav() {
  const location = useLocation();
  const role = getConfigByRole();
  const settings = role ? NavbarItems[role] : [];
  
  return (
    <Card className='bg-white text-[#908787] px-5 z-10 w-full rounded-lg py-3'>
      <div className='py-2 text-5x1 flex justify-between'>
        {settings.map((item: any, index: number) => (
          <BottomNavItem key={index} {...item} location={location.pathname} />
        ))}
      </div>
    </Card>
  );
}

export default BottomNav;
