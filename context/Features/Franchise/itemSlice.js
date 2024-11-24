import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const InitialState = {
    Data: null,
    isLoading: true,
    isError: false,
};

export const FetchItemsOfCatId = createAsyncThunk(
    'fetchItemsOfCatId',
    async (id, ThunkApi) => {



        reqBody = {
            "id": id
        }
        try {
            const response = await fetch("http://assignment.optikl.ink/api/franchises/ItemsOfCategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });
            const Items = await response.json();

            switch (Items.status) {
                case '1':
                    return Items;
                default:
                    return ThunkApi.rejectWithValue(Items);
            }
        } catch (error) {
            console.log(error);
            return ThunkApi.rejectWithValue(error);
        }
    }
);
export const FetchItemsOfCatIdasync = async (id, ThunkApi) => {



    reqBody = {
        "id": id
    }
    try {
        const response = await fetch("http://assignment.optikl.ink/api/franchises/ItemsOfCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });
        const Items = await response.json();

        switch (Items.status) {
            case '1':
                return Items;
            default:
                console.error(error);
                return error;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const ItemSlice = createSlice({
    name: "Franchise",
    initialState: InitialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearData: (state) => {
            state.Data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchItemsOfCatId.pending, (state, action) => {

                state.isLoading = true;
            })
            .addCase(FetchItemsOfCatId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Data = action.payload;
            })
            .addCase(FetchItemsOfCatId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.Data = action.payload;
            });
    }
});

export const { setIsLoading, clearData } = ItemSlice.actions;
export default ItemSlice.reducer;
