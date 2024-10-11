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
import { ProfileSection, RenderUserInfo } from "@/components/section";
import { toTitleCase } from "@/services/helpers";

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
      <NavLink to={"/patient/home"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>My Profile</p>
      </NavLink>
      <div className='mt-10 px-5 lg:gap-20'>
        <ProfileSection userData={userData}>
          <UploadSingle
            defaultPhoto={userPhoto.photo}
            updatePhotoFunction={setUserPhoto}
          />
          <div className='flex justify-between items-start lg:mt-0 mt-5 lg:w-3/5 w-full'>
            <div>
              <div>
                {RenderUserInfo(
                  "Name",
                  toTitleCase(userData.fullname),
                  "fullname",
                  "user/updateany"
                )}
              </div>
              <div>
                {RenderUserInfo(
                  "Gender",
                  toTitleCase(userData.gender),
                  "gender",
                  "user/updateany",
                  "select",
                  ["male", "female"]
                )}
              </div>
              <div>
                {RenderUserInfo(
                  "Email",
                  toTitleCase(userData.email),
                  "email",
                  "user/updateany"
                )}
              </div>
            </div>
            <div>
              <div>
                {RenderUserInfo(
                  "Phone Number",
                  toTitleCase(userData.phone),
                  "phone",
                  "user/updateany"
                )}
              </div>
              <div>
                {RenderUserInfo(
                  "Date of Birth",
                  toTitleCase(userData.dob),
                  "dob",
                  "user/updateany"
                )}
              </div>
              <div>
                {RenderUserInfo(
                  "Password",
                  toTitleCase(userData.password),
                  "password",
                  "user/updateany"
                )}
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>
      <div className='mt-14 lg:px-10 px-5'>
        {settings.map(
          (setting: {
            title: string;
            icon: string;
            chevron: boolean;
            link: string;
          }) => {
            return setting.title === "Logout" ? (
              <button
                className='flex text-sm justify-between items-center mt-6 lg:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
                onClick={logout}>
                <span className='flex items-center gap-3'>
                  <img src={setting.icon} alt='star icon' />
                  <span>{setting.title}</span>
                </span>
                {setting.chevron && <ChevronRight size={18} />}
              </button>
            ) : (
              <NavLink
                className='flex text-sm justify-between items-center mt-6 lg:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
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
