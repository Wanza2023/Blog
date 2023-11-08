function Pagination({total, limit, page, setPage}){
    const numPages = Math.ceil(total / limit);

    return(
        <>
            <button className="pagination" onClick={() => setPage(page + 1)} disabled={page === numPages}>
                <span>더보기</span>
            </button>
            {Array(numPages)
            .fill().map((_, i) => (
                <button className="pagination" key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i+1 ? "page" : undefined}>
                    <span>{i + 1}</span>
                </button>
            ))}
            <button className="pagination" onClick={() => setPage(page + 1)} disabled={page === numPages}>
                <span>다음</span>
            </button>
        </>
    )
}

export default Pagination;