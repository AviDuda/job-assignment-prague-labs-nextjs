import Image from "next/image";
import styled from "styled-components";

import { Product } from "../../pages/api/data";
import iconBed from "../../public/images/icon-bed.svg";
import iconInstantBookable from "../../public/images/icon-instant-bookable.svg";
import iconPassengers from "../../public/images/icon-passengers.svg";
import iconShower from "../../public/images/icon-shower.svg";
import iconToilet from "../../public/images/icon-toilet.svg";
import { vehicleTypes } from "../constants";

import { Flex } from "./LayoutComponents";

type ProductProps = {
    product: Product;
};

export default function ProductItem({ product }: ProductProps) {
    const vehicleTypeName = vehicleTypes[product.vehicleType]?.name ?? product.vehicleType;
    const vehicleTypeDesc = vehicleTypes[product.vehicleType]?.description ?? "";
    return (
        <StyledProduct>
            <Image src={product.pictures[0]} alt={product.name} width={398} height={190} objectFit="cover" />
            <ProductInfo>
                <VehicleType title={vehicleTypeDesc}>{vehicleTypeName}</VehicleType>
                <ProductName>{product.name}</ProductName>
                <ProductDetails>
                    <ProductLocation>{product.location}</ProductLocation>
                    <Flex gap="var(--fs-small)" alignItems="center">
                        <Flex gap="0.25rem" alignItems="center">
                            <Image
                                src={iconPassengers}
                                title={`${product.passengersCapacity} passengers`}
                                alt={`${product.passengersCapacity} passengers`}
                            />
                            <span aria-hidden={true}>{product.passengersCapacity}</span>
                        </Flex>
                        <Flex gap="0.25rem" alignItems="center">
                            <Image
                                src={iconBed}
                                title={`${product.passengersCapacity} beds`}
                                alt={`${product.passengersCapacity} beds`}
                            />
                            <span aria-hidden={true}>{product.sleepCapacity}</span>
                        </Flex>
                        {product.toilet && <Image src={iconToilet} title="Toilet available" alt="Toilet available" />}
                        {product.shower && <Image src={iconShower} alt="Shower available" title="Shower available" />}
                    </Flex>
                </ProductDetails>
                <PriceContainer>
                    <PriceFromText>Cena od</PriceFromText>
                    <Flex gap="0.5rem" alignItems="center">
                        <PriceText>{product.price} Kč/den</PriceText>
                        {product.instantBookable && (
                            <Image src={iconInstantBookable} title="Okamžitá rezervace" alt="Okamžitá rezervace" />
                        )}
                    </Flex>
                </PriceContainer>
            </ProductInfo>
        </StyledProduct>
    );
}

const StyledProduct = styled.div`
    width: 24.5rem;
    height: 23.75rem;
    flex: 0 0 24.5rem;
    border: 1px solid var(--beige);
    border-radius: 8px;
`;

const ProductInfo = styled.div`
    padding: var(--fs-normal);
    padding-top: var(--fs-tiny);
`;

const VehicleType = styled.div`
    color: var(--orange);
    font-size: var(--fs-small);
    font-weight: var(--fw-bold);
    text-transform: uppercase;
`;

const ProductDetails = styled.div`
    border-top: 1px solid var(--beige);
    border-bottom: 1px solid var(--beige);
    padding: 0.625rem 0 var(--fs-small) 0;
`;

const ProductName = styled.h2`
    color: var(--dark-blue);
    font-size: var(--fs-large);
    padding-bottom: 5px;
`;

const ProductLocation = styled.p`
    padding-bottom: 0.625rem;
    font-size: var(--fs-small);
`;

const PriceContainer = styled(Flex).attrs({
    justifyContent: "space-between",
})`
    padding: var(--fs-tiny) 0 var(--fs-normal) 0;
`;

const PriceFromText = styled.span`
    color: var(--dark-grey);
`;

const PriceText = styled.strong`
    color: var(--dark-blue);
`;
