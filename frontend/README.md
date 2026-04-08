# Mini Food Frontend

Frontend cho he thong dat mon noi bo theo Service-Based Architecture.

## Stack
- React + Vite
- Axios
- React Router DOM
- Context API + LocalStorage
- Structured CSS (semantic classes, design tokens)

## Cau truc chinh
- `src/api`: `userApi`, `foodApi`, `orderApi`, `paymentApi`
- `src/context`: `AuthContext`, `CartContext`, `ToastContext`
- `src/pages`: `Login`, `Register`, `Foods`, `Cart`, `Checkout`, `Orders`
- `src/components`: navbar, food card, protected route, ui components
- `src/layouts`: `MainLayout`
- `src/styles`: `layout.css`, `components.css`, `pages.css`
- `src/utils`: normalizer, formatter, storage helpers

## Cau hinh env LAN
Tao file `.env` tu `.env.example`:

```env
VITE_USER_SERVICE_URL=http://192.168.x.x:8081
VITE_FOOD_SERVICE_URL=http://192.168.x.x:8082
VITE_ORDER_SERVICE_URL=http://192.168.x.x:8083
VITE_PAYMENT_SERVICE_URL=http://192.168.x.x:8084
```

Frontend goi truc tiep IP LAN that, khong dung localhost cheo may.

## Chay app
```bash
npm install
npm run dev
```

## Flow demo
1. Register -> Login
2. Xem Foods -> Them vao cart
3. Cart -> Checkout
4. Tao order + payment COD/BANKING
5. Xem Orders cua user dang nhap
