export const ensureArray = (value) => (Array.isArray(value) ? value : [])

export const normalizeFood = (rawFood) => ({
  id: rawFood?.id ?? rawFood?.foodId,
  name: rawFood?.name ?? rawFood?.foodName ?? 'Unknown food',
  description: rawFood?.description ?? '',
  price: Number(rawFood?.price ?? rawFood?.unitPrice ?? 0),
  available: rawFood?.available ?? rawFood?.isAvailable ?? true,
})

export const normalizeOrder = (rawOrder) => ({
  id: rawOrder?.id ?? rawOrder?.orderId,
  userId: rawOrder?.userId ?? rawOrder?.customerId ?? rawOrder?.user?.id ?? '',
  status: rawOrder?.status ?? 'CREATED',
  totalAmount: Number(rawOrder?.totalAmount ?? rawOrder?.totalPrice ?? 0),
  items: ensureArray(rawOrder?.items ?? rawOrder?.orderItems),
  createdAt: rawOrder?.createdAt ?? rawOrder?.createdDate ?? null,
})

export const extractUserFromLogin = (payload, fallbackUsername) => ({
  id: payload?.id ?? payload?.userId ?? payload?.data?.id ?? payload?.data?.userId ?? null,
  username: payload?.username ?? payload?.data?.username ?? fallbackUsername,
  role: payload?.role ?? payload?.data?.role ?? 'USER',
  fullName: payload?.fullName ?? payload?.data?.fullName ?? '',
})
