"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Number } from "./Number";
import { Word } from "./Word";
import "../styles/clock.css";
import { getTime } from "../api";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const Clock: React.FC<{
  date: Date;
}> = ({ date }) => {
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
