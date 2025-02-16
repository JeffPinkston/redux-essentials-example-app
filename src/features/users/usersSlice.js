import { client } from "../../api/client"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
  ]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
      })
    }
})

export default usersSlice.reducer;

export const selectAllUsers = state => state.users;

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)