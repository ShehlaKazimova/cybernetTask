import { firstApi } from './api/FirstApi'

export const reducer = {
    [firstApi.reducerPath]: firstApi.reducer,
}

export const middlewares = [
    firstApi.middleware,
]