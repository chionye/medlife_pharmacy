/** @format */

import { format } from "date-fns";
import moment from "moment";

export const filterAndSortGraphData = (data: any) => {
  if (!data) {
    return "";
  }
  console.log(data);
  return data
    .map((transaction: any) => ({
      date: new Date(transaction.createdAt),
      amount: transaction.amount,
    }))
    .sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
    .map((transaction: any, index: 0) => {
      if (index == 0 || data.length - 1 == index) {
        console.log(transaction);
        return {
          date: format(transaction.date, "MMM d yyyy"),
          amount: transaction.amount,
        };
      }
      if (index > 0 && index < data.length) {
        return {
          amount: transaction.amount,
        };
      }
    });
};

export const getDateFormat = (
  dateString: string = "",
  divided: string | null = null
): string => {
  return !divided
    ? dateString
      ? moment(dateString).format("Do MMMM YYYY • hh:mm a")
      : moment().format("Do MMMM YYYY • hh:mm a")
    : dateString && divided === "date"
    ? moment(dateString).format("Do MMMM YYYY ")
    : dateString && divided === "time"
    ? moment(dateString).format("hh:mm a")
    : moment().format("Do MMMM YYYY • hh:mm a");
};

export const getNestedValue = (obj: any, keyPath: string) => {
  return keyPath.split(".").reduce((value, key) => value && value[key], obj);
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const formatAmount = (amount: number) => {
  if (amount == null || isNaN(amount)) {
    return "0.00";
  }

  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const encodeIfURL = (str: string): string => {
  try {
    const url = new URL(str);
    console.log(url);
    return encodeURI(str);
  } catch (error) {
    return str;
  }
};

export const toTitleCase = (str: string): string => {
  return str.replace(/(^[a-z])|(\s+[a-z])/g, (txt) => txt.toUpperCase());
};
