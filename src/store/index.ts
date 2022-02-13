import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { UserState } from "../types/user";
import categoryReducer from "./reducers/categoryReducer";
import UserReducer from "./reducers/userReducer";

export interface AppState {
    user: UserState,
    category: CategoryState
}

const rootReducer = combineReducers<AppState>({
    user: UserReducer,
    category: categoryReducer
})

export default rootReducer;