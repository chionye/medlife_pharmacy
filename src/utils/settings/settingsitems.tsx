/** @format */

import star_outline from "@/assets/star_outline.svg";
import headphones from "@/assets/headphones.svg";
import logout from "@/assets/logout.svg";

export const SettingsItems = {
  patient: [
    {
      title: "Rate Physician’s Performance",
      link: "/dashboard/settings/rate-physicians-performance",
      icon: star_outline,
      chevron: true,
    },
    {
      title: "Support Center",
      link: "/dashboard/settings/support-center",
      icon: headphones,
      chevron: true,
    },
    {
      title: "Logout",
      link: "",
      icon: logout,
      chevron: false,
    },
  ],
  doctor: [
    {
      title: "Rate Patient's Performance",
      link: "/doctor/settings/rate-patients-performance",
      icon: star_outline,
      chevron: true,
    },
    {
      title: "Support Center",
      link: "/dashboard/settings/support-center",
      icon: headphones,
      chevron: true,
    },
    {
      title: "Logout",
      link: "",
      icon: logout,
      chevron: false,
    },
  ],
};
