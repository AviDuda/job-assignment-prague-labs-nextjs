import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState, useTransition } from "react";
import styled from "styled-components";

import { ApiResponse, Product } from "../../pages/api/data";
import { ITEMS_PER_PAGE } from "../constants";

import Button from "./Button";
import { FilterValues } from "./Filters";
import { CenteredContainer, Flex } from "./LayoutComponents";
import ProductItem from "./ProductItem";

interface ProductListProps {
    initialData?: ApiResponse;
    filters: FilterValues;
}

type Status = "ready" | "loading" | "error" | "all_done";

export default function ProductList({ initialData, filters }: ProductListProps) {
    const [_isPending, startTransition] = useTransition();
    const { query: queryParams } = useRouter();
    const pageQuery = Number(queryParams.page);
    const isPageNumeric = typeof pageQuery === "number" && isFinite(pageQuery) && pageQuery > 0;

    const [products, setProducts] = useState<Product[]>(initialData?.items ?? []);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialData?.items ?? []);
    const [nextProductFrom, setNextProductFrom] = useState(ITEMS_PER_PAGE + (isPageNumeric ? pageQuery : 0));
    const [page, setPage] = useState(isPageNumeric ? pageQuery : 1);

    const [status, setStatus] = useState<Status>(() => {
        if (!initialData || !initialData.items) return "error";
        if (initialData.items.length === initialData.count) {
            return "all_done";
        }
        return "ready";
    });
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        // Fetch product data when requested

        if (!shouldFetch) {
            return;
        }

        setStatus("loading");
        setShouldFetch(false);

        const parseData = async () => {
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 5000);
                const response = await fetch("/api/data", { signal: controller.signal });
                if (!response.ok) {
                    throw new Error();
                }
                const data: Partial<ApiResponse> = await response.json();
                if (!data.items || data.items.length === 0) {
                    throw new Error();
                }

                const newProducts = data.items.slice(0, page * ITEMS_PER_PAGE);

                setProducts((prevProducts) => [...prevProducts, ...newProducts]);

                if (newProducts.length > 0) {
                    setNextProductFrom((prevState) => prevState + newProducts.length);
                    setStatus("ready");
                } else {
                    setStatus("all_done");
                }
            } catch {
                setStatus("error");
            }
        };
        startTransition(() => {
            parseData();
        });
    }, [initialData, nextProductFrom, page, shouldFetch]);

    useEffect(() => {
        startTransition(() => {
            // Update filtered products when filters or products change

            const hasVehicleTypeFilter = Object.entries(filters.vehicleTypes).some(([, val]) => val === true);
            setFilteredProducts(
                products.filter((product) => {
                    if (filters.minPrice && product.price < filters.minPrice) return false;
                    if (filters.maxPrice && product.price > filters.maxPrice) return false;
                    if (filters.instantBookableOnly === "1" && !product.instantBookable) return false;
                    if (hasVehicleTypeFilter && filters.vehicleTypes[product.vehicleType] === false) {
                        return false;
                    }
                    return true;
                }),
            );
        });
    }, [products, filters]);

    function handleLoadButtonClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        switch (status) {
            case "loading": {
                return;
            }
            case "ready": {
                setPage((prevPage) => prevPage + 1);
                setShouldFetch(true);
                return;
            }
            case "error": {
                setShouldFetch(true);
                return;
            }
        }
    }

    let loadButtonText = "";
    switch (status) {
        case "ready": {
            loadButtonText = "Načíst další";
            break;
        }
        case "loading": {
            loadButtonText = "Načítání...";
            break;
        }
        case "error": {
            loadButtonText = "Zkusit znovu";
            break;
        }
        default:
            break;
    }

    const buttonPageLink = status === "ready" ? page + 1 : page;

    return (
        <StyledProductList>
            <Flex gap="2em" wrap="wrap" justifyContent="center">
                {filteredProducts.map((product: Product) => {
                    // Yes, yes, I know I should use uuid or something instead, this is good enough for now
                    const key = Math.random();
                    return <ProductItem product={product} key={key} />;
                })}
            </Flex>
            <StyledFooterContainer placeContent="center" gap="3em" flexDirection="row">
                {status === "ready" && products.length > 0 && filteredProducts.length === 0 && (
                    <StyledErrorMessage style={{ backgroundColor: "var(--beige)", color: "var(--dark-blue)" }}>
                        Žádné karavany nebyly nalezeny. Zkuste změnit filtr nebo načíst další stránku.
                    </StyledErrorMessage>
                )}
                {status === "error" && <StyledErrorMessage>Došlo k chybě při načítání dat.</StyledErrorMessage>}
                {status !== "all_done" && (
                    <Button
                        href={`./?page=${buttonPageLink}`}
                        onClick={handleLoadButtonClick}
                        disabled={status === "loading"}
                    >
                        {loadButtonText}
                    </Button>
                )}
            </StyledFooterContainer>
        </StyledProductList>
    );
}

const StyledProductList = styled(CenteredContainer)`
    padding: 2rem 0 7.25rem 0;
`;

const StyledErrorMessage = styled.div`
    padding: 1rem 3rem;
    background-color: var(--orange);
    min-width: 50%;
`;

const StyledFooterContainer = styled(Flex)`
    margin-top: 3em;
`;
