import React, { ReactNode, FC } from "react";
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
const Dot = () => {
  return <div style={{ width: "32px", textAlign: "center" }}>...</div>;
};
const Item: FC<{
  path: string;
  focus?: boolean;
  disabled?: boolean;
  children: ReactNode;
}> = ({ path, focus, disabled, children }) => {
  return (
    <a
      className={`pagination-item ${focus ? "focus" : ""}`}
      href={path}
    >
      <button disabled={disabled}>{children}</button>
    </a>
  );
};
const Pagination: FC<PaginationProps> = ({
  boundaryCount = 1,
  siblingCount = 1,
  page = 1,
  count,
  style = {},
  linkRender,
}) => {
  /**
   * 渲染多少个boundaryCount
   * 是否存在DOTS
   * 三部分：
   * 1. 前置
   * 2. page周围
   * 3. 后置
   */
  if (page > count) {
    throw "页码不能大于页数";
  }
  const expectedItemCount = 2 * boundaryCount + 2 * siblingCount + 3;
  const LeftBoundary = () => {
    return (
      <>
        {[...Array(boundaryCount)].map((_, idx) => {
          const _page = idx + 1;
          console.log(_page, page);
          return (
            <Item focus={_page === page} path={linkRender(_page)}>
              {_page}
            </Item>
          );
        })}
      </>
    );
  };
  const RightBoundary = () => {
    return (
      <>
        {[...Array(boundaryCount)].map((_, idx) => {
          const _page = count - boundaryCount + 1;
          return (
            <Item focus={_page === page} path={linkRender(_page)}>
              {_page}
            </Item>
          );
        })}
      </>
    );
  };
  const MiddleSection = () => {
    const two_dots_count = 2;
    const mainCount = 1 + siblingCount * 2 + two_dots_count;
    let has_left_dot = true;
    if (page <= boundaryCount + siblingCount + 1 + 1) {
      has_left_dot = false;
    }
    let has_right_dot = true;
    if (page >= count - boundaryCount + 1 - 1 - siblingCount - 1) {
      has_right_dot = false;
    }
    if (has_left_dot && has_right_dot) {
      return (
        <>
          <Dot />
          {[...Array(1 + siblingCount * 2)].map((_, idx) => {
            const _page = page - siblingCount + idx;
            return (
              <Item key={idx} focus={_page === page} path={linkRender(_page)}>
                {_page}
              </Item>
            );
          })}
          <Dot />
        </>
      );
    } else if (!has_left_dot && has_right_dot) {
      return (
        <>
          {[...Array(mainCount - 1)].map((_, idx) => {
            const _page = boundaryCount + 1 + idx;
            return (
              <Item focus={_page === page} path={linkRender(_page)}>
                {_page}
              </Item>
            );
          })}
          <Dot />
        </>
      );
    } else if (has_left_dot && !has_right_dot) {
      return (
        <>
          <Dot />
          {/* 从后往前计算然后再翻转 */}
          {[...Array(mainCount - 1)]
            .map((_, idx) => {
              const _page = count - boundaryCount - idx;
              return (
                <Item key={idx} focus={_page === page} path={linkRender(_page)}>
                  {_page}
                </Item>
              );
            })
            .reverse()}
        </>
      );
    } else {
      console.log("测试，这里可能不会执行？！");
      return <></>;
    }
  };
  return (
    <div className="ssr-pagination" style={style}>
      <>
        {/* 前一页 */}
        <Item
          disabled={page - 1 < 1}
          path={page - 1 >= 1 ? `/page/${page - 1}` : ""}
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="NavigateBeforeIcon"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </Item>
        {count <= expectedItemCount ? (
          [...Array(count)].map((_, idx) => {
            const _page = idx + 1;
            return (
              <Item focus={_page === page} path={linkRender(_page)}>
                {_page}
              </Item>
            );
          })
        ) : (
          <>
            <LeftBoundary />
            <MiddleSection />
            <RightBoundary />
          </>
        )}
        {/* 后一页 */}
        <Item
          disabled={page + 1 > count}
          path={page + 1 <= count ? `/page/${page + 1}` : ""}
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="NavigateNextIcon"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </Item>
      </>
    </div>
  );
};
export default Pagination;
