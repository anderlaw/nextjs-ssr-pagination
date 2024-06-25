import React, { FC } from "react";
import "./index.scss";
interface PaginationProps {
    boundaryCount?: number;
    count: number;
    page?: number;
    siblingCount?: number;
    linkRender: (page: number) => string;
    itemStyle?: (type: "prev" | "next" | "page") => React.CSSProperties;
    style?: React.CSSProperties;
}
declare const Pagination: FC<PaginationProps>;
export default Pagination;
