import * as data from "./data.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = document.getElementById.bind(document);

let currentIndex = 0;
const voucherCarousel = $(".voucher-carousel");
const voucherCarouselDots = $(".voucher-dots");
renderVoucherCarousel();

function renderVoucherCarousel(){
    let html = "";
    data.Vouchers.forEach((voucher, index) => {
        html += `<div class="voucher-slide ${voucher.IsRedeemable === true ? " active" : "used" }"
                style="background-image: url('${voucher.Ref7 ? voucher.Ref7 :
                "./2106.jpg"}')"
                tabindex="${index}">
                <div class="voucher-overlay">
                    <h4 class="voucher-title">${voucher.VoucherTypeName}</h4>
                    <p class="voucher-description">${voucher.VoucherTypeDescription}</p>
                    <p class="voucher-value">🎁 <strong>${voucher.VoucherRedemptionValue}</strong></p>
                    <p class="voucher-expiry">⏰ ${voucher.ValidToParsed}</p>
    
                    <button class="btn btn-primary" onclick="() => UseVoucher(${voucher.VoucherNo})"
                        disabled="${voucher.IsRedeemable}">
                        ${voucher.IsRedeemable === true ? "✅ Gạch ngay" : "❌ Đã dùng"}
                    </button>
                </div>
            </div>`
    });
    voucherCarousel.innerHTML = html;

    let pageHtml = "";
    data.Vouchers.forEach((voucher, index) => {
        pageHtml += `<span class="dot ${index === currentIndex ? " active-dot" : "" }"
            dataindex="${index}" tabindex="${index}">
            </span>`
    });
    voucherCarouselDots.innerHTML = pageHtml;

    $(".left-arrow-container").addEventListener("click", function(){
        currentIndex -= 1;
        if(currentIndex < 0) {
            currentIndex = data.Vouchers.length -1
        };
        slidePrevious()
    })
    $(".right-arrow-container").addEventListener("click", function(){
        currentIndex += 1;
        if(currentIndex > data.Vouchers.length -1) {
            currentIndex = 0
        };
        slideNext()
    })

    let voucherCarouselContainer = $('.voucher-carousel')
    const pageList = $$('.dot')
    pageList.forEach(page => {
        page.addEventListener('click', function(e){
            $$('.dot').forEach(element => {
                element.classList.remove('active-dot')
                element.style.backgroundColor = '#ddd';
            });
            e.target.classList.add('active-dot')
            e.target.style.backgroundColor = '#aaa';
            voucherCarouselContainer.style.transform  = `translateX(-${page.tabIndex * 90}%)`;
        })
    })
}


function slidePrevious(){
    let voucherCarouselContainer = $('.voucher-carousel')
    let voucherCarouselList = $$('.voucher-slide')
    let activeSlide = $('.voucher-slide.active');
    let pageList = $$('.dot')
    let activePage = $('.dot.active-dot')
    if(activeSlide){
        removeActiveClass(pageList, voucherCarouselList);
        if(activeSlide.tabIndex === 0){
            slidePositionEnd(voucherCarouselList, voucherCarouselContainer, pageList, voucherCarouselList.length - 1)
        } else {
            slideActiveClass(activeSlide, voucherCarouselContainer, activePage, 'previous')
        }
    }
}

function slideNext(){
    let voucherCarouselContainer = $('.voucher-carousel')
    let voucherCarouselList = $$('.voucher-slide')
    let activeSlide = $('.voucher-slide.active');
    let pageList = $$('.dot')
    let activePage = $('.dot.active-dot')
    console.log(activeSlide)
    console.log(activePage)
    if(activeSlide){
        removeActiveClass(pageList, voucherCarouselList);
        if(activeSlide.tabIndex === voucherCarouselList.length - 1){
            slidePositionEnd(voucherCarouselList, voucherCarouselContainer, pageList, 0)
        } else {
            slideActiveClass(activeSlide, voucherCarouselContainer, activePage, 'next')
        }
    }
}

function removeActiveClass(pageList, imgList){
    pageList.forEach(element => {
        element.classList.remove('active')
        element.style.backgroundColor = '#ddd';
    });
    imgList.forEach(element => {
        element.classList.remove('active')
    });
}

function slideActiveClass(activeSlide, voucherCarouselContainer, activePage, status){
    let actionStatus = status === 'next' ?activeSlide.nextSibling : activeSlide.previousSibling;
    let pageStatus = status === 'next' ?activePage.nextSibling : activePage.previousSibling

    actionStatus.classList.add('active');
    voucherCarouselContainer.style.transform  = `translateX(-${(actionStatus.tabIndex) * 90}%)`
    pageStatus.classList.add('active')
    pageStatus.style.backgroundColor = '#aaa';
}

function slidePositionEnd(voucherCarouselList, voucherCarouselContainer, pageList, index){
    voucherCarouselList[index].classList.add('active');
    voucherCarouselContainer.style.transform  = index === 0
        ? `translateX(${index})`
        : `translateX(-${(voucherCarouselList.length - 1) * 90}%)`;

    pageList[index].classList.add('active')
    pageList[index].style.backgroundColor = '#aaa';
}