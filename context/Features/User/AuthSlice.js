import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const InitialValue = {
    Data: null,
    Cart: [],
    isLoading: false,
    isError: true,
    isSuccess: true,
};

export const Login = createAsyncThunk('Login', async (params, ThunkApi) => {
    const data = params;
    try {
        const response = await fetch("http://assignment.optikl.ink/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        switch (data.status) {
            case '1':
                return data;
            case '2':
                return ThunkApi.rejectWithValue(data);
            case '3':
                return ThunkApi.rejectWithValue(data);
            default:
                return ThunkApi.rejectWithValue(data);
        }
    } catch (error) {
        return ThunkApi.rejectWithValue(error);
    }

});

export const FetchItemSizes = async (SizeIdArray) => {

    const obj = {
        "SizeOptionsIdArray": SizeIdArray
    }
    try {
        const response = await fetch("http://assignment.optikl.ink/api/franchises/GetSizesOfItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        const responseJson = await response.json();
        const sizes = responseJson;

        return sizes;
    } catch (error) {
        console.log(error);
    }
}
// export const FetchOrderOfOrderId = async (OrderId) => {

//     const obj = {
//         "id": OrderId
//     }
//     try {
//         const response = await fetch("", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(obj)
//         })
//         const responseJson = await response.json();
//         const Item = responseJson;
//         return Item;
//     } catch (error) {
//         console.log(error);
//         // return error;
//     }
// }
const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: InitialValue,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.Cart.push(newItem);
        },
        removeFromCart: (state, action) => {
            try {
                const [ItmId, SizeId] = action.payload;

                const indexOfItm = state.Cart.findIndex(item => {
                    const ItmIdCondition = item.Item.Item.Item_Id == ItmId;
                    const SizeIdCondition = item.Size.IS_Id == SizeId;
                    return ItmIdCondition && SizeIdCondition;
                });
                if (indexOfItm == -1) {
                    console.log("Item dsnt exist in cart");
                } else {
                    state.Cart.splice(indexOfItm, 1)
                }

            } catch (error) {
                console.log(error);
            }
        },
        updateCartItem: (state, action) => {
            try {
                const { findData, UpdatedItem } = action.payload;
                const [ItmId, SizeId] = findData;

                const indexOfItm = state.Cart.findIndex(item => {
                    const ItmIdCondition = item.Item.Item.Item_Id == ItmId;
                    const SizeIdCondition = item.Size.IS_Id == SizeId;
                    return ItmIdCondition && SizeIdCondition;
                });
                state.Cart[indexOfItm] = UpdatedItem;


            } catch (error) {
                console.log(error);
            }
        },
        updateCartItemQuantity: (state, action) => {
            // dispatch(updateCartItemQuantity({ itemId: Item.Item_Id, quantity: newQuantity }));

            const { itemId, quantity } = action.payload;
            const itemToUpdate = state.Cart.find(item => item.id === itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.Cart = [];
        }


    },
    extraReducers: (builder) => {
        builder.addCase(Login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.Data = action.payload;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;

        });
    }
});
export const { clearCart, addToCart, updateCartItem, removeFromCart, updateCartItemQuantity } = AuthSlice.actions;

export default AuthSlice.reducer;
