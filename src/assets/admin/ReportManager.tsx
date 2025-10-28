import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type FilterType = "day" | "week" | "month" | "year" | "range";

interface ChartData {
  category: string;
  quantity: number;
  revenue: number;
}

interface ReportItem {
  product_id: number;
  name: string;
  quantity: number;
  revenue: number;
  category: string;
}

const ReportManager: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("day");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [bestSeller, setBestSeller] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [reportData, setReportData] = useState<ReportItem[]>([]);

  const fetchReport = useCallback(async () => {
    if (!startDate || (filter === "range" && !endDate)) return;

    try {
      const params: any = { filter };
      if (startDate) params.startDate = format(startDate, "yyyy-MM-dd");
      if (filter === "range" && endDate)
        params.endDate = format(endDate, "yyyy-MM-dd");

      const res = await axios.get("http://localhost:3000/api/reports", {
        params,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setTotalRevenue(res.data.totalRevenue);
      setTotalOrders(res.data.totalOrders);
      setBestSeller(res.data.bestSeller);
      setChartData(res.data.chartData);
      setReportData(res.data.reportData);
    } catch (err) {
      console.error("Error fetching report:", err);
      alert("Lấy báo cáo thất bại!");
    }
  }, [filter, startDate, endDate]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const chart = {
    labels: chartData.map((c) => c.category),
    datasets: [
      {
        label: "Số lượng",
        data: chartData.map((c) => c.quantity),
        backgroundColor: "rgba(255, 182, 193, 0.7)", // pastel pink
      },
      {
        label: "Doanh thu",
        data: chartData.map((c) => c.revenue),
        backgroundColor: "rgba(255, 105, 180, 0.6)", // hot pink
      },
    ],
  };

  return (
    <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-xl max-w-7xl mx-auto space-y-8 border border-pink-200">
      <h2 className="text-3xl font-bold text-pink-700 text-center">
        💖 Báo cáo bán hàng
      </h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
          className="border border-pink-300 p-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
          <option value="range">Khoảng thời gian</option>
        </select>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border border-pink-300 p-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        />
        {filter === "range" && (
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-pink-300 p-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
          />
        )}

        <button
          onClick={fetchReport}
          disabled={!startDate || (filter === "range" && !endDate)}
          className={`px-5 py-2 rounded-lg text-white font-semibold transition ${
            !startDate || (filter === "range" && !endDate)
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 shadow-md"
          }`}
        >
          Lấy báo cáo
        </button>
      </div>

      {/* Tổng quan */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-pink-200 border border-pink-100">
          <h3 className="text-pink-600 font-semibold">Tổng doanh thu</h3>
          <p className="text-2xl font-bold text-pink-700 mt-2">
            {totalRevenue.toLocaleString()} ₫
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-pink-200 border border-pink-100">
          <h3 className="text-pink-600 font-semibold">Tổng số đơn</h3>
          <p className="text-2xl font-bold text-pink-700 mt-2">{totalOrders}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-pink-200 border border-pink-100">
          <h3 className="text-pink-600 font-semibold">Sản phẩm bán chạy</h3>
          <p className="text-xl font-bold text-pink-700 mt-2">{bestSeller}</p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="p-6 bg-white rounded-xl border border-pink-100 shadow-inner">
        <Bar
          data={chart}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" as const },
              title: {
                display: true,
                text: "Thống kê doanh thu & số lượng",
                color: "#d63384",
              },
            },
          }}
        />
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto bg-white rounded-xl border border-pink-100 shadow-md">
        <table className="min-w-full border-collapse text-center">
          <thead className="bg-pink-200 text-pink-900">
            <tr>
              <th className="border border-pink-300 px-4 py-2">Tên sản phẩm</th>
              <th className="border border-pink-300 px-4 py-2">Danh mục</th>
              <th className="border border-pink-300 px-4 py-2">Số lượng</th>
              <th className="border border-pink-300 px-4 py-2">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-gray-500 py-4">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              reportData.map((item) => (
                <tr
                  key={item.product_id}
                  className="hover:bg-pink-50 transition"
                >
                  <td className="border border-pink-100 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-pink-100 px-4 py-2">
                    {item.category}
                  </td>
                  <td className="border border-pink-100 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-pink-100 px-4 py-2 text-pink-700 font-semibold">
                    {item.revenue.toLocaleString()} ₫
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Nút in */}
      <div className="text-center">
        <button
          onClick={() => window.print()}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg mt-4 shadow-md transition"
        >
          🖨️ In báo cáo
        </button>
      </div>
    </div>
  );
};

export default ReportManager;
