import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENTPAGE, SET_PAGINATION } from "../../redux/slices/PaginationSlice";

const Pagination = () => {
    const [PageNumbers, setPageNumbers] = useState([])
    const dispatch = useDispatch()
    const { filterProduct } = useSelector(state => state.products)
    const { totalPages , productPerPage , currentPage } = useSelector(state => state.pagination)
    useEffect(() => {
        let paginationData = {
            totalProducts: filterProduct.length,
            totalPages: Math.ceil(filterProduct.length / productPerPage)
        }
        dispatch(SET_PAGINATION(paginationData))
    }, [dispatch, filterProduct])

    useEffect(() => {
        const allPages = Array.from({ length: totalPages }, (_, index) => index + 1)
        setPageNumbers(allPages);
    }, [totalPages])

 



    const changePageByNumber = (page) => {
        let paginationData = {
            currentPage: page
        }
        dispatch(SET_CURRENTPAGE(paginationData))
    }
    const ChangePagePrev = (e) => {
        let paginationData = {
            currentPage: currentPage == 1 ? currentPage: currentPage-1
        }
        dispatch(SET_CURRENTPAGE(paginationData))
    }

    const changePageNext = (e) => {
        let paginationData = {
            currentPage: currentPage == totalPages? currentPage: currentPage+1
        }
        dispatch(SET_CURRENTPAGE(paginationData))
    }

    


    return (
        <ul className={styles.pagination}>
            <li onClick={ChangePagePrev}
            className={currentPage === 1 ? `${styles.hidden}` : null}
            >
                Prev
            </li>
            {
                PageNumbers.map(page =>
                    <li key={page}
                    onClick={()=>changePageByNumber(page)}
                     className={currentPage === page ? `${styles.active}` : null}
                    >
                        {page}
                    </li>
                )
            }



            <li
            onClick={changePageNext}
            className={currentPage === totalPages ? `${styles.hidden}` : null}
            >
                Next
            </li>

            <p>
                <b className={styles.page}>{`page ${currentPage}`}</b>
                <span>{` of `}</span>
                <b>{totalPages}</b>
            </p>
        </ul >
    );
};

export default Pagination;