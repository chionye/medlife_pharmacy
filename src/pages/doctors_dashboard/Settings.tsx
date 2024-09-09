/** @format */

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SettingsItems } from "@/utils/settings/settingsitems";
import { getConfigByRole, getCookie, LogoutUser } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { UploadSingle } from "@/components/upload";
import checker from "@/assets/checker.svg";
import { ProfileSection } from "@/components/section";
import ConsultationForm from "@/components/consultation_form";
import FullModal from "@/components/full_modal";
import ChangeUserForm from "@/components/settings_form";
import { toTitleCase } from "@/services/helpers";
import { Divider } from "@chakra-ui/react";

const DoctorSettings = () => {
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

  return (
    <>
      <div className='flex justify-center items-center md:px-10 px-5 mt-10'>
        <button
          className={`border-2 w-1/2 border-[#00C2C2] py-4 ${
            !tab
              ? "bg-[#F4F6FF] text-[#ADAFB5]"
              : "bg-[#00C2C2E5] text-[#FFFFFF]"
          } font-semibold md:text-lg text-sm rounded-s-lg`}
          onClick={() => setTab(true)}>
          Consultation Charges
        </button>
        <button
          className={`border-2  w-1/2 border-[#00C2C2] py-4 ${
            !tab
              ? "bg-[#00C2C2E5] text-[#FFFFFF]"
              : "bg-[#F4F6FF] text-[#ADAFB5]"
          } font-semibold md:text-lg text-sm rounded-e-lg`}
          onClick={() => setTab(false)}>
          Profile Settings
        </button>
      </div>
      <div className='md:px-10 px-5 mt-10'>
        {tab ? (
          <>
            <ConsultationForm />
            <div className='mt-10'>
              {settings.map(
                (setting: {
                  title: string;
                  icon: string;
                  chevron: boolean;
                  link: string;
                }) => {
                  return setting.title === "Logout" ? (
                    <button
                      key={setting.title}
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
                      key={setting.title}
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
          </>
        ) : (
          <>
            <p className=' text-[#00C2C2] text-[16px] font-semibold'>
              Personal Information
            </p>
            <ProfileSection userData={userData}>
              <UploadSingle
                defaultPhoto={userPhoto.photo}
                updatePhotoFunction={setUserPhoto}
              />
            </ProfileSection>
            <div className='mt-10'>
              <Divider orientation='horizontal' variant={"dashed"} />
            </div>
            <p className=' text-[#00C2C2] text-[16px] font-semibold mt-10'>
              Professional Details
            </p>
            <div className='flex justify-between items-center mt-10'>
              <div>
                <div>
                  <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                    Specialty
                  </p>
                  <p className='text-[16px] text-[#073131] font-normal mt-2'>
                    {toTitleCase(userData.specialization)}
                  </p>
                  <FullModal
                    label='Change Specialty'
                    title='Change Specialty'
                    cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                    <div className='flex justify-center items-center'>
                      <ChangeUserForm
                        fieldName='specialization'
                        label='Change Specialty'
                        apiUrl='update_user'
                      />
                    </div>
                  </FullModal>
                </div>
                <div className='mt-5'>
                  <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                    Board certifications
                  </p>
                  <p className='text-[16px] text-[#073131] font-normal mt-2'>
                    {userData?.email || "jane.doe@example.com"}
                  </p>
                  <FullModal
                    label='Change Email'
                    title='Change Email'
                    cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                    <div className='flex justify-center items-center'>
                      <ChangeUserForm
                        fieldName='email'
                        label='Change Email'
                        apiUrl='update_user'
                      />
                    </div>
                  </FullModal>
                </div>
                <div className='mt-5'>
                  <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                    Gender
                  </p>
                  <p className='text-[16px] text-[#073131] font-normal mt-2'>
                    {toTitleCase(userData?.gender || "male")}
                  </p>
                  <FullModal
                    label='Change Gender'
                    title='Change Gender'
                    cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                    <div className='flex justify-center items-center'>
                      <ChangeUserForm
                        fieldName='gender'
                        label='Change Gender'
                        apiUrl='update_user'
                        formType='select'
                        options={["male", "female"]}
                      />
                    </div>
                  </FullModal>
                </div>
              </div>
              <div>
                <div>
                  <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                    Phone Number
                  </p>
                  <p className='text-[16px] text-[#073131] font-normal mt-2'>
                    {userData?.phone || "07012345678"}
                  </p>
                  <FullModal
                    label='Change Phone Number'
                    title='Change Phone Number'
                    cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                    <div className='flex justify-center items-center'>
                      <ChangeUserForm
                        fieldName='phone'
                        label='Change Phone Number'
                        apiUrl='update_user'
                      />
                    </div>
                  </FullModal>
                </div>
                <div className='mt-5'>
                  <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                    Date of Birth
                  </p>
                  <p className='text-[16px] text-[#073131] font-normal mt-2'>
                    {userData.dob || "10/05/1943"}
                  </p>
                  <FullModal
                    label='Change Date of Birth'
                    title='Change Date of Birth'
                    cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                    <div className='flex justify-center items-center'>
                      <ChangeUserForm
                        fieldName='dob'
                        label='Change Date of Birth'
                        apiUrl='update_user'
                      />
                    </div>
                  </FullModal>
                </div>
                <div className='mt-5'>
                  <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                    Password
                  </p>
                  <div>
                    <FullModal
                      label='Change Password'
                      title='Change Password'
                      cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                      <div className='flex justify-center items-center'>
                        <ChangeUserForm
                          fieldName='password'
                          label='Change Password'
                          apiUrl='update_user'
                        />
                      </div>
                    </FullModal>
                  </div>
                  {/* <FullModal
                  label='Enable two-factor authentication'
                  title='Enable two-factor authentication'
                  cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                  <div className='flex justify-center items-center'>
                    <ChangeUserForm
                      fieldName='2fa'
                      label='Enable two-factor authentication'
                      apiUrl='update_user'
                    />
                  </div>
                </FullModal> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {NotifierComponent}
    </>
  );
};

export default DoctorSettings;
