import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import getAllStaticPaths from "../../utils/getAllStaticPaths";
import getItemById from "../../utils/getItemById";
import Modal from "../../components/Modal";
import SizeChartForTops from "../../components/SizeChartForTops";
import SizeChartForBottoms from "../../components/SizeChartForBottoms";
import { getFormattedCurrency } from "../../utils/getFormattedCurrency";
import { cartActions } from "../../store/cartSlice";

const MainNav = styled.div`
  font-size: 14px;
  background-color: #f4f4f4;
  padding: 16px;
  text-align: center;
  a {
    text-decoration: none;
    color: inherit;
  }
  span {
    color: #999;
  }
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Div = styled.div`
  padding: 32px;
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    .image {
      width: 330px;
    }
    .info {
      margin: 16px;
      padding: 16px;
      .brand {
        font-size: 20px;
        font-weight: 500;
      }
      .name {
        color: #777;
        margin: 16px 0;
      }
      .amount {
        font-size: 20px;
        font-weight: 500;
      }
      .actions {
        margin-top: 32px;
        display: flex;
        button {
          font: inherit;
          font-weight: 500;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
          cursor: pointer;
          border: none;
          width: 145px;
          height: 48px;
        }
        .cart {
          background: #8e2de2;
          background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
          background: linear-gradient(to right, #8e2de2, #4a00e0);
          color: white;
          margin-left: 16px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          .loader {
            width: 18px;
            height: 18px;
            border: 2px solid #fff;
            border-bottom-color: transparent;
            border-radius: 50%;
            display: block;
            animation: ${rotation} 1s linear infinite;
          }
        }
        .wishlist {
          background-color: white;
          border: 1px #4a00e0 solid;
          color: #4a00e0;
        }
      }
    }
  }
  @media (max-width: 640px) {
    padding: 16px;
    .card {
      flex-direction: column;
      .image {
        width: 100%;
      }
      .info {
        width: 100%;
        padding: 0;
        margin-bottom: 0;
        .brand {
          font-size: 18px;
          font-weight: 500;
        }
        .name {
          color: #777;
          margin: 8px 0;
        }
        .amount {
          font-size: 18px;
          font-weight: 500;
        }
        .actions {
          margin-top: 24px;
          button {
            width: 100%;
          }
        }
      }
    }
  }
`;

const ModalDiv = styled.div`
  padding: 16px;
  .title {
    color: #4a00e0;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .table {
    overflow: auto;
    table {
      border-collapse: collapse;
      font-size: 14px;
      width: 474px;
      &.jeans {
        width: 356px;
      }
      th {
        font-weight: 500;
      }
      td,
      th {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        text-align: center;
        padding: 16px;
      }
      tr {
        th:first-child,
        td:first-child {
          border-left: 1px solid #ddd;
        }
        th:last-child,
        td:last-child {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
`;

const ItemDetails = ({ id, imageURL, brand, category, name, amount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const addToCartHandler = () => {
    if (user) {
      setIsLoading(true);

      const newItem = {
        itemId: id,
        itemQuantity: "1",
      };

      setTimeout(() => {
        dispatch(cartActions.addItem(newItem));
        setIsLoading(false);
      }, 600);
    } else {
      router.push("/signin");
    }
  };

  return (
    <>
      <MainNav>
        <Link href="/">Главная</Link>
        {" / "}
        <Link href="/collections">Collections</Link>
        {" / "}
        <span>{` ${brand} ${name}`}</span>
      </MainNav>
      <Div>
        <div className="card">
          <div className="image">
            <Image
              src={imageURL}
              width={330}
              height={412}
              layout="responsive"
            />
          </div>
          <div className="info">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>
            <div className="amount">{`Rs. ${getFormattedCurrency(
              amount
            )}`}</div>
            <div className="actions">
              <button
                className="cart"
                onClick={addToCartHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loader"></span>
                ) : (
                  "Добавить в корзину"
                )}
              </button>
            </div>
          </div>
        </div>
      </Div>
    </>
  );
};

export const getStaticPaths = () => {
  const paths = getAllStaticPaths();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = (context) => {
  const cid = context.params.cid;
  const item = getItemById(cid);
  return {
    props: {
      ...item,
    },
  };
};

export default ItemDetails;
