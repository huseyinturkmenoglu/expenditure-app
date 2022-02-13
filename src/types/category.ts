import { ThunkDispatch } from "redux-thunk"

export interface Category {
    id: number,
    name: string,
    type: "income" | "expense",
    color: string
}

export interface CategoryState {
    data: Category[]
    loading: boolean
    error: string
}

export interface CategoryForm {
    name: string;
    type: "income" | "expense";
    color?: string;
}


interface CATEGORIES_START {
    type: "CATEGORIES_START"
}

interface CATEGORIES_SUCCESS {
    type: "CATEGORIES_SUCCESS";
    payload: Category[];
}

interface CATEGORIES_ERROR {
    type: "CATEGORIES_ERROR"
}

interface ADD_CATEGORIES_START {
    type: "ADD_CATEGORIES_START"
}

interface ADD_CATEGORIES_SUCCESS {
    type: "ADD_CATEGORIES_SUCCESS";
    payload: Category;
}

interface ADD_CATEGORIES_ERROR {
    type: "ADD_CATEGORIES_ERROR"
}

interface UPDATE_CATEGORIES_START {
    type: "UPDATE_CATEGORIES_START"
}

interface UPDATE_CATEGORIES_SUCCESS {
    type: "UPDATE_CATEGORIES_SUCCESS";
    payload: Category;
}

interface UPDATE_CATEGORIES_ERROR {
    type: "UPDATE_CATEGORIES_ERROR"
}

interface DELETE_START {
    type: "DELETE_CATEGORY_START";
}

interface DELETE_SUCCESS {
    type: "DELETE_CATEGORY_SUCCESS";
    payload: number;
}

interface DELETE_ERROR {
    type: "DELETE_CATEGORY_ERROR";
}

export type CategoryAction = CATEGORIES_START
    | CATEGORIES_SUCCESS
    | CATEGORIES_ERROR
    | UPDATE_CATEGORIES_START
    | UPDATE_CATEGORIES_SUCCESS
    | UPDATE_CATEGORIES_ERROR
    | ADD_CATEGORIES_START
    | ADD_CATEGORIES_SUCCESS
    | ADD_CATEGORIES_ERROR
    | DELETE_START
    | DELETE_SUCCESS
    | DELETE_ERROR;
export type CategoryDispatch = ThunkDispatch<CategoryState, void, CategoryAction>;
