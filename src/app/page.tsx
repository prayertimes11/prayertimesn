"use client";
import { Clock } from "./components/Clock";
import Adhans from "./components/Adhans";
import "./App.css";
import { getTime } from "./api";
import { useEffect, useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  const getDate = async () => {
    const res = await getTime();

    const parseXml = function (xmlStr: any) {
      return new window.DOMParser().parseFromString(xmlStr, "text/xml");
    };

    const formattedDate =
      parseXml(res).getElementsByTagName("formatted")[0].childNodes[0]
        .nodeValue;

    var dateStr = formattedDate as string;
    var parts = dateStr.split(" ");
    var dateParts = parts[0].split("-");
    var timeParts = parts[1].split(":");

    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1;
    var day = parseInt(dateParts[2]);
    var hour = parseInt(timeParts[0]);
    var minute = parseInt(timeParts[1]);
    var second = parseInt(timeParts[2]);

    var date = new Date(year, month, day, hour, minute, second);

    setDate(date);

    setInterval(() => {
      setDate((prevDate) => new Date(prevDate.getTime() + 60000));
    }, 60000);
  };

  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    console.log("date -> ", date);
  }, [date]);

  return (
    <main>
      <Clock date={date} />
      <Adhans date={date} />
    </main>
  );
}
