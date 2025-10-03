import React, { useState, useEffect } from "react";
import "./News.scss";
import tt1 from "../../../../Assets/img/TT1.png";
import tt2 from "../../../../Assets/img/TT2.png";
import tt3 from "../../../../Assets/img/TT3.png";
import { FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Aos from "aos";
import "aos/dist/aos.css";
import { GoTriangleLeft } from "react-icons/go";
import { GoTriangleRight } from "react-icons/go";

const News = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const Data = [
    {
      id: 1,
      imgSrc: tt1,
      tieude: "Đi khắp mọi nơi1",
      ngaythem: "01/01/2024",
    },
    {
      id: 2,
      imgSrc: tt2,
      tieude: "Đi khắp mọi nơi2",
      ngaythem: "01/01/2024",
    },
    {
      id: 3,
      imgSrc: tt3,
      tieude: "Đi khắp mọi nơi3",
      ngaythem: "01/01/2024",
    },
    {
      id: 4,
      imgSrc: tt1,
      tieude: "Đi khắp mọi nơi4",
      ngaythem: "01/01/2024",
    },
    {
      id: 5,
      imgSrc: tt2,
      tieude: "Đi khắp mọi nơi5",
      ngaythem: "01/01/2024",
    },
    {
      id: 6,
      imgSrc: tt3,
      tieude: "Đi khắp mọi nơi6",
      ngaythem: "01/01/2024",
    },
    {
      id: 7,
      imgSrc: tt1,
      tieude: "Đi khắp mọi nơi7",
      ngaythem: "01/01/2024",
    },
    {
      id: 8,
      imgSrc: tt2,
      tieude: "Đi khắp mọi nơi8",
      ngaythem: "01/01/2024",
    },
    {
      id: 9,
      imgSrc: tt3,
      tieude: "Đi khắp mọi nơi9",
      ngaythem: "01/01/2024",
    },
    {
      id: 10,
      imgSrc: tt1,
      tieude: "Đi khắp mọi nơi10",
      ngaythem: "01/01/2024",
    },
    {
      id: 11,
      imgSrc: tt2,
      tieude: "Đi khắp mọi nơi11",
      ngaythem: "01/01/2024",
    },
    {
      id: 12,
      imgSrc: tt3,
      tieude: "Đi khắp mọi nơi12",
      ngaythem: "01/01/2024",
    },
    {
      id: 13,
      imgSrc: tt1,
      tieude: "Đi khắp mọi nơi13",
      ngaythem: "01/01/2024",
    },
    {
      id: 14,
      imgSrc: tt2,
      tieude: "Đi khắp mọi nơi14",
      ngaythem: "01/01/2024",
    },
    {
      id: 15,
      imgSrc: tt3,
      tieude: "Đi khắp mọi nơi15",
      ngaythem: "01/01/2024",
    },
    {
      id: 16,
      imgSrc: tt1,
      tieude: "Đi khắp mọi nơi16",
      ngaythem: "01/01/2024",
    },
    {
      id: 17,
      imgSrc: tt2,
      tieude: "Đi khắp mọi nơi17",
      ngaythem: "01/01/2024",
    },
    {
      id: 18,
      imgSrc: tt3,
      tieude: "Đi khắp mọi nơi18",
      ngaythem: "01/01/2024",
    },
  ];

  const firstSixItems = Data.slice(0, 6);

  // Giả sử data là props được truyền vào hoặc bạn có thể định nghĩa nó ở đây
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Tính toán số lượng items và pages
  const pageCount = Math.ceil(Data.length / itemsPerPage);

  // Hàm này được gọi mỗi khi người dùng thay đổi trang
  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  // Tính toán items cho trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentPageData = Data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <section className="main container section">
        <div className="line-container">
          <span className="text">Tin tức nổi bật</span>
          <div className="line"></div>
        </div>
        <div className="secContent grid">
          {firstSixItems.map(({ id, imgSrc, tieude, ngaythem }) => {
            return (
              <div key={id} data-aos="fade-up" className="singleNews">
                <div className="imageDiv">
                  <img src={imgSrc} alt={tieude} />
                </div>

                <div className="contentNews">
                  <p>{tieude}</p>
                  <div className="moreInfo flex">
                    <span>{ngaythem}</span>
                    <div className="viewDetail">
                      <span>Chi tiết</span>
                      <FaChevronRight className="icon" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="line-container">
          <span className="text">Tất cả tin</span>
          <div className="line"></div>
        </div>
        <div className="secContent grid">
          {currentPageData.map(({ id, imgSrc, tieude, ngaythem }) => {
            return (
              <div key={id} data-aos="fade-up" className="singleNews">
                <div className="imageDiv">
                  <img src={imgSrc} alt={tieude} />
                </div>

                <div className="contentNews">
                  <p>{tieude}</p>
                  <div className="moreInfo flex">
                    <span>{ngaythem}</span>
                    <div className="viewDetail">
                      <span>Chi tiết</span>
                      <FaChevronRight className="icon" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ReactPaginate
          className="pagination"
          previousLabel={<GoTriangleLeft className="icon_previous" />}
          nextLabel={<GoTriangleRight className="icon_next" />}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </section>
    </>
  );
};
export default News;
