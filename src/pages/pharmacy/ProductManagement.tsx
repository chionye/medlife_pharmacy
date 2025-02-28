/** @format */
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import {
  QueryProps,
  ShopPropType,
} from "@/types";
import {
  TopFilterSection,
} from "@/components/section";
import { ColoredCard } from "@/components/custom_cards";
import { Icons } from "@/constants/svgs";
import { Button } from "@/components/ui/button";
import FullModal from "@/components/full_modal";
import bottle from "@/assets/bottle.png";
import { Card } from "@/components/ui/card";

function ProductManagement() {
  const user = JSON.parse(getCookie("@user") || "{}");
  const currentYear = new Date().getFullYear().toString();
  const [formData, setFormData] = useState<any>({ date: "" });
  // const role = getConfigByRole();
  const months = [
    { name: `January ${currentYear}` },
    { name: `February ${currentYear}` },
    { name: `March ${currentYear}` },
    { name: `April ${currentYear}` },
    { name: `May ${currentYear}` },
    { name: `June ${currentYear}` },
    { name: `July ${currentYear}` },
    { name: `August ${currentYear}` },
    { name: `September ${currentYear}` },
    { name: `October ${currentYear}` },
    { name: `November ${currentYear}` },
    { name: `December ${currentYear}` },
  ];

  const vitals: ShopPropType[] = useMemo(
    () => [
      {
        title: "Total Product Upload",
        value: "100",
        iconColor: "#5F66E9",
        bgColor: "#5F66E933",
        textColor: "#5F66E9",
        link: "/pharmacy/total-revenue",
      },
      {
        title: "Top Selling product",
        value: "Omega 3 Oil",
        iconColor: "#FF9533",
        bgColor: "#FF953333",
        textColor: "#FF9533",
        link: "/pharmacy/home",
      },
      {
        title: "Top-selling products",
        value: "13",
        iconColor: "#008B4D",
        bgColor: "#008B4D33",
        textColor: "#008B4D",
        link: "/pharmacy/home",
      },
      {
        title: "Product Expiring Soon",
        value: "9",
        iconColor: "#FF333F",
        bgColor: "#FF333F33",
        textColor: "#FF333F",
        link: "/pharmacy/home",
      },
      {
        title: "Pending Orders",
        value: "9",
        iconColor: "#EF33FF",
        bgColor: "#EF33FF33",
        textColor: "#EF33FF",
        link: "/pharmacy/home",
      },
    ],
    []
  );

  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setFormData({
  //     ...formData,
  //     [target.name]: target.value,
  //   });
  // };

  const handleDateChange = (text: string) => {
    setFormData({
      ...formData,
      date: text,
    });
  };

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "doctors",
        url: "doctors",
        method: "post",
        payload: { user_id: user?.id },
      },
      {
        id: "medications",
        url: "medications/list",
        method: "post",
        payload: { user_id: user?.id },
      },
      {
        id: "appointments",
        url: "appointment/list",
        method: "post",
        payload: { user_id: user?.id },
      },
    ],
    [user?.id]
  );

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
  }, [queries]);

  return (
    <>
      <TopFilterSection months={months} changeFunc={handleDateChange} />

      <div className='flex lg:gap-5 gap-3 items-center w-full my-5'>
        <FullModal
          icon={<Icons.plus />}
          title={"Upload New Product"}
          btnTitle='Upload Product to the Shopping Website'
          cn={
            "bg-[#5F66E9] w-full text-sm text-white hover:no-underline rounded-[4px] flex items-center justify-center px-8 py-3"
          }>
          <div className='flex justify-center items-center'></div>
        </FullModal>
      </div>

      <div className='mt-5'>
        <div className='flex flex-col space-y-6 mt-5'>
          <div className='grid lg:grid-flow-col gap-2'>
            {vitals.map((vital, index) => (
              <ColoredCard
                index={index}
                title={vital.title}
                value={vital.value}
                iconColor={vital.iconColor}
                bgColor={vital.bgColor}
                textColor={vital.textColor}
                link={vital.link}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row sm:gap-5 lg:gap-20 mt-5'>
        <Card className='lg:w-1/4 rounded-[14.8px]'>
          <div className='rounded-[14.8px] bg-[#EEEEF0] h-[242.1px] flex flex-col justify-center items-center'>
            <img src={bottle} alt='' className='w-[159px]' />
          </div>
          <div className='p-3'>
            <p className='text-[#090F47] font-normal text-[16.77]'>
              Accu-check ActiveTest Strip
            </p>
            <p className='text-[#090F47] font-semibold text-[26.84px] mt-2'>
              ₦4300
            </p>
            <div className='mt-2 flex justify-between items-center'>
              <Button className='flex bg-white hover:bg-white shadow-none items-center text-[#008080] font-normal text-[13.42px] gap-3 px-0'>
                <span>View Detail</span>
                <Icons.eyeOpen />
              </Button>
              <div className='flex items-center gap-2'>
                <Button className='flex bg-white hover:bg-white shadow-none items-center text-[#008080] font-normal text-[13.42px] gap-3 px-0'>
                  <Icons.pencil />
                </Button>
                <Button className='flex bg-white hover:bg-white shadow-none items-center text-[#008080] font-normal text-[13.42px] gap-3 px-0'>
                  <Icons.trash />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default ProductManagement;
