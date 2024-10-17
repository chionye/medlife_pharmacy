/** @format */

import { useEffect, useState } from "react";
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
import ConsultationForm from "@/components/consultation_form";
import { toTitleCase } from "@/services/helpers";
import { Divider } from "@chakra-ui/react";

const DoctorSettings = () => {
  const navigate = useNavigate();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [userPhoto, setUserPhoto] = useState({
    photo: userData.photo || checker,
  });
  const [tab, setTab] = useState(false);
  const { showNotifier, NotifierComponent } = useNotifier();

  const logout = () => {
    showNotifier({
      title: "Logging Out?",
      text: "Taking a break? Your session will time out after a while, but your account and info are always safe here at Medlife Link. See you soon!",
      status: "warning",
      button: true,
      confirmText: "Sure, Log Out",
      cancelText: "Cancel",
      confirmFunction: () => {
        if (LogoutUser()) {
          toast({ title: "Success", description: "You are logged out" });
          navigate("/");
        }
      },
    });
  };

  const role = getConfigByRole();
  const settings = role ? SettingsItems[role] : [];

  useEffect(() => {
    const user = getCookie("@user");
    if (user) {
      const userData = JSON.parse(user);
      setUserPhoto({
        ...userPhoto,
        photo:
          userData.photo.indexOf("http") !== -1
            ? userData.photo
            : userData.photo
            ? `https://api.medlifelink.life/images/profiles/${userData.photo}`
            : checker,
      });
    }
  }, []);

  return (
    <>
      <div className='flex justify-center items-center lg:px-10 px-5 mt-10'>
        <button
          className={`border-2 w-1/2 py-4 font-semibold lg:text-lg text-sm rounded-s-lg ${
            tab ? "bg-[#00C2C2E5] text-white" : "bg-[#F4F6FF] text-[#ADAFB5]"
          }`}
          onClick={() => setTab(true)}>
          Consultation Charges
        </button>
        <button
          className={`border-2 w-1/2 py-4 font-semibold lg:text-lg text-sm rounded-e-lg ${
            tab ? "bg-[#F4F6FF] text-[#ADAFB5]" : "bg-[#00C2C2E5] text-white"
          }`}
          onClick={() => setTab(false)}>
          Profile Settings
        </button>
      </div>

      <div className='lg:px-10 px-5 mt-10'>
        {tab ? (
          <ConsultationForm />
        ) : (
          <>
            <p className='text-[#00C2C2] text-[16px] font-semibold'>
              Personal Information
            </p>
            <ProfileSection>
              <UploadSingle
                defaultPhoto={userPhoto.photo}
                updatePhotoFunction={setUserPhoto}
              />
              <div className='flex justify-between items-center lg:w-4/5 w-full'>
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
                      "Email",
                      toTitleCase(userData.email),
                      "email",
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

            <Divider
              className='mt-10'
              orientation='horizontal'
              variant='dashed'
            />

            <p className='text-[#00C2C2] text-[16px] font-semibold mt-10'>
              Professional Details
            </p>
            <div className='flex justify-between items-start mt-10'>
              <div>
                {RenderUserInfo(
                  "Specialty",
                  toTitleCase(userData?.specialization),
                  "specialization",
                  "user/updateany"
                )}
                {RenderUserInfo(
                  "Board certifications",
                  userData?.certifications,
                  "certifications",
                  "user/updateany"
                )}
                {RenderUserInfo(
                  "Years of experience",
                  toTitleCase(userData?.years_of_experience),
                  "years_of_experience",
                  "user/updateany"
                )}
              </div>
              <div>
                {RenderUserInfo(
                  "Hospital/Clinic affiliation",
                  userData?.clinic_affiliation,
                  "clinic_affiliation",
                  "user/updateany"
                )}
                {RenderUserInfo(
                  "Language Spoken",
                  "Change Language Spoken",
                  "languages",
                  "user/updateany"
                )}
              </div>
            </div>
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

export default DoctorSettings;
