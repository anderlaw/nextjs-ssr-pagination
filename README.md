# Installation
`npm install nextjs-ssr-pagination`
# Usage
in your page component

```tsx
import Pagination from 'nextjs-ssr-pagination'
import 'ssr-pagination/dist/index.css'

<Pagination
    count={page_count}
    page={page_number}
    boundaryCount={2}
    siblingCount={2}
    linkRender={(num) => `/category/${category}/${num}`}
/>
```
# Example
![图示](https://github.com/anderlaw/nextjs-ssr-pagination/blob/main/images/screenshot.png)
