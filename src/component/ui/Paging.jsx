import React from "react";
import '../../styles/Paging.css'
import Pagination from "react-js-pagination";

const Paging = ({page,count,setPage}) => {

    return (
        <div>
        <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={setPage}
        />
        </div>
    );
}

export default Paging;
