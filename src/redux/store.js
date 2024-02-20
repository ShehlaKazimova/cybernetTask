import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'
import { middlewares, reducer } from "./ReducerAndMiddleware"

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares)
})

export const RootState = store.getState
export const AppDispatch = store.dispatch
setupListeners(store.dispatch)
export default store


