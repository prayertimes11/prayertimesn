"use client";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getAzanTimes } from "../api";
import moment from "moment";

type prayerType = {
  name: string;
  begins: string;
  iqamah: string;
};

const Adhans: React.FC<{ date: Date }> = ({ date }) => {
  const sharedOnCell = () => {
    return {};
  };

  const address = "Richardson Dallas Texas ,USA";
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [prayerData, setPrayerData] = useState<prayerType[]>([]);

  const getPrayerTimes = async () => {
    const azanTimes = await getAzanTimes(address);
    setPrayerTimes(azanTimes.data.timings);
  };

  useEffect(() => {
    getPrayerTimes();

    const intervalId = setInterval(() => {
      console.log("saat kontrolü 12 mi diye");
      if (date.getHours() === 0 && date.getMinutes() === 0) {
        getPrayerTimes();
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const columns = [
    {
      title: "Prayer",
      dataIndex: "name",
      onCell: sharedOnCell,
    },
    {
      title: "Begins",
      dataIndex: "begins",
      onCell: (_: any, index: number) => {
        if (index === 1) {
          return { colSpan: 2 };
        }
        if (index === 6) {
          return { colSpan: 2 };
        }

        return {};
      },
    },
    {
      title: "Iqamah",
      dataIndex: "iqamah",
      onCell: sharedOnCell,
    },
  ];

  useEffect(() => {
    if (prayerTimes !== null) {
      setPrayerData([
        {
          name: "Fajr",
          begins: moment(prayerTimes.Fajr, ["HH:mm"]).format("hh:mm A"),
          iqamah: "06:30 AM",
        },
        {
          name: "Sunrise",
          begins: moment(prayerTimes.Sunrise, ["HH:mm"]).format("hh:mm A"),
          iqamah: "",
        },
        // { name: "Sunrise", begins: prayerTimes.Sunrise, iqamah: "14:00" },
        {
          name: "Dhuhr",
          begins: moment(prayerTimes.Dhuhr, ["HH:mm"]).format("hh:mm A"),
          iqamah: "02:00 PM",
        },
        {
          name: "Asr",
          begins: moment(prayerTimes.Asr, ["HH:mm"]).format("hh:mm A"),
          iqamah: "04:00 PM",
        },
        {
          name: "Maghrib",
          begins: moment(prayerTimes.Maghrib, ["HH:mm"]).format("hh:mm A"),
          iqamah: "05:45 PM",
        },
        {
          name: "Isha",
          begins: moment(prayerTimes.Isha, ["HH:mm"]).format("hh:mm A"),
          iqamah: "08:00 PM",
        },
        {
          name: "Jumuah",
          begins: "02:00 PM",
          iqamah: "",
        },
      ]);
    }
  }, [prayerTimes]);

  return (
    <div className="adhans">
      {prayerData.length > 0 ? (
        <Table
          dataSource={prayerData}
          pagination={false}
          columns={columns as any}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Adhans;
