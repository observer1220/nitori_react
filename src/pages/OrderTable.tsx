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
import { OrderType } from "../interface";
import { fetchOrders } from "../api/order";
import { OrderStatus } from "../enum/enums";
import { formatDate, formatNumber } from "../utils/formator";

const OrderTable = () => {
  const [orderList, setOrder] = useState<OrderType[]>([]);

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
              <TableCell>訂單金額</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customer_id}</TableCell>
                <TableCell>{formatDate(item.order_date)}</TableCell>
                <TableCell>
                  {OrderStatus[item.status as keyof typeof OrderStatus]}
                </TableCell>
                <TableCell>${formatNumber(Number(item.total_price))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderTable;
