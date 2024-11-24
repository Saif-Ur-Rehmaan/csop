import { configureStore } from '@reduxjs/toolkit'
import UserFranchiseSlice from './Features/Franchise/UserFranchiseSlice'
import AllFranchiseSlice from './Features/Franchise/FranchiseSlice'
import AuthSlice from './Features/User/AuthSlice'
import itemSlice from './Features/Franchise/itemSlice'

export const store = configureStore({
    reducer: {
        Franchise: UserFranchiseSlice,
        auth: AuthSlice,
        AllFranchise: AllFranchiseSlice,
        Items: itemSlice
    },

})