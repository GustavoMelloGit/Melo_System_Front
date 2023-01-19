import { create } from 'zustand'


type UsePagination = {
    currentPage: number
    rowsPerPage: number
    changeRowsPerPage: (rowsPerPage: number) => void
    changeCurrentPage: (currentPage: number) => void
}

export const usePagination = create<UsePagination>((set) => ({
    currentPage: 1,
    rowsPerPage: 10,
    changeRowsPerPage: (rowsPerPage: number) => { set({ rowsPerPage }); },
    changeCurrentPage: (currentPage: number) => { set({ currentPage }); },
}))