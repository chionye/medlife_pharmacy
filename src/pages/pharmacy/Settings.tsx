/** @format */
import { useEffect, useMemo, useState } from "react";
// import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import { Icons } from "@/constants/svgs";
import checker from "@/assets/profile.png";
import TitleBar from "@/components/title_bar";
import { UploadSingle } from "@/components/upload";
import { FormPassInput } from "@/components/form_input";
import { formConfig3 } from "@/utils/forms/onboarding";
import { Button } from "@/components/ui/button";
import { Divider } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";

function PharmacySettings() {
//   const user = getCookie("@user");
//   const userData = user ? JSON.parse(user) : null;
  const [orders, setOrders] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    firstname: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  });
  const [currentTab, setCurrentTab] = useState<string>("My Profile");
  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: checker,
  });
  // const role = getConfigByRole();
  const initialSwitches = [
    {
      label: "Dashboard",
      id: "dashboard",
      checked: true,
    },
    {
      label: "Product Management",
      id: "product_management",
      checked: true,
    },
    {
      label: "Order Management",
      id: "order_management",
      checked: true,
    },
    {
      label: "Inventory Management",
      id: "inventory_management",
      checked: true,
    },
    {
      label: "Sales Insight & Analytics",
      id: "analytics",
      checked: true,
    },
    {
      label: "Settings",
      id: "settings",
      checked: true,
    },
  ];
  const [settingsSwitches, setSettingsSwitches] = useState(initialSwitches);

  const handleSwitchChange = (id: string) => {
    setSettingsSwitches((prevSwitches) =>
      prevSwitches.map((switchItem) =>
        switchItem.id === id
          ? { ...switchItem, checked: !switchItem.checked }
          : switchItem
      )
    );
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

//   const handleDateChange = (text: string) => {
//     setFormData({
//       ...formData,
//       date: text,
//     });
//   };

  const tabs = [
    {
      label: "My Profile",
      icon: <Icons.user color='#333333' />,
      activeIcon: <Icons.user color='white' />,
    },
    {
      label: "Manage Access",
      icon: <Icons.settings />,
      activeIcon: <Icons.settings color='white' />,
    },
    {
      label: "Logout",
      icon: <Icons.logoutDoor />,
      activeIcon: <Icons.logoutDoor color='white' />,
      color: "#E70000",
    },
  ];

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "pharmacyOrders",
        url: "pharmacy/orders",
        method: "get",
        payload: null,
      },
    ],
    []
  );

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setOrders(queries[0].data.data);
      console.log(queries[0].data.data, orders);
    }
  }, [queries, orders]);

  return (
    <div className='flex lg:flex-row flex-col justify-between items-start gap-5'>
      <div className='bg-[#5F66E90A] border border-[#5F66E9] px-[20px] py-[35px] rounded-[10px] space-y-2'>
        {tabs.map((tab: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentTab(tab.label)}
            className={`flex justify-start items-center pl-5 gap-3 w-[279px] border border-[#5F66E9] rounded-[8px] h-[52px] hover:bg-[#5F66E9] hover:text-white ${
              currentTab === tab.label
                ? "bg-[#5F66E9] text-white"
                : "text-[#333333]"
            }`}>
            {currentTab === tab.label ? tab.activeIcon : tab.icon}{" "}
            <span className={`${tab.color && `text-[${tab.color}]`}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      {currentTab === "My Profile" ? (
        <div className='bg-[#5F66E90A] w-full border border-[#5F66E9] px-[20px] py-[35px] rounded-[10px] space-y-2'>
          <TitleBar title={"Personal Information"} />
          <div className='flex items-center gap-3'>
            <UploadSingle
              defaultPhoto={userPhoto.photo}
              updatePhotoFunction={setUserPhoto}
            />
            <div>
              <p className='text-[19.81px] font-medium'>Ezeugo Ikenga</p>
              <p className='text-[12.68px] font-light'>Manager</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-x-2 items-center'>
            {formConfig3.map((config: any, index: number) =>
              config.type === "text" || config.type === "email" ? (
                <div key={index} className='w-full mt-5'>
                  <FormPassInput
                    type={config.type}
                    name={config.name}
                    label={config.label}
                    placeholder={config.placeholder}
                    cn={
                      "border border-[#DEE0E8] bg-[#5F66E90A] px-[16px] hover:outline-none w-full py-[13px]  rounded-[7.92px]"
                    }
                    cn1=' border border-[#5F66E966] px-3 bg-[#5F66E90A] rounded-[7.92px]'
                    changeFunction={handleFormChange}
                  />
                </div>
              ) : (
                <div className='lg:w-[49%] w-full mt-5'>
                  <FormPassInput
                    type={config.type}
                    name={config.name}
                    label={config.label}
                    placeholder={config.placeholder}
                    cn={
                      "border-none px-[16px] hover:outline-none w-full py-[13px]"
                    }
                    cn1=' border border-[#5F66E966] px-3 bg-[#5F66E90A] rounded-[7.92px]'
                    rightIcon={<Icons.eyeClosed />}
                    changeFunction={handleFormChange}
                  />
                </div>
              )
            )}
          </div>
          <div className='flex justify-end w-full'>
            <div className='lg:w-[40%] mt-5  w-full flex items-center'>
              <Button className='underline shadow-none bg-transparent text-[#333333] text-[12.68px] hover:bg-transparent'>
                Discard Changes
              </Button>
              <Button className='bg-[#5F66E9] py-[15.85px] px-5 rounded-[7.92px] hover:bg-[#5F66E977]'>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      ) : currentTab === "Manage Access" ? (
        <div>
          <div className='bg-[#008B4D0A] border border-[#008B4D66] lg:p-10 p-5 rounded-[8.51px]'>
            <div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start gap-5'>
                  <div>
                    <p className='text-[21.27px] font-medium'>EZEUGO IKENGA</p>
                    <p className='text-[13.61px] font-light'>
                      fedrickagu@gmail.com
                    </p>
                  </div>
                  <span className='bg-[#008B4DB0] px-[12.76px] py-[5.96px] rounded-[4.25px] text-white text-[13.61px] font-light'>
                    Admin
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Button className='flex bg-transparent hover:bg-transparent shadow-none items-center text-[#008080] font-normal text-[13.42px] gap-3 px-0'>
                    <Icons.pencil />
                  </Button>
                  <Button className='flex bg-transparent hover:bg-transparent shadow-none items-center text-[#008080] font-normal text-[13.42px] gap-3 px-0'>
                    <Icons.trash />
                  </Button>
                </div>
              </div>
              <div className='my-5'>
                <div className='flex flex-wrap justify-between items-end gap-2'>
                  {initialSwitches.map((settingsSwitch: any, index: number) => (
                    <div
                      className='flex flex-col items-center lg:w-[15%]'
                      key={index}>
                      <p className='text-[13.61px] text-center font-medium text-[#333333]'>
                        {settingsSwitch.label}
                      </p>
                      <Switch
                        id={settingsSwitch.id}
                        checked={settingsSwitches[index].checked}
                        onChange={() => handleSwitchChange(settingsSwitch.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
            </div>
          </div>
          <div className='bg-[#5F66E90A] w-full border border-[#5F66E9] px-[20px] py-[35px] rounded-[10px] space-y-2 mt-5'>
            <div className='flex flex-wrap gap-x-2 items-center'>
              {formConfig3.map((config: any, index: number) =>
                config.type === "text" || config.type === "email" ? (
                  <div key={index} className='w-full mt-5'>
                    <FormPassInput
                      type={config.type}
                      name={config.name}
                      label={config.label}
                      placeholder={config.placeholder}
                      cn={
                        "border border-[#DEE0E8] bg-[#5F66E90A] px-[16px] hover:outline-none w-full py-[13px]  rounded-[7.92px]"
                      }
                      cn1=' border border-[#5F66E966] px-3 bg-[#5F66E90A] rounded-[7.92px]'
                      changeFunction={handleFormChange}
                    />
                  </div>
                ) : (
                  <div className='lg:w-[49%] w-full mt-5'>
                    <FormPassInput
                      type={config.type}
                      name={config.name}
                      label={config.label}
                      placeholder={config.placeholder}
                      cn={
                        "border-none px-[16px] hover:outline-none w-full py-[13px]"
                      }
                      cn1=' border border-[#5F66E966] px-3 bg-[#5F66E90A] rounded-[7.92px]'
                      rightIcon={<Icons.eyeClosed />}
                      changeFunction={handleFormChange}
                    />
                  </div>
                )
              )}
            </div>
            <div className='flex justify-end w-full'>
              <div className='mt-5 w-full flex items-center'>
                <Button className='bg-[#5F66E9] py-5 px-5 rounded-[7.92px] hover:bg-[#5F66E977] w-full'>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PharmacySettings;
