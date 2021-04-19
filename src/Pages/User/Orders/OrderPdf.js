import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import { finalPrice } from "../../../actions/products";
import{TAX} from '../../../config'
  
const OrderPdf =({order})=>(
  
 
  


<Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>Abu Liel SHOP</Text>
      <Text style={styles.subtitle}>Order Summary</Text>
      <Table>
        <TableHeader>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Variets</TableCell>
   
        </TableHeader>
        </Table>
        <Table data={order.Items}>
        <TableBody>
          <DataTableCell getContent={(p) => p.product[0].Title} />
          <DataTableCell getContent={(p) => finalPrice(p)} />
          <DataTableCell getContent={(p) => p.amount} />
          <DataTableCell getContent={(p) => p.selectedVari.map(s=>{
              return  <TableCell>{`${s.item.title} : ${s.item.value}`}</TableCell>
          })} />
            
       
        </TableBody>
      
      </Table>
      <Text style={styles.text}>
      <Text>
          Order Id:{order.OrderID}
    </Text>
    {"\n"}
    
    <Text>
          Order Date: {"  "}
          {order.Date.replace('T'," ").replace(".000Z","")}
    </Text>
    {"\n"}
    <Text>
          Order Status: {"  "}
          {order.Status}
    </Text>
    {"\n"}
    <Text>
        Total Before Tax : 
        {order.Total-(order.Total*TAX)}
    </Text>
    {"\n"}
    <Text>
        TAX (${TAX}): 
        {(order.Total*TAX).toFixed(2)}
    </Text>
    {"\n"}
    <Text>
        Total Paid: 
        {order.Total}
    </Text>
        </Text>
        <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
    </Page>
  </Document>
)
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    }); 

export default OrderPdf;