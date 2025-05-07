// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-04-29
// @description  try to take over the world!
// @author       You
// @match        https://rozmusic.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rozmusic.com
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js
// ==/UserScript==

(function () {
  "use strict";

  GM_addStyle(`
    @import url("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css");
    `);

  $(document).ready(function () {
    // resize the main container
    $("main>.container , header>.container").css({
      maxWidth: "1440px",
    });

    //change the hader element order
    $("header>.container>.row")
      .css({ flexDirection: "row-reverse", marginBottom:"25px", })
      .children()
      .css({ order: "0" })
      .find(".search")
      .parent()
      .css({ order: "-1" });

    // change to vertical in main columns
    $("main>.container>.row")
      .css({
        flexDirection: "column-reverse",
      })
      .children()
      .css({
        width: "100%",
        maxWidth: "100%",
      })
      .last()
      .each(function () {
        $(this).css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        });
        const banner = $("main>.container>.row").find(".rel");
        banner.css({
          width: "100%",
          padding: "12px",
          borderRadius: "3px",
          color: "#fff",
          backgroundColor: "#111",
        });

        $(this).append(banner);
      })
      .find(".list")
      .css({
        display: "flex",
        flexFlow: "row now-wrap",
        alignItems: "center",
        justifyContent: "start",
        gap: "24px",
        backgroundColor: "transparent",
        padding: "0",
      });

    //change div tag to select tag (.daste)
    $("main>.container>.row")
      .find(".daste")
      .children(".title")
      .each(function () {
        const originalDaste = $(this);

        const selectTag = $("<select>").css({
          width: "200px",
          backgroundColor: "transparent",
          border: "1px solid #111",
          outline: "none",
          borderRadius: "3px",
          color: "#8b8b8b",
          padding: "12px",
        });

        originalDaste.replaceWith(selectTag);
      });

    //delete ul tag and append option to select tag (.daste)
    $("main>.container>.row")
      .find(".daste ul")
      .each(function () {
        const selectTag = $(this).siblings("select");

        const firstOption = $("<option>").text("دسته بندی مطالب").val("");
        selectTag.prepend(firstOption);

        $(this)
          .children("li")
          .each(function (index) {
            const values = ["music", "album", "music-video", "madahi"];

            const option = $("<option>")
              .text($(this).text())
              .val(values[index]);

            selectTag.append(option);
          });

        $(selectTag).on("click", "option", function () {
          location.assign(`https://rozmusic.com/${$(this).val()}`);
        });

        $(this).remove();
      });

    //change div tag to select tag (.archive)
    $("main>.container>.row")
      .find(".archive>div")
      .each(function () {
        const originalArchive = $(this);

        const selectTag = $("<select>").css({
          width: "200px",
          backgroundColor: "transparent",
          border: "1px solid #111",
          outline: "none",
          borderRadius: "3px",
          color: "#8b8b8b",
          padding: "12px",
        });

        originalArchive.replaceWith(selectTag);
      });

    //delete ul tag and append option to select tag (.archive)
    $("main>.container>.row")
      .find(".archive .artists")
      .each(function () {
        const selectTag = $(this).siblings("select");

        const firstOption = $("<option>").text("خوانندگان").val("");
        selectTag.prepend(firstOption);

        $(this)
          .children("li")
          .each(function () {
            const optionTag = $("<option>")
              .text($(this).text())
              .val($(this).text().split(" ").join("-"));
            selectTag.append(optionTag);
          });

        $(selectTag).on("click", "option", function () {
          location.assign(`https://rozmusic.com/tag/${$(this).val()}`);
        });

        $(this).remove();
      });

      // add gap to main container row: first child
      $("main>.container>.row").children().first().css({
          display:"flex",
          flexDirection:"column",
          gap:"10px",
      })

    //change banner style
    $("main>.container>.row")
      .find(".top_content")
      .css({
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        margin: "0",
      })
      .children()
      .first()
      .css({
        width: "100%",
        height: "46px",
        textAlign: "center",
        background: "none",
        backgroundColor: "#dddddd",
        color: "#111",
      })
      .find("span, a")
      .css({
        color: "#111",
        fontWeight: "300",
        fontSize: "14px",
      });

    // change banner (large_title, namad) style
    $("main>.container>.row")
      .find(".top_content")
      .children()
      .last()
      .each(function () {
        $(this).remove();

        const newEl = $("<div>")
          .text(
            "این سایت در ستاد ساماندهی ثبت شده و طبق قوانین جمهوری اسلامی میباشد"
          )
          .css({
            width: "100%",
            height: "46px",
            backgroundColor: "#dddddd",
            color: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "300",
          });

        const container = $("main>.container>.row")
          .find(".top_content")
          .append(newEl);
      });

    // change special post card size
    $("main>.container>.row")
      .find(".posts.special")
      .css({
        margin: "0",
        position: "relative",
        width: "100%",
        height: "305px",
      })
      .children(".row")
      .children()
      .css({
        maxWidth: "100%",
      });

    //add swiper in special post container
    $("main>.container>.row")
      .find(".posts.special")
      .children(".row")
      .css({
        width: "100vw",
        backgroundColor: "#111",
        margin: "0 auto",
        position: "absolute",
        top: "0",
        right: "calc(50% - 50vw)",
      })
      .each(function () {
        const cards = $(this).children().toArray();

        const swiperJsx = `
            <div id="main-slider" class="swiper">
                <div class="swiper-wrapper">
                    ${cards
                      .map(
                        (item) =>
                          `<div class="swiper-slide">${item.outerHTML}</div>`
                      )
                      .join("")}
                </div>
            </div>
           `;

        $(this).html(swiperJsx);

        new Swiper(".swiper", {
          slidesPerView: "auto",
          spaceBetween: 20,
          loop: true,
          speed: 5000,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
          allowTouchMove: true,
          grabCursor: true,
          loopedSlides: 10,
        });

        $(this).children(".swiper").css({
          width: "100%",
          maxWidth: "1408px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px 0",
          borderRadius: "3px",
        });

        $(this)
          .children(".swiper")
          .find(".swiper-slide")
          .css({
            width: "230px",
            borderRadius: "3px",
            padding: "5px",
            color: "#fff",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            transition: " transform 0.3s",
          })
          .hover(
            function () {
              $(this).css({ transform: "scale(1.05)" });
            },
            function () {
              $(this).css({ transform: "scale(1)" });
            }
          );

        $(this).children(".swiper").find(".swiper-button-next").css({
          left: "-6px",
        });
        $(this).children(".swiper").find(".swiper-button-prev").css({
          right: "4px",
        });
      });

    // add special offer section to .post_content
    $(".post_content>.row").each(function () {
      const specialOfferContainer = $("<div>").attr("class", "col-12");

      const specialOfferContent = $(this).find(".fara-main").css({
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "15px",
        marginBottom:"20px",
      });
      $(specialOfferContent)
        .children()
        .first()
        .css({
          width: "150px",
          height: "150px",
        })
        .children("a")
        .css({
          width: "100%",
          height: "100%",
        })
        .children("img")
        .css({
          width: "100%",
          height: "100%",
        });

      GM_addStyle(`
              .fara-main:hover::before{
                  background-color: #feb603;
              }

              .fara-main::before{
                  top: auto;
                  background: #111;
                  height: 46px;
                  width: 180px;
                  right: -116px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  border-radius: 3px;
                  transition: all 0.3s ease;
              }
          `);

      specialOfferContainer.append(specialOfferContent);
      $(this).prepend(specialOfferContainer);
    });

    //change the .box_right style
    $(".box_right ").each(function () {
      $(this).css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        gap: "5px",
      });

      $(this).children("header").css({
        width: "100%",
        textAlign: "center",
        order: "1",
      });

      const contentContainer = $("<div>").css({
        width: "100%",
        order: "3",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
      });

      const musicCover = $(this).children(".text");
      const downloadBtn = $(this).children(".dl2");
      const musicPlayer = $(this).children("#musicplayer");

      contentContainer.append(musicCover, downloadBtn, musicPlayer);

      $(contentContainer)
        .children(".text")
        .children()
        .last()
        .css({
          width: "150px",
          order: "1",
        })
        .find("img")
        .css({
          borderRadius: "3px",
          width: "100%",
          height: "100%",
        });

      $(contentContainer)
        .children(".dl2")
        .css({
          margin: "0",
          order: "3",
        })
        .children("a")
        .css({
          width: "150px",
          padding: "6px 12px",
          background: "none",
          backgroundColor: "#fff",
          border: "1px solid #111",
          boxShadow: "none",
          color: "#111",
          borderRadius: "3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          margin: "0",
        })
        .hover(
          function () {
            $(this).css({ backgroundColor: "#feb603", color: "#fff" });
          },
          function () {
            $(this).css({ backgroundColor: "#fff", color: "#111" });
          }
        )
        .text("دانلود");

      GM_addStyle(`
              .box_right.post .title::before{
                  background: none;
                  background-color: #111 !important;
              }

              .dl2 > a::before{
                  display: none;
              }
          `);

      $(contentContainer).children("#musicplayer").css({
        width: "calc(100% - 330px)",
        height: "38px",
        borderRadius: "3px",
        margin: "0",
      });

      const contentTitle = $(contentContainer)
        .children(".text")
        .children()
        .not($(contentContainer).children(".text").children().last());
      const contentTitleContainer = $("<div>").css({
        width: "100%",
        order: "2",
      });
      contentTitleContainer.append(contentTitle);

      $(this)
        .children(".foot_post")
        .css({
          width: "100%",
          order: "4",
        })
        .children(".left")
        .css({
          margin: "0",
        })
        .children("a")
        .css({
          width: "150px",
          padding: "6px 12px",
          background: "none",
          backgroundColor: "#111",
          border: "1px solid #111",
          boxShadow: "none",
          color: "#fff",
          borderRadius: "3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          margin: "0",
        })
        .hover(
          function () {
            $(this).css({ backgroundColor: "#feb603" });
          },
          function () {
            $(this).css({ backgroundColor: "#111" });
          }
        )
        .text("ادامه مطلب");

      $(this).append(contentTitleContainer);
      $(this).append(contentContainer);
    });

    //change sidebar style
    $(".post_content>.row")
      .children()
      .last()
      .each(function () {
        $(this)
          .find(".gray")
          .css({
            backgroundColor: "#ddd",
          })
          .children(".title")
          .css({
            background: "none",
            backgroundColor: "#111",
            borderRadius: "3px",
            color: "#fff",
          });

        $(this)
          .find(".tab")
          .css({
            background: "none",
            backgroundColor: "#111",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            gap: "5px",
            padding: "0",
            paddingBottom: "15px",
          })
          .children(".title")
          .css({
            width: "fit-content",
            backgroundColor: "#fff",
            color: "#111",
            textAlign: "center",
            borderBottomLeftRadius: "3px",
            borderBottomRightRadius: "3px",
          });

        $(this)
          .find(".tab")
          .children("ul")
          .find("a")
          .css({
            backgroundColor: "#fff",
            color: "#111",
            transition: "all 0.3s ease",
          })
          .hover(
            function () {
              $(this).css({ backgroundColor: "#feb603", color: "#fff" });
            },
            function () {
              $(this).css({ backgroundColor: "#fff", color: "#111" });
            }
          );

        $(this)
          .find(".tab")
          .children("#week")
          .find("li")
          .css({
            width: "100%",
          })
          .find("a")
          .css({
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "8px",
            color: "#fff",
            transition: "all 0.3s ease",
          })
          .hover(
            function () {
              $(this).css({ color: "#feb603" });
              $(this)
                .children()
                .css({ backgroundColor: "#feb603", color: "#fff" });
            },
            function () {
              $(this).css({ color: "#fff" });
              $(this)
                .children()
                .css({ backgroundColor: "#fff", color: "#111" });
            }
          )
          .children("span")
          .css({
            background: "none",
            backgroundColor: "#fff",
            color: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          });
      });

    $("footer>.foot_head")
      .find("ul")
      .css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "5px",
      })
      .children("li")
      .children("a")
      .hover(
        function () {
          $(this).css({ color: "#feb603" });
        },
        function () {
          $(this).css({ color: "#fff" });
        }
      );
  });
})();
