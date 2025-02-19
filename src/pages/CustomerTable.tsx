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
import { CustomerType } from "../interface";
import { fetchCustomers } from "../api/customer";

const CustomerTable = () => {
  const [orderList, setOrder] = useState<CustomerType[]>([]);

  const fetchData = async () => {
    const warehouses = await fetchCustomers();
    setOrder(warehouses);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TableHeader>
        <h3>顧客管理</h3>
      </TableHeader>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>顧客姓名</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>電話</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomerTable;
