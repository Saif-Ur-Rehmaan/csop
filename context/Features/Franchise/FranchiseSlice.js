import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const InitialState = {
    Data: null,
    region: { "Latitude": 0, "LatitudeDelta": 0, "Longitude": 0, "LongitudeDelta": 0 },
    isLoading: false,
    isError: false,
    isSuccess: true,
    isSelectedHeart: false,
    SelectedStoreIndex: -1,
};

export const FetchFranchises = createAsyncThunk(
    'fetchFranchises',
    async (params, ThunkApi) => {
        try {
            const response = await fetch("http://assignment.optikl.ink/api/franchises");
            const franchises = await response.json();

            switch (franchises.status) {
                case '1':
                    const data = franchises.data.map(f => ({
                        id: f.id,
                        Name: f.Fran_Title,
                        Timing: `${f.Fran_OpenTime}-${f.Fran_CloseTime}`,
                        Phone: f.Fran_Phone,
                        Address: f.Addr_Description,
                        Location: {
                            Longitude: f.Addr_Longitude,
                            LongitudeDelta: f.Addr_LongitudeDelta,
                            Latitude: f.Addr_Latitude,
                            LatitudeDelta: f.Addr_LatitudeDelta,
                        }
                    }));
                    return data;
                default:
                    return ThunkApi.rejectWithValue(data);
            }
        } catch (error) {
            return ThunkApi.rejectWithValue(error);
        }
    }
);

const FranchiseSlice = createSlice({
    name: "Franchise",
    initialState: InitialState,
    reducers: {
        setAllFranchises: (state, action) => {
            state.Data = action.payload;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        setisSelectedHeart: (state, action) => {
            state.isSelectedHeart = action.payload;
        },
        setSelectedStoreIndex: (state, action) => {
            state.SelectedStoreIndex = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchFranchises.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(FetchFranchises.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Data = action.payload;
                state.region = action.payload[0].Location;
            })
            .addCase(FetchFranchises.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.Data = action.payload;
            });
    }
});

export const { setAllFranchises, setSelectedStoreIndex, setRegion, setisSelectedHeart } = FranchiseSlice.actions;
export default FranchiseSlice.reducer;
