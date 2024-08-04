import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function App() {
  const [freq, setFreq] = useState([]);
  const [yAxis, setYAxis] = useState([]);

  const fetchNumbers = async () => {
    const url =
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";
    const res = await fetch(url);
    let data = await res.text();
    data = data.split("\n").filter(Boolean);
    const map = {};
    data.forEach((item) => {
      if (map[item]) {
        map[item] += 1;
      } else {
        map[item] = 1;
      }
    });
    const chartData = Object.keys(map).map((key) => ({
      key,
      value: map[key],
    }));
    setFreq(chartData);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNumbers();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (freq.length > 0) {
      const max = Math.max(...freq.map((item) => item.value));
      const maxVal = Math.ceil(max / 10) * 10;
      const arr = [];
      for (let i = maxVal / 10; i >= 0; i--) {
        arr.push(i * 10);
      }
      setYAxis(arr);
    }
  }, [freq]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className=" text-3xl">Area Chart</p>
        <AreaChart
          width={730}
          height={250}
          data={freq}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="key" />
          <YAxis ticks={yAxis} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
        <BarChart width={730} height={250} data={freq}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis ticks={yAxis} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />  
        </BarChart>
      </div>
    </>
  );
}

export default App;
