import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
//import { auth, googleProvider } from "../firebase.js"
//import { signInWithPopup } from "firebase/auth"

export const login = createAsyncThunk(
    "auth/login",
    async (loginData, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:3500/user/login", loginData)
            console.log(response.data)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (registerData, thunkAPI) => {
        try {
            const getLocation = () => {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
            };

            let locationName = "Worldwide"; // Default location

            try {
                const position = await getLocation();
                const { latitude, longitude } = position.coords;
                const mapboxToken = import.meta.env.VITE_API_MAPBOX_TOKEN;
                const geocodeResponse = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
                );
                const geocodeData = await geocodeResponse.json();
                const location = geocodeData.features[0]?.place_name;
                locationName = location ? location.split(", ").slice(-2).join(", ") : "Worldwide";
            } catch (error) {
                console.error("Error getting location:", error);
            }

            const dataWithLocation = {
                ...registerData,
                location: locationName
            };

            const response = await axios.post("http://localhost:3500/user/sign-up", dataWithLocation);
            localStorage.setItem("userLocation", JSON.stringify(locationName)); 
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);


export const signWithGoogle = createAsyncThunk(
    "auth/signWithGoogle",
    async (_, thunkAPI) => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const token = await result.user.getIdToken()
            const response = await fetch("http://localhost:3500/user/signWithGoogle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }
            )
            const userData = await response.json()
            if (response.ok) {
                return response.data
                // navigate("/")
            }
            console.log(userData)
        } 
        
        catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error)
}
}
)


const initialState = {
    user: null,
    isLoading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(login.rejected, state => {
                state.isLoading = false
            })

            .addCase(register.pending, state => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(register.rejected, state => {
                state.isLoading = false
            })
    }

})

export default authSlice.reducer