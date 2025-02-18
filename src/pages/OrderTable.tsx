import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableHeader from "../components/TableHeader";
import { WarehousesType } from "../interface";
import { fetchOrders } from "../api/order";

const OrderTable = () => {
  const [orderList, setOrder] = useState<WarehousesType[]>([]);

  const fetchData = async () => {
    const warehouses = await fetchOrders();
    setOrder(warehouses);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TableHeader>
        <h3>訂單管理</h3>
      </TableHeader>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>顧客</TableCell>
              <TableCell>訂單日期</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>總金額</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.capacity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderTable;
