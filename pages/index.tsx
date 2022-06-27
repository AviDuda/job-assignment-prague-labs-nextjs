import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import logo from "../public/images/prague-labs-logo.svg";
import Filters, { FilterValues } from "../src/components/Filters";
import ProductList from "../src/components/ProductList";
import { ITEMS_PER_PAGE } from "../src/constants";
import { device } from "../src/GlobalStyle";

import { ApiResponse, getData } from "./api/data";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageQuery = context.query.page;
    const page = Number(pageQuery);
    const data = getData();
    if (data === false) {
        return {
            props: {},
        };
    }
    const isPageNumeric = typeof page === "number" && isFinite(page) && page > 0;
    const sliceTo = ITEMS_PER_PAGE * (isPageNumeric ? page : 1);
    return {
        props: {
            productData: {
                count: data.count,
                items: data.items.slice(0, sliceTo),
            },
        },
    };
};

type HomeProps = {
    productData?: ApiResponse;
};

const Home = ({ productData }: HomeProps) => {
    const [filters, setFilters] = useState<FilterValues>({
        vehicleTypes: {},
        instantBookableOnly: "0",
    });

    return (
        <PageWrapper>
            <header>
                <HeadingContainer>
                    <Image src={logo} alt="Prague Labs" />
                </HeadingContainer>
            </header>
            <section>
                <Filters filters={filters} onChange={(values) => setFilters(values)} />
            </section>
            <main>
                <ProductList initialData={productData} filters={filters} />
            </main>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    @media ${device.desktop} {
        padding: 0 1em;
    }

    > :not(:last-child) {
        border-bottom: 1px solid var(--beige);
    }
`;

const HeadingContainer = styled.header`
    display: flex;
    max-width: var(--max-page-width);
    margin: 0 auto;
    padding: 1.375rem 0;
    @media ${device.desktop} {
        padding: 1.375rem 1rem;
    }
    @media ${device.mobile} {
        place-content: center;
    }
`;

export default Home;
