import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosTrash,IoIosClipboard } from "react-icons/io";
import {DeleteOrder,ListOrders} from '../../Actions/OrderActions'

import './styles.css'
function OrderScreen(props) {
  const StateInitial = useSelector((state) => state.OrderList);
  const {orders,loading:LoadingGetAllOrders,error:ErrorGetAllOrders,success} = StateInitial;

  const DeleteOrderState = useSelector((state) => state.OrderDelete);
  const {order,loading:LoadingDeleteOrder,error:ErrorDeleteOrder,success:SuccessDeleteOrder} = DeleteOrderState ;

  console.log("Tela: OrderScreen= ",orders, LoadingDeleteOrder, SuccessDeleteOrder, ErrorDeleteOrder)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ListOrders())
  }, [SuccessDeleteOrder]);
  
  function DeleteHandle(orderID) {
    if (window.confirm(`Tem certeza que deseja deletar o produto ${orderID}?`)) {
        dispatch(DeleteOrder(orderID))
      }
  }

  return (
    <div className="table-container">
        <table className="Orders-Table">
          <thead>
            <tr className="Container-header-product-edit">
              <th>ID</th>
              <th>USUÁRIO</th>
              <th>DATA</th>
              <th>PAGO</th>
              <th>ENTREGUE</th>

              <th>TOTAL</th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {LoadingGetAllOrders ? (
              <div>Carregando</div>
            ) : ErrorGetAllOrders ? (
              <div>Provavelmente esse recurso é exclusivo para ADM {ErrorGetAllOrders}</div>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="Container-product-edit">
                  <td>{order._id}</td>
                  <td>{order.userId.name}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.isPaid?"Sim":"Não"}</td>
                  <td>{order.isDelivered?"Sim":"Não"}</td>

                  <td >
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.totalPrice)}
                  </td>
                  <td className="Container-buttons-td">
                    <Link to={`/orderDetail/${order._id}`} className="link-detail">
                        <span>Detalhes</span>
                        <IoIosClipboard size={25} />
                    </Link>
                    {"  "}
                    <button type="button"  className="buttonF delete" onClick={()=>DeleteHandle(order._id)}>
                        <span>Deletar</span>
                        <IoIosTrash size={25} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
  );
}

export default OrderScreen;
