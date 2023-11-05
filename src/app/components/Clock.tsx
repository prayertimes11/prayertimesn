"use client";
import { useEffect, useState } from "react";
import { Number } from "./Number";
import { Word } from "./Word";
import "../styles/clock.css";
import { getTime } from "../api";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const Clock = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [race, setRace] = useState(0);

  const getTimeAndSetDate = async () => {
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

    if (race === 0) {
      const timer = setInterval(() => {
        setDate((prevDate) => new Date(prevDate.getTime() + 60000));
      }, 60000);
      setRace(1);
    }
  };

  useEffect(() => {
    getTimeAndSetDate();
  }, []);

  const pm = date.getHours() >= 12;

  return (
    <div className="clock">
      <div className="calendar">
        {days.map((value, index) => (
          <Word key={value} value={value} hidden={index != date.getDay()} />
        ))}
      </div>
      <div className="row">
        <div className="hour">
          <Number value={date.getHours() % 12 || 12} />
          <Word value={":"} />
          <Number value={date.getMinutes()} />
        </div>
        <div className="ampm">
          <Word value={"AM"} hidden={pm} />
          <Word value={"PM"} hidden={!pm} />
        </div>
      </div>
    </div>
  );
};
