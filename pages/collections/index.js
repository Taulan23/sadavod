import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useSelector } from "react-redux";
import styled from "styled-components";

import BrandFilter from "../../components/BrandFilter";
import CategoryFilter from "../../components/CategoryFilter";
import ItemCard from "../../components/ItemCard";
import SortSelect from "../../components/SortSelect";
import getItems from "../../utils/getItems";
import SmallSort from "../../components/SmallSort";
import SmallFilter from "../../components/SmallFilter";
import EmptyResults from "../../components/EmptyResults";

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

const Div = styled.div`
  flex: 1;
  display: flex;

  .aside {
    width: 300px;
    padding: 16px;

    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .main {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    .top {
      display: flex;

      .title {
        font-size: 18px;
        font-weight: 500;
        margin-right: auto;
      }
    }

    .items {
      margin: 16px 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
  }

  @media (max-width: 1024px) {
    .main {
      .items {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  @media (max-width: 768px) {
    .main {
      .items {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (max-width: 640px) {
    .main {
      .top {
        align-items: center;

        .sort-filter {
          display: flex;
        }
      }

      .items {
        margin-bottom: 0;
      }
    }
  }
`;

const Products = ({ items, brands, categories }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const filteredBrands = useSelector((state) => state.filter.brands);
  const filteredCategories = useSelector((state) => state.filter.categories);
  const filteredSort = useSelector((state) => state.filter.sort);

  let filteredItems;

  filteredItems =
    filteredBrands.length > 0
      ? [...items].filter((value) => filteredBrands.includes(value.brand))
      : [...items];

  filteredItems =
    filteredCategories.length > 0
      ? filteredItems.filter((value) =>
          filteredCategories.includes(value.category)
        )
      : filteredItems;

  if (filteredSort === "price_high_to_low") {
    filteredItems = filteredItems.sort((a, b) => +b.amount - +a.amount);
  } else if (filteredSort === "price_low_to_high") {
    filteredItems = filteredItems.sort((a, b) => +a.amount - +b.amount);
  }

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  console.log(filteredItems);

  return (
    <>
      <Head>
        <title>САДАВОД</title>
      </Head>
      <MainNav>
        <Link href="/">Главная</Link> / <span>Меню</span>
      </MainNav>
      <Div>
        {width > 640 && (
          <aside className="aside">
            <div className="title">Фильтры</div>
            <BrandFilter items={brands} />
            <CategoryFilter items={categories} />
          </aside>
        )}
        <main className="main">
          <div className="top">
            <div className="title">Меню</div>
            {width > 640 ? (
              <SortSelect />
            ) : (
              <div className="sort-filter">
                <SmallSort />
                <SmallFilter brandItems={brands} categoryItems={categories} />
              </div>
            )}
          </div>
          {filteredItems.length > 0 ? (
            <div className="items">
              {filteredItems.map((item, index) => (
                <ItemCard key={item.id} {...item} setPriority={index < 8} />
              ))}
            </div>
          ) : (
            <EmptyResults />
          )}
        </main>
      </Div>
    </>
  );
};

export const getStaticProps = (context) => {
  const items = getItems();

  const brands = items.reduce((previous, current) => {
    if (!previous.includes(current.brand)) {
      previous.push(current.brand);
    }

    return previous;
  }, []);

  const categories = items.reduce((previous, current) => {
    if (!previous.includes(current.category)) {
      previous.push(current.category);
    }

    return previous;
  }, []);

  return {
    props: {
      items: items,
      brands,
      categories,
    },
  };
};

export default Products;
