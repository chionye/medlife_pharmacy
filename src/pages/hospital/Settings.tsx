/** @format */

import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SettingsItems } from "@/utils/settings/settingsitems";
import { getConfigByRole, getCookie, LogoutUser } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { UploadSingle } from "@/components/upload";
import checker from "@/assets/checker.svg";
import { ProfileSection, RenderUserInfo } from "@/components/section";
import { toTitleCase } from "@/services/helpers";
// import { Divider } from "@chakra-ui/react";
import { QueryProps, WebsiteSettingsPropType } from "@/types";
import Query from "@/api/query";

const AdminSettings = () => {
  const [websiteSettings, setWebsiteSettings] =
    useState<WebsiteSettingsPropType>({
      id: "",
      name: "medlife",
      phone_number: "09999",
      email: "medlife@gmail.com",
      address: "123 address",
      about_us: "medlife",
      password: "medlife",
      created_at: null,
      updated_at: "2024-09-14T06:31:37.000000Z",
    });
  const navigate = useNavigate();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: userData.photo || checker,
  });
  const [tab, setTab] = useState<boolean>(false);
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

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "website",
        url: "website/settings",
        method: "post",
        payload: { user_id: userData.id },
      },
    ],
    []
  );

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    console.log(queries[0].data);
    if (queries[0].data) setWebsiteSettings(queries[0].data.data);
  }, [queries]);

  return (
    <>
      <div className='flex justify-center items-center lg:px-10 px-5 mt-10'>
        <button
          className={`border-2 w-1/2 border-[#00C2C2] py-4 ${
            !tab
              ? "bg-[#F4F6FF] text-[#ADAFB5]"
              : "bg-[#00C2C2E5] text-[#FFFFFF]"
          } font-semibold lg:text-lg text-sm rounded-s-lg`}
          onClick={() => setTab(true)}>
          Website Settings
        </button>
        <button
          className={`border-2  w-1/2 border-[#00C2C2] py-4 ${
            !tab
              ? "bg-[#00C2C2E5] text-[#FFFFFF]"
              : "bg-[#F4F6FF] text-[#ADAFB5]"
          } font-semibold lg:text-lg text-sm rounded-e-lg`}
          onClick={() => setTab(false)}>
          Admin Profile Settings
        </button>
      </div>
      <div className='lg:px-10 px-5 mt-10'>
        {tab ? (
          <>
            <p className='text-[#00C2C2] text-[16px] font-semibold mt-10'>
              Website Information
            </p>
            <div className='flex justify-between items-center mt-10'>
              <div>
                {RenderUserInfo(
                  "Website Name",
                  toTitleCase(websiteSettings?.name),
                  "name",
                  "website/updateany"
                )}
                {RenderUserInfo(
                  "Email",
                  websiteSettings?.email,
                  "email",
                  "user/updateany"
                )}
                {RenderUserInfo(
                  "About Us",
                  toTitleCase(websiteSettings?.about_us),
                  "about_us",
                  "user/updateany"
                )}
              </div>
              <div>
                {RenderUserInfo(
                  "Website Phone Number",
                  websiteSettings?.phone_number,
                  "phone_number",
                  "user/updateany"
                )}
                {RenderUserInfo(
                  "Location",
                  websiteSettings?.address,
                  "address",
                  "user/updateany"
                )}
                {RenderUserInfo(
                  "Password",
                  websiteSettings?.password,
                  "password",
                  "user/updateany"
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='text-[#00C2C2] text-[16px] font-semibold'>
              Personal Information
            </p>
            <ProfileSection>
              <UploadSingle
                defaultPhoto={userPhoto?.photo}
                updatePhotoFunction={setUserPhoto}
              />
              <div className='flex justify-between items-center mt-10 lg:w-4/5 w-full'>
                <div>
                  <div>
                    {RenderUserInfo(
                      "Name",
                      toTitleCase(userData?.fullname),
                      "fullname",
                      "user/updateany"
                    )}
                  </div>
                  <div>
                    {RenderUserInfo(
                      "Email",
                      userData?.email,
                      "email",
                      "user/updateany"
                    )}
                  </div>
                  <div>
                    {RenderUserInfo(
                      "Gender",
                      toTitleCase(userData?.gender),
                      "gender",
                      "user/updateany",
                      "select",
                      ["male", "female"]
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
          </>
        )}

        <div className='mt-10'>
          {settings.map(({ title, icon, chevron, link }) =>
            title === "Logout" ? (
              <button
                key={title}
                className='flex justify-between items-center mt-6 lg:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
                onClick={logout}>
                <span className='flex items-center gap-3'>
                  <img src={icon} alt='icon' />
                  <span>{title}</span>
                </span>
                {chevron && <ChevronRight size={18} />}
              </button>
            ) : (
              <NavLink
                key={title}
                className='flex justify-between items-center mt-6 lg:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
                to={link}>
                <span className='flex items-center gap-3'>
                  <img src={icon} alt='icon' />
                  <span>{title}</span>
                </span>
                {chevron && <ChevronRight size={18} />}
              </NavLink>
            )
          )}
        </div>
      </div>
      {NotifierComponent}
    </>
  );
};

export default AdminSettings;
