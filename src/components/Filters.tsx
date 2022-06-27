import Image from "next/image";
import Slider from "rc-slider";
import sliderCss from "rc-slider/assets/index.css";
import { ChangeEventHandler, Fragment, useTransition, useState, useEffect } from "react";
import styled, { css } from "styled-components";

import iconInstantBookable from "../../public/images/icon-instant-bookable.svg";
import { vehicleTypes } from "../constants";
import { device } from "../GlobalStyle";

import { CenteredContainer, Flex } from "./LayoutComponents";

export interface FilterValues {
    minPrice?: number;
    maxPrice?: number;
    vehicleTypes: Record<string, boolean>;
    instantBookableOnly: "0" | "1";
}

type FiltersProps = {
    filters: FilterValues;
    onChange: (values: FilterValues) => any;
};

const MIN_PRICE = 100;
const MAX_PRICE = 10000;

function localeStringToNumber(str: string) {
    return Number((str.match(/(\d+)/g) ?? []).join(""));
}

function numberToLocale(num: number) {
    return num.toLocaleString("cs");
}

export default function Filters({ filters, onChange }: FiltersProps) {
    const [_isPending, startTransition] = useTransition();

    const [dailyPrices, setDailyPrices] = useState([filters.minPrice, filters.maxPrice]);

    useEffect(() => {
        setDailyPrices([filters.minPrice, filters.maxPrice]);
    }, [filters]);

    const handleVehicleTypeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newVehicleTypes = { ...filters.vehicleTypes };
        for (const vehicleType of Object.keys(vehicleTypes)) {
            if (typeof newVehicleTypes[vehicleType] === "undefined") {
                newVehicleTypes[vehicleType] = false;
            }
        }
        onChange({
            ...filters,
            vehicleTypes: {
                ...newVehicleTypes,
                [e.target.name]: e.target.checked,
            },
        });
    };

    function handleRangeChange(value: number | number[]) {
        const [minPrice, maxPrice] = value as number[];
        setDailyPrices(value as number[]);
        startTransition(() => {
            onChange({
                ...filters,
                minPrice,
                maxPrice,
            });
        });
    }

    const handlePriceInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDailyPrices(([prevMinPrice, prevMaxPrice]) => {
            const value = localeStringToNumber(e.target.value);
            if (e.target.name === "minPrice") return [value, prevMaxPrice];
            else return [prevMinPrice, value];
        });
        startTransition(() => {
            onChange({ ...filters, [e.target.name]: localeStringToNumber(e.target.value) });
        });
    };

    return (
        <StyledFilters>
            <Filter>
                <FilterTitle>Cena za den</FilterTitle>
                <SliderContainer>
                    <StyledSlider
                        range
                        min={100}
                        max={10000}
                        value={[dailyPrices[0] ?? MIN_PRICE, dailyPrices[1] ?? MAX_PRICE]}
                        onChange={handleRangeChange}
                        railStyle={{ backgroundColor: "var(--beige)", height: "0.25rem" }}
                        handleStyle={{
                            backgroundColor: "var(--green)",
                            borderColor: "var(--green)",
                            width: "var(--fs-large)",
                            height: "var(--fs-large)",
                            opacity: 1,
                            marginTop: "-10px",
                        }}
                        trackStyle={{ backgroundColor: "var(--green)" }}
                        dotStyle={{ backgroundColor: "var(--dark-blue)" }}
                        activeDotStyle={{ backgroundColor: "var(--dark-blue)" }}
                        ariaLabelForHandle={["Minimální cena za den", "Maximální cena za den"]}
                    />
                </SliderContainer>
                <PriceInputs>
                    <PriceInput>
                        <StyledInput
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9 ]*"
                            name="minPrice"
                            value={dailyPrices[0] ? numberToLocale(dailyPrices[0]) : ""}
                            placeholder="100"
                            spellCheck={false}
                            onChange={handlePriceInputChange}
                        />
                        <PriceSymbol>Kč</PriceSymbol>
                    </PriceInput>
                    <PriceInput>
                        <StyledInput
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9 ]*"
                            name="maxPrice"
                            value={dailyPrices[1] ? numberToLocale(dailyPrices[1]) : ""}
                            placeholder="10 000"
                            spellCheck={false}
                            onChange={handlePriceInputChange}
                        />
                        <PriceSymbol>Kč</PriceSymbol>
                    </PriceInput>
                </PriceInputs>
            </Filter>
            <Filter flex="1">
                <FilterTitle>Typ karavanu</FilterTitle>
                <VehicleTypes>
                    {Object.entries(vehicleTypes).map(([vehicleId, translation]) => (
                        <Fragment key={vehicleId}>
                            <VehicleTypeCheckbox
                                name={vehicleId}
                                id={vehicleId}
                                checked={filters.vehicleTypes[vehicleId] === true}
                                onChange={handleVehicleTypeChange}
                            />
                            <VehicleTypeLabel htmlFor={vehicleId}>
                                <VehicleTypeName>{translation.name}</VehicleTypeName>
                                <VehicleTypeDesc>{translation.description}</VehicleTypeDesc>
                            </VehicleTypeLabel>
                        </Fragment>
                    ))}
                </VehicleTypes>
            </Filter>
            <Filter>
                <FilterTitle>
                    Okamžitá rezervace <Image src={iconInstantBookable} alt="Okamžitá rezervace" />
                </FilterTitle>
                <StyledSelect
                    name="instantBookableOnly"
                    value={filters.instantBookableOnly}
                    onChange={(e) => onChange({ ...filters, [e.target.name]: e.target.value })}
                >
                    <option value={"0"}>Nezáleží</option>
                    <option value={"1"}>Ano</option>
                </StyledSelect>
            </Filter>
        </StyledFilters>
    );
}

const filterBreakpoint = "(max-width: 967px)";

const StyledFilters = styled(CenteredContainer)`
    display: flex;
    justify-content: stretch;
    background-color: var(--beige);
    gap: 1px;
    @media ${filterBreakpoint} {
        flex-direction: column;
    }
`;

const Filter = styled(Flex).attrs({
    flexDirection: "column",
})<{ flex?: string }>`
    background-color: var(--white);
    padding: 1rem;
    ${(props) =>
        props.flex &&
        css`
            flex: ${props.flex};
        `}
    @media ${device.mobile} {
        flex: 1 0;
    }
    :first-of-type {
        padding-left: 0;
    }
`;

const FilterTitle = styled.div`
    color: var(--dark-grey);
    margin-bottom: 1rem;
`;

const SliderContainer = styled.div`
    padding-left: var(--fs-tiny);
    padding-right: var(--fs-tiny);
    margin-bottom: 1rem;
`;

const StyledSlider = styled(Slider)`
    ${sliderCss}
`;

const VehicleTypes = styled(Flex).attrs({ gap: "1rem" })`
    @media ${device.desktop} {
        flex-wrap: wrap;
    }
`;

const VehicleTypeCheckbox = styled.input.attrs({ type: "checkbox" })`
    display: none;
    :checked + label {
        border: 2px solid var(--green);
    }
`;
const VehicleTypeLabel = styled.label`
    --vehicle-label-basis: 9.75rem;
    flex-basis: var(--vehicle-label-basis);
    border: 2px solid var(--beige);
    border-radius: 8px;
    padding: 0.5625rem var(--fs-tiny) 0.375rem var(--fs-tiny);
    user-select: none;
    cursor: pointer;
    @media ${device.desktop} {
        flex: 1 0 var(--vehicle-label-basis);
    }
    @media ${filterBreakpoint} {
        width: var(--vehicle-label-basis);
        flex-shrink: 0;
    }
`;

const VehicleTypeName = styled.div`
    color: var(--dark-blue);
`;

const VehicleTypeDesc = styled.div`
    color: var(--dark-grey);
    font-size: var(--fs-tiny);
`;

const FieldCss = css`
    border: 1px solid var(--beige);
    padding: var(--fs-small) var(--fs-tiny);
    color: var(--dark-blue);
    border-radius: 8px;
    background-color: var(--white);
    outline: none;
    :focus {
        border-color: var(--green);
    }
`;

const PriceInputs = styled(Flex).attrs({ gap: "1rem", wrap: "wrap" })`
    @media (max-width: 280px) {
        flex-direction: column;
    }
`;

const PriceInput = styled.label`
    position: relative;
    @media ${filterBreakpoint} {
        flex: 1;
        flex-wrap: nowrap;
    }
`;

const PriceSymbol = styled.span`
    position: absolute;
    right: 1rem;
    top: var(--fs-small);
    color: var(--dark-grey);
    user-select: none;
`;

const StyledInput = styled.input`
    ${FieldCss}
    max-width: 9.75rem;
    @media ${filterBreakpoint} {
        width: 100%;
        max-width: none;
    }
`;

const StyledSelect = styled.select`
    ${FieldCss}
    min-width: 11rem;
    appearance: none;
    background-color: var(--white);
    background: url("/images/icon-expand.svg") no-repeat calc(100% - 8px) !important;
`;
