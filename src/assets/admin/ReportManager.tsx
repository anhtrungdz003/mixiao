// Trang báo cáo thống kê doanh thu, sản phẩm bán chạy, v.v.

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";

interface ReportData {
  month: string;
  revenue: number;
  totalOrders: number;
  bestSelling: string;
}

const ReportManager: React.FC = () => {
  const [reports] = useState<ReportData[]>([
    {
      month: "Tháng 8/2025",
      revenue: 120_000_000,
      totalOrders: 320,
      bestSelling: "Trà sữa Mixiao",
    },
    {
      month: "Tháng 9/2025",
      revenue: 150_000_000,
      totalOrders: 400,
      bestSelling: "Bánh mochi",
    },
    {
      month: "Tháng 10/2025",
      revenue: 95_000_000,
      totalOrders: 280,
      bestSelling: "Trà sữa Mixiao",
    },
  ]);

  // --- Hàm format số thành VNĐ ---
  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-pink-100">
      <h2 className="text-2xl font-semibold text-pink-500 mb-4">
        Báo cáo bán hàng
      </h2>
      <p className="text-gray-600 mb-6">
        Trang này cung cấp thống kê doanh thu, số lượng đơn hàng và sản phẩm bán
        chạy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu tháng này</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 font-semibold text-xl">
              {formatCurrency(reports[reports.length - 1].revenue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tổng đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-pink-600 font-semibold text-xl">
              {reports[reports.length - 1].totalOrders}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-600 font-semibold text-xl">
              {reports[reports.length - 1].bestSelling}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Báo cáo chi tiết theo tháng</TableCaption>
          <TableHeader>
            <TableRow className="bg-pink-50">
              <TableHead>Tháng</TableHead>
              <TableHead>Doanh thu</TableHead>
              <TableHead>Tổng đơn hàng</TableHead>
              <TableHead>Sản phẩm bán chạy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.month} className="hover:bg-pink-50">
                <TableCell>{report.month}</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  {formatCurrency(report.revenue)}
                </TableCell>
                <TableCell className="text-pink-600 font-semibold">
                  {report.totalOrders}
                </TableCell>
                <TableCell className="text-yellow-600 font-semibold">
                  {report.bestSelling}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportManager;
