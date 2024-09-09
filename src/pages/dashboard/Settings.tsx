/** @format */

import { useState } from "react";
import checker from "@/assets/checker.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SettingsItems } from "@/utils/settings/settingsitems";
import { getConfigByRole, getCookie, LogoutUser } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { UploadSingle } from "@/components/upload";
import { ProfileSection } from "@/components/section";

const Settings = () => {
  const navigate = useNavigate();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: userData.photo || checker,
  });
  const { showNotifier, NotifierComponent } = useNotifier();

  const logout = () => {
    showNotifier({
      title: "Logging Out?",
      text: "Taking a break? Your session will time out after a while, but your account and info are always safe here at Medlife Link. See you soon!",
      status: "warning",
      button: true,
      confirmText: "Sure,Log Out",
      cancelText: "Cancel",
      confirmFunction: () => {
        if (LogoutUser()) {
          toast({
            title: "Success",
            description: "you are logged out",
          });
          navigate("/");
        }
      },
    });
  };

  const role = getConfigByRole();
  const settings = role ? SettingsItems[role] : [];

  return (
    <>
      <NavLink to={"/dashboard/home"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>My Profile</p>
      </NavLink>
      <div className='mt-10 px-5 md:gap-20'>
        <ProfileSection userData={userData}>
          <UploadSingle
            defaultPhoto={userPhoto.photo}
            updatePhotoFunction={setUserPhoto}
          />
        </ProfileSection>
      </div>
      <div className='mt-14 md:px-10 px-5'>
        {settings.map(
          (setting: {
            title: string;
            icon: string;
            chevron: boolean;
            link: string;
          }) => {
            return setting.title === "Logout" ? (
              <button
                className='flex text-sm justify-between items-center mt-6 md:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
                onClick={logout}>
                <span className='flex items-center gap-3'>
                  <img src={setting.icon} alt='star icon' />
                  <span>{setting.title}</span>
                </span>
                {setting.chevron && <ChevronRight size={18} />}
              </button>
            ) : (
              <NavLink
                className='flex text-sm justify-between items-center mt-6 md:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
                to={setting.link}>
                <span className='flex items-center gap-3'>
                  <img src={setting.icon} alt='star icon' />
                  <span>{setting.title}</span>
                </span>
                {setting.chevron && <ChevronRight size={18} />}
              </NavLink>
            );
          }
        )}
      </div>
      {NotifierComponent}
    </>
  );
};

export default Settings;
