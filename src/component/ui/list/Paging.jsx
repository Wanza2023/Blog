import React from "react";
import '../../../styles/component/Paging.css'
import Pagination from "react-js-pagination";

const Paging = ({page,count,setPage}) => {

    return (
        <div>
        <Pagination
            activePage={page} // 현재 페이지 번호
            itemsCountPerPage={5} // 한 페이지에 5개씩
            totalItemsCount={count} // 전체
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={setPage}
        />
        </div>
    );
}

export default Paging;
