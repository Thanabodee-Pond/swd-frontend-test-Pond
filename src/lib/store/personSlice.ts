import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  key: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string; 
  nationality: string;
  citizenId?: string; 
  gender: 'Male' | 'Female' | 'Unisex';
  mobilePhone: string;
  passportNo?: string;
  expectedSalary: number;
}

interface DeletePersonsPayload {
  keys: string[];
}

const initialState: Person[] = [];
const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.push(action.payload);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.findIndex(person => person.key === action.payload.key);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deletePerson: (state, action: PayloadAction<string>) => {
      return state.filter(person => person.key !== action.payload);
    },
    deleteMultiplePersons: (state, action: PayloadAction<DeletePersonsPayload>) => {
      return state.filter(person => !action.payload.keys.includes(person.key));
    },
  },
});

export const { addPerson, updatePerson, deletePerson, deleteMultiplePersons } = personSlice.actions;

export default personSlice.reducer;
