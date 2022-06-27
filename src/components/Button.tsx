import { LinkHTMLAttributes, MouseEventHandler } from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
    children: any;
    href: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    disabled?: boolean;
} & LinkHTMLAttributes<HTMLAnchorElement>;

const StyledButton = styled.a<{ disabled?: boolean }>`
    background: var(--green);
    border-radius: 0.5rem;
    padding: var(--fs-small) 2.25rem;
    color: var(--white);
    font-weight: 900;
    cursor: pointer;
    text-decoration: none;
    ${({ disabled }) =>
        disabled &&
        css`
            background: var(--dark-grey);
        `}
`;

export default function Button({ children, href, onClick, disabled }: ButtonProps) {
    return (
        <StyledButton href={href} onClick={onClick} disabled={!!disabled}>
            {children}
        </StyledButton>
    );
}
