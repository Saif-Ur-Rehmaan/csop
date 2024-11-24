import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const InitialFranchiseState = {
    FranchiseObj: {
        FranchiseId: null,
        FranchiseName: null,
        FranchiseAddress: null,
        FranchiseMenu: null,
        FranchiseSeasonal: null,
        FranchiseUsersFavItems: null,
        FranchiseUsersPrevious: null,
    }
};
export const FetchMenuAndSeasonalCats = createAsyncThunk('MenuAndSeasonalCats', async (payload, thunkAPI) => {
    try {
        const FranchiseId = payload;
        const data = await fetch('http://assignment.optikl.ink/api/franchises/MenuAndSeasonalCat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: FranchiseId
            })
        });
        // Assuming you want to await the response and extract JSON  data from it
        const jsonData = await data.json();

        const Menu = [];
        for (const key in jsonData.data.Menu) {
            if (Object.hasOwnProperty.call(jsonData.data.Menu, key)) {
                const MenuObj = jsonData.data.Menu[key];
                Menu.push(MenuObj);
            }
        }
        const Seasonal = [];
        for (const key in jsonData.data.Seasonal) {
            if (Object.hasOwnProperty.call(jsonData.data.Seasonal, key)) {
                const seasonalObj = jsonData.data.Seasonal[key];
                Seasonal.push(seasonalObj);
            }
        }


        // Dispatch actions instead of calling the functions directly
        thunkAPI.dispatch(setMenu(Menu));
        thunkAPI.dispatch(setSeasonal(Seasonal));
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


const FranchiseSlice = createSlice({
    name: "UserFranchise",
    initialState: InitialFranchiseState,
    reducers: {
        setFranchise: (state, action) => {
            return {
                ...state,
                FranchiseObj: action.payload
            };
        },
        setMenu(state, action) {
            state.FranchiseObj.FranchiseMenu = action.payload
        },
        setSeasonal(state, action) {
            state.FranchiseObj.FranchiseSeasonal = action.payload
        }
    }
})

export const { setFranchise, setMenu, setSeasonal } = FranchiseSlice.actions
export default FranchiseSlice.reducer;
