$(function(){

    let offset = {

        init: function(){

            this.cloneOfferAsACart();
            this.eventListeners();

            if(sessionStorage.getItem("offerInfo") !== null){
                
                let response = JSON.parse(sessionStorage.getItem("offerInfo"));
                let firstItem = 0;
                let counter = 0;

                for (const key in response) {
                    
                    if(firstItem == 0){
                        
                        $("#header .header-middle-right .header-offer-basket .offset-content").html(this.addItemToEmptyBasketWithSession(response[key], key));
                        if($("#header .header-middle-right .header-offer-basket .offset-content .cart-header-note").length == 0){

                            $("#header .header-middle-right .header-offer-basket .offset-content .cart-content-title").after(`
                                <div class="cart-content-subtitle cart-header-note text-center">
                                    <small>
                                        Teklif sepetine eklediğiniz ürünler için fiyat teklifi talebinde bulunabilirsiniz.
                                    </small>
                                </div>
                            `);
                            
                        }
                        firstItem++;

                    }
                    else{

                        $("#header .header-middle-right .header-offer-basket .offset-content .cart-list").append(this.addItemWithSession(response[key], key));

                    }

                    counter++;

                }
                
                // for (let index = 0; index < response.length; index++) {

                //     if(response[index] !== null && firstItem == 0){

                //         $("#header .header-middle-right .header-offer-basket .offset-content").html(this.addItemToEmptyBasketWithSession(response[index], index));
                //         firstItem++;

                //     }
                //     else if(response[index] !== null){

                //         $("#header .header-middle-right .header-offer-basket .offset-content .cart-list").append(this.addItemWithSession(response[index], index));

                //     }
                    
                // }

            }

        },

        cloneOfferAsACart: function(){

            // $("#header .header-user-cart").append(`<div class="offset-menu"></div>`);

            // $("#header .header-user-cart .offset-menu").append(`
            //     <a href="javascript:void(0);" aria-label="Offset" class="openbox" data-target="offset-content" data-mode="custom" data-overlay="inside">
            //         <div class="cart-amount">0</div>
            //         <div class="cart-menu-img">
            //             <i><img src="//st1.myideasoft.com/idea/gx/17/themes/selftpl_604b170de8639/assets/images/icon-cart.svg?revision=7.1.2.0-1615539383" alt=""></i>
            //         </div>
            //         <div class="cart-menu-box">
            //             <div>Teklif</div>
            //             <span>0,00 TL</span>
            //         </div>
            //     </a>
            // `);

            $("#header .header-middle-right .header-offer-basket a").attr("href", "javascript:void(0)").attr("data-target", "offset-content").attr("data-overlay", "inside").addClass("openbox")

            $("#header .header-middle-right .header-offer-basket").append(`
                <div class="offset-content openbox-content" data-selector="offset-content">
                    <div class="cart-content-empty">
                        <div class="cart-content-title">TEKLİF SEPETİ</div>
                        <div class="cart-content-subtitle">Sepetiniz boş</div>
                        <div class="cart-content-subtitle text-center">
                            <small>
                                Teklif sepetine eklediğiniz ürünler için fiyat teklifi talebinde bulunabilirsiniz.
                            </small>
                        </div>
                        <div class="cart-content-empty-icon">
                            <img src="***/images/laborteknik-logo.png">
                        </div>
                        <div class="cart-content-button">
                            <a href="javascript:void(0);" class="btn btn-primary btn-block" data-selector="openbox-close" style="background:#BDBDBD;">ALIŞVERİŞE BAŞLA</a>
                        </div>
                        
                            <div class="cart-content-button mt-4">
                                <a href="javascript:void(0)" class="btn btn-primary btn-block" style="background:#00674C;">TEKLİF İSTE</a>
                            </div>
							
						<div class="cart-content-subtitle">Aradığınız ürünü bulamadınız mı?</div>
                        <div class="cart-content-subtitle text-center">
                            <div class="row">
                                <small>
                                    Teklif İste butonuna tıklayarak talep ettiğiniz ürünleri yazılı olarak da belirtebilirsiniz.
                                </small>
                            </div>
                            <div class="row">
                                <small>
                                    Deneyimli satış ekibimiz ihtiyaçlarınız doğrultusunda sizi yönlendirecektir.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $("#header .header-middle-right .header-offer-basket").append(`<div class="openbox-overlay offset-content-overlay" style="display: none;"></div>`);

        },

        addItem: function(price, quantity){

            return $(`<div class="cart-list-item">
                <div class="cart-list-item-image">
                    <img src="${product["image"]}">
                </div>
                <div class="cart-list-item-content">
                    <a class="cart-list-item-title" href="${window.location.href.substring(window.location.href.indexOf("/urun"), window.location.href.length)}">${product["name"]}</a>
                    <a class="cart-list-item-brand" href="${product["slug2"]}">${product["brand"]}</a>
                    <div class="cart-list-item-price">
                        <span class="cart-list-item-amount">${quantity} Adet</span><span class="cart-list-item-price2 d-none>"${this.number_format(price, "2", ",", ".")} TL</span>
                    </div>
                    <span class="cart-list-item-sku d-none">${product["sku"]}</span>
                </div>
                <a href="javascript:void(0);" class="cart-list-item-delete" target-id=${product["id"]}>
                    <i class="far fa-trash-alt"></i>
                </a>
            </div>`);

        },

        addItemToEmptyBasket: function(price, quantity){

            return  $(`<div class="cart-content-title">TEKLİF SEPETİ</div>
                    <div class="cart-content-subtitle"></div>
                    <div class="cart-list">
                        <div class="cart-list-item">
                            <div class="cart-list-item-image">
                                <img src="${product["image"]}">
                            </div>
                            <div class="cart-list-item-content">
                                <a class="cart-list-item-title" href="${window.location.href.substring(window.location.href.indexOf("/urun"), window.location.href.length)}">${product["name"]}</a>
                                <a class="cart-list-item-brand" href="${product["slug2"]}">${product["brand"]}</a>
                                <div class="cart-list-item-price">
                                    <span class="cart-list-item-amount">${quantity} Adet</span><span class="cart-list-item-price2 d-none">${this.number_format(price, "2", ",", ".")} TL</span>
                                </div>
                                <span class="cart-list-item-sku d-none">${product["sku"]}</span>
                            </div>
                            <a href="javascript:void(0);" class="cart-list-item-delete" target-id="${product["id"]}">
                                <i class="far fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="cart-content-total-price d-none">
                    <span>Sepet Toplamı</span>
                    <div>1.500,00 TL</div>
                </div>
                <div class="cart-content-button">
                    <a href="javascript:void(0)" class="btn btn-primary btn-block" style="background:#00674C;">TEKLİF İSTE</a>
                </div>
                <div class="cart-content-button">
                    <a href="javascript:void(0);" class="btn btn-block btn-secondary" data-selector="openbox-close">ALIŞVERİŞE DEVAM ET</a>
                </div>`);

        },

        addItemWithSession: function(response, index){

            return $(`<div class="cart-list-item">
                <div class="cart-list-item-image">
                    <img src="${response["image"]}">
                </div>
                <div class="cart-list-item-content">
                    <a class="cart-list-item-title" href="${response["slug"]}">${response["name"]}</a>
                    <a class="cart-list-item-brand" href="${response["slug2"]}">${response["brand"]}</a>
                    <div class="cart-list-item-price">
                        <span class="cart-list-item-amount">${response["quantity"]} Adet</span><span class="cart-list-item-price2 d-none">${this.number_format(response["price"], "2", ",", ".")} TL</span>
                    </div>
                    <span class="cart-list-item-sku d-none">${response["sku"]}</span>
                </div>
                <a href="javascript:void(0);" class="cart-list-item-delete" target-id="${index}">
                    <i class="far fa-trash-alt"></i>
                </a>
            </div>`);

        },

        addItemToEmptyBasketWithSession: function(response, index){

            return  $(`<div class="cart-content-title">TEKLİF SEPETİ</div>
                    <div class="cart-content-subtitle"></div>
                    <div class="cart-list">
                        <div class="cart-list-item">
                            <div class="cart-list-item-image">
                                <img src="${response["image"]}">
                            </div>
                            <div class="cart-list-item-content">
                                <a class="cart-list-item-title" href="${response["slug"]}">${response["name"]}</a>
                                <a class="cart-list-item-brand" href="${response["slug2"]}">${response["brand"]}</a>
                                <div class="cart-list-item-price">
                                    <span class="cart-list-item-amount">${response["quantity"]} Adet</span><span class="cart-list-item-price2 d-none">${this.number_format(response["price"], "2", ",", ".")} TL</span>
                                </div>
                                <span class="cart-list-item-sku d-none">${response["sku"]}</span>
                            </div>
                            <a href="javascript:void(0);" class="cart-list-item-delete" target-id=${index}>
                                <i class="far fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="cart-content-total-price d-none">
                    <span>Sepet Toplamı</span>
                    <div>1.500,00 TL</div>
                </div>
                <div class="cart-content-button">
                    <a href="javascript:void(0)" class="btn btn-primary btn-block" style="background:#00674C;">TEKLİF İSTE</a>
                </div>
                <div class="cart-content-button">
                    <a href="javascript:void(0);" class="btn btn-block btn-secondary" data-selector="openbox-close">ALIŞVERİŞE DEVAM ET</a>
                </div>`);

        },

        updateItem: function(targetItem, price, quantity){

            let targetQuantity = targetItem.find(".cart-list-item-content .cart-list-item-price .cart-list-item-amount").text().replace(" Adet", "");
            targetQuantity = parseInt(targetQuantity);
            targetQuantity += quantity;
            
            targetItem.find(".cart-list-item-content .cart-list-item-price").html(`
                <span class="cart-list-item-amount">${targetQuantity} Adet</span><span class="cart-list-item-price2 d-none">${this.number_format((targetQuantity * price), "2", ",", ".")} TL</span>
            `);

        },

        eventListeners: function(){

            let self = this;
            let treeChanged = false;
            let offerBasket;

            if(sessionStorage.getItem("offerInfo") !== null){

                let response = JSON.parse(sessionStorage.getItem("offerInfo"));
                offerBasket = response;

            }
            else{

                offerBasket = {};

            }

            let updateSessionStorage = function(){

                $("#header .header-middle-right .header-offer-basket .cart-list .cart-list-item").each(function(){

                    offerBasket[product["id"]] = {};

                    offerBasket[product["id"]]["image"] = $(this).find(".cart-list-item-image img").attr("src");
                    offerBasket[product["id"]]["slug"] = $(this).find(".cart-list-item-title").attr("href");
                    offerBasket[product["id"]]["name"] = $(this).find(".cart-list-item-title").text();
                    offerBasket[product["id"]]["slug2"] = $(this).find(".cart-list-item-brand").attr("href");
                    offerBasket[product["id"]]["brand"] = $(this).find(".cart-list-item-brand").text();
                    offerBasket[product["id"]]["quantity"] = $(this).find(".cart-list-item-amount").text().replace(" Adet", "");
                    offerBasket[product["id"]]["price"] = $(this).find(".cart-list-item-price .cart-list-item-price2").text().replace(" TL", "").replace(".", "").replace(",", ".").trim();
                    offerBasket[product["id"]]["sku"] = $(this).find(".cart-list-item-sku").text();

                });

                sessionStorage.setItem("offerInfo", JSON.stringify(offerBasket));

            }

            $(document).on("click", ".product-right .product-cart-buttons .offer-basket-button", function(){

                let quantity = $(this).parents(".product-cart-buttons").find("input[data-selector='qty']").val();
                let price = parseFloat(product["price"].replace(".", "").replace(",", "."));
                let tax = parseFloat(((price * product["tax"]) / 100).toFixed(2));
                price = price + tax;

                if(typeof quantity === "undefined"){
                    
                    quantity = 1;

                }

                if($("#header .header-middle-right .header-offer-basket").find(".cart-content-empty").length > 0){

                    $("#header .header-middle-right .header-offer-basket .offset-content").html(self.addItemToEmptyBasket(parseInt(quantity) * price, quantity));

                    if($("#header .header-middle-right .header-offer-basket .offset-content .cart-header-note").length == 0){

                        $("#header .header-middle-right .header-offer-basket .offset-content .cart-content-title").after(`
                            <div class="cart-content-subtitle cart-header-note text-center">
                                <small>
                                    Teklif sepetine eklediğiniz ürünler için fiyat teklifi talebinde bulunabilirsiniz.
                                </small>
                            </div>
                        `);

                    }
    
                }
                else{

                    let is = false;
                    let targetItem;

                    $("#header .header-middle-right .header-offer-basket .offset-content .cart-list .cart-list-item").each(function(){

                        if($(this).find(".cart-list-item-content .cart-list-item-title").text() == product["name"]){

                            is = true;
                            targetItem = $(this);
                        }

                    });

                    if(!is){
                        
                        $("#header .header-middle-right .header-offer-basket .offset-content .cart-list").append(self.addItem(parseInt(quantity) * price, quantity));
                        if($("#header .header-middle-right .header-offer-basket .offset-content .cart-header-note").length == 0){

                            $("#header .header-middle-right .header-offer-basket .offset-content .cart-content-title").after(`
                                <div class="cart-content-subtitle cart-header-note text-center">
                                    <small>
                                        Teklif sepetine eklediğiniz ürünler için fiyat teklifi talebinde bulunabilirsiniz.
                                    </small>
                                </div>
                            `);
                            
                        }

                    }
                    else{

                        self.updateItem(targetItem, price, parseInt(quantity));

                    }

                }

                updateSessionStorage();

                $("body").append(`<div class="shopping-information-cart">
                    <div class="shopping-information-cart-inside">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/>
                            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>TEKLİF SEPETİNİZE EKLENMİŞTİR
                    </div>
                </div>`);

                setTimeout(function(){

                    $(document).find(".shopping-information-cart").remove();

                }, 1500);

            });

            // $(document).on("DOMSubtreeModified", function(){

            //     let interval = setInterval(function(){
            
            //         if($(".product-right .product-cart-buttons .product-buttons-row div").find(".add-to-offer-button").length == 0){
        
            //             $(".product-right .product-cart-buttons .product-buttons-row div").append($(`<a href="javascript:void(0);" class="add-to-offer-button ml-2 w-50" data-context="offer">Teklif Sepetine Ekle</a>`));
        
            //         }else{
        
            //             clearInterval(interval);
        
            //         }
        
            //     }, 250);

            // });

            $(document).on("DOMSubtreeModified", "#header .header-middle-right .header-offer-basket .offset-content", function(){

                if($(this).find(".cart-list").length !== 0 && !treeChanged){

                    let self2 = self;
                    let self3 = $(this);
                    let total = 0;
                    let counter = 0;
                    
                    treeChanged = true;

                    setTimeout(function(){
                        
                        if(self3.find(".cart-list").length > 0){

                            self3.find(".cart-list-item").each(function(){

                                total += parseFloat($(this).find(".cart-list-item-price .cart-list-item-price2").text().replace(" TL", "").replace(".", "").replace(",", ".").trim());
                                counter += parseInt($(this).find(".cart-list-item-amount").text().replace(" Adet", ""));
    
                            });
                            
                            self3.find(".cart-content-total-price d-none div").text(self2.number_format(total, "2", ",", ".") + " TL");
                            $("#header .header-user-cart .offset-menu .offset-content .cart-content-subtitle").text("Sepetinizde " + counter.toString() + " ürün var.");

                        }

                        $("#header .header-user-cart .offset-menu").find("a[data-target = 'offset-content'] .cart-amount").text(counter.toString());
                        // $("#header .header-user-cart .offset-menu").find("a[data-target = 'offset-content'] .cart-menu-box span").text(self2.number_format(total, "2", ",", ".") + " TL");

                        treeChanged = false;

                    }, 1500);

                }

            });

            $(document).on("click", "#header .header-middle-right .header-offer-basket .offset-content .cart-list .cart-list-item-delete", function(){

                let itemQuantity = parseInt($(this).parents(".cart-list-item").find(".cart-list-item-amount").text().replace(" Adet", ""));
                let itemLenght = $(this).parents(".cart-list").find(".cart-list-item").length;

                if(itemQuantity == 1){
                    
                    $(this).parents(".cart-list-item").remove();

                    if(itemLenght == 1){

                        sessionStorage.removeItem("offerInfo");

                        $("#header .header-middle-right .header-offer-basket .offset-content").html($(`<div class="cart-content-empty">
                            <div class="cart-content-title">TEKLİF SEPETİ</div>
                            <div class="cart-content-subtitle">Sepetiniz boş</div>
                            <div class="cart-content-subtitle text-center">
                                <small>
                                    Teklif sepetine eklediğiniz ürünler için fiyat teklifi talebinde bulunabilirsiniz.
                                </small>
                            </div>
                            <div class="cart-content-empty-icon">
                                <img src="***/images/laborteknik-logo.png">
                            </div>
                            <div class="cart-content-button">
                                <a href="javascript:void(0);" class="btn btn-block btn-secondary" data-selector="openbox-close">ALIŞVERİŞE BAŞLA</a>
                            </div>
                            
                                <div class="cart-content-button mt-4">
                                    <a href="javascript:void(0)" class="btn btn-primary btn-block" style="background:#00674C;">TEKLİF İSTE</a>
                                </div>

						<div class="cart-content-subtitle">Aradığınız ürünü bulamadınız mı?</div>
                            <div class="cart-content-subtitle text-center">
                                <div class="row">
                                    <small>
                                        Teklif İste butonuna tıklayarak talep ettiğiniz ürünleri yazılı olarak da belirtebilirsiniz.
                                    </small>
                                </div>
                                <div class="row">
                                    <small>
                                        Deneyimli satış ekibimiz ihtiyaçlarınız doğrultusunda sizi yönlendirecektir.
                                    </small>
                                </div>
                            </div>
                        </div>`));

                    }
                    else{

                        for (const key in offerBasket) {

                            if(key == $(this).attr("target-id")){

                                delete offerBasket[key];

                            }

                        }
                        
                        sessionStorage.setItem("offerInfo", JSON.stringify(offerBasket));

                    }

                    $("body").append(`<div class="shopping-information-cart">
                        <div class="shopping-information-cart-inside">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/>
                                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>TEKLİF SEPETİNİZDEN KALDIRILMIŞTIR
                        </div>
                    </div>`);

                    setTimeout(function(){

                        $(document).find(".shopping-information-cart").remove();

                    }, 1500);

                }
                else{

                    let self2 = $(this).parents(".cart-list-item");
                    let price = self2.find(".cart-list-item-price .cart-list-item-price2").text().replace(" TL", "").replace(".", "").replace(",", ".").trim();
                    let price2 = price / itemQuantity;
                    itemQuantity--;
                    self2.find(".cart-list-item-price").html("<span class='cart-list-item-amount'>" + itemQuantity + " Adet</span><span class='cart-list-item-price2 d-none'>" + self.number_format(price - price2, "2", ",", ".") + " TL</span>");

                        offerBasket[$(this).attr("target-id")]["image"] = self2.find(".cart-list-item-image img").attr("src");
                        offerBasket[$(this).attr("target-id")]["slug"] = self2.find(".cart-list-item-title").attr("href");
                        offerBasket[$(this).attr("target-id")]["name"] = self2.find(".cart-list-item-title").text();
                        offerBasket[$(this).attr("target-id")]["slug2"] = self2.find(".cart-list-item-brand").attr("href");
                        offerBasket[$(this).attr("target-id")]["brand"] = self2.find(".cart-list-item-brand").text();
                        offerBasket[$(this).attr("target-id")]["quantity"] = self2.find(".cart-list-item-amount").text().replace(" Adet", "");
                        offerBasket[$(this).attr("target-id")]["price"] = self2.find(".cart-list-item-price .cart-list-item-price2").text().replace(" TL", "").replace(".", "").replace(",", ".").trim();
                        offerBasket[$(this).attr("target-id")]["sku"] = self2.find(".cart-list-item-sku").text();

                        sessionStorage.setItem("offerInfo", JSON.stringify(offerBasket));

                    $("body").append(`<div class="shopping-information-cart">
                        <div class="shopping-information-cart-inside">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/>
                                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>TEKLİF SEPETİNİZDEN KALDIRILMIŞTIR
                        </div>
                    </div>`);

                    setTimeout(function(){

                        $(document).find(".shopping-information-cart").remove();

                    }, 1500);

                }

            });

            $(document).on("click", "#header .header-middle-right .header-offer-basket .offset-content .cart-content-button a:contains('TEKLİF İSTE')", function(){

                let self2 = self;

                let formHTML = $(`<div class="form-group">
                    <label>Firma Ünvanınız</label><input type="text" placeholder="Firma Ünvanınız" class="large _typeInput" id="firm">
                </div>
				<div class="form-group">
				<label>Vergi Numaranız</label><input type="text" placeholder="Vergi Numaranız" class="large _typeInput" id="tax_number">
                </div>
                <div class="form-group">
                    <label>İsim Soyisim</label><input type="text" placeholder="İsim Soyisim" value="${(typeof visitorInfo !== "undefined" && (visitorInfo["firstname"] !== "" && visitorInfo["surname"] !== "")) ? visitorInfo["firstname"] + " " + visitorInfo["surname"] : ""}" class="large _typeInput" id="name">
                </div>
                <div class="form-group">
                    <label>E-mail Adresi</label><input placeholder="E-mail Adresi" type="email" value="${(typeof visitorInfo !== "undefined" && visitorInfo["email"] !== "") ? visitorInfo["email"] : ""}" class="large _typeInput" id="email">
                </div>
                <div class="form-group">
                    <label>Telefon Numarası</label><input placeholder="Telefon Numarası" type="tel" class="large _typeInput" id="phone">
                </div>
                <div class="form-group">
                    <label>Para Birimi</label>
                    <select class="large _typeInput" id="currency">
                        <option value="TL">Türk Lirası</option>
                        <option value="doviz">Döviz</option>
                    </select>
                </div>
				<div class="form-group">
                    <label>Talep Ettiğiniz Diğer Ürünler</label><textarea placeholder="Talep ettiğiniz diğer ürünleri bu alanda belirtebilirsiniz." class="form-group" id="other_products"></textarea>
                    <label>(0/255)</label>
                </div>
                <div class="form-group">
                    <label>Not</label><textarea placeholder="Bize iletmek istediğiniz durumu buraya girebilirsiniz." class="form-group" id="note"></textarea>
                    <label>(0/255)</label>
                </div>
                <div class="container">
                    <div class="row">
                        <small class="text-muted">Talepleriniz peşin ödeme koşullarına göre fiyatlandırılacaktır.</small>
                    </div>
                    <div class="row">
                        <small class="text-muted">Farklı doğrultudaki talepleriniz için lütfen bizimle iletişime geçin.</small>
                    </div>
                </div>
                `);

                if($("body").hasClass("offset-content-active") !== false){
                    $("body").removeClass("offset-content-active");
                }

                Swal.fire({
                    title: 'Teklif Talep Formu',
                    html: formHTML,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showCancelButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Teklif İste',
                    cancelButtonText: 'Vazgeç',
                    reverseButtons: true,
                    willOpen: () => {
                        $(".swal2-popup .swal2-actions").addClass("form-offer");
                        $(".swal2-popup .swal2-actions .swal2-confirm").addClass("swal2-form-confirm");
                        $(".swal2-popup .swal2-actions .swal2-cancel").addClass("swal2-form-cancel");
                    }
                }).then(function(result){

                    if (result.isConfirmed) {

                        let info = {};
                        info["cart"] = {};

                        info["email"] = (typeof visitorInfo !== "undefined" && visitorInfo["email"] !== "") ? visitorInfo["email"] : $(".swal2-popup #email").val();
                        info["name"] = (typeof visitorInfo !== "undefined" && (visitorInfo["firstname"] !== "" && visitorInfo["surname"] !== "")) ? visitorInfo["firstname"] + " " + visitorInfo["surname"] : $(".swal2-popup #name").val();
                        info["firm"] = $(".swal2-popup #firm").val();
                        info["tax_number"] = $(".swal2-popup #tax_number").val();
                        info["phone"] = $(".swal2-popup #phone").val();
                        info["other_products"] = $(".swal2-popup #other_products").val();
                        info["note"] = $(".swal2-popup #note").val();
                        info["currency"] = $(".swal2-popup #currency").val();

                        if(!self2.emailIsValid(info["email"])) {
                            Swal.fire({title: "Bilgilendirme", text: "Lütfen geçerli bir e-mail adresi giriniz.", icon: "info", confirmButtonText: "Tamam"});
                            return false;
                        }
                        
                        if(info["name"].trim().length == 0) {
                            Swal.fire({title: "Bilgilendirme", text: "Lütfen adınızı / soyadınızı giriniz.", icon: "info", confirmButtonText: "Tamam"});
                            return false;
                        }

                        if(info["phone"].trim().length == 0){
                            Swal.fire({title: "Bilgilendirme", text: "Lütfen telefon numaranızı giriniz.", icon: "info", confirmButtonText: "Tamam"});
                            return false;
                        }
    
                        if(info["firm"].trim().length == 0) {
                            Swal.fire({title: "Bilgilendirme", text: "Lütfen firma adınızı giriniz.", icon: "info", confirmButtonText: "Tamam"});
                            return false;
                        }
    
                        if(info["note"].trim().length == 0) {
                            info["note"] = "İletilmesi istenen bir not bulunmamaktadır.";
                        }

                        $("#header .header-middle-right .header-offer-basket .offset-content[data-selector='offset-content']").find(".cart-list .cart-list-item").each(function(){

                            var product2 = {};
                            product2["name"] = $(this).find(".cart-list-item-title").text().trim();
                            product2["quantity"] = $(this).find(".cart-list-item-amount").text().replace(" Adet", "").trim();
                            product2["price"] = $(this).find(".cart-list-item-price .cart-list-item-price2").text().replace(" TL", "").replace(".", "").replace(",", ".").trim();
                            product2["tax"] = product["tax"];
                            product2["sku"] = $(this).find(".cart-list-item-sku").text().trim();


                            info["cart"][Object.keys(info["cart"]).length] = product2;

                        });

                        Swal.fire({
                            title: 'Talebiniz oluşturuluyor...',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            willOpen: () => {
                                Swal.showLoading();
                            },
                            showConfirmButton: false,
                            showCancelButton: false,
                            showDenyButton: false
                        });

                        $.ajax({
                            type: "GET",
                            url: "***/pdfgenerator",
                            data: "info=" + JSON.stringify(info),
                            success: function(response){
                                
                                if(response == 1) {

                                    Swal.fire({
                                        title: "Tebrikler!",
                                        text:"Talebiniz oluşturuldu. Lütfen e-posta kutunuzu kontrol ediniz.",
                                        icon: "success", confirmButtonText: "Tamam"
                                    });
                                        
                                }
                                else {
                                                        
                                    Swal.fire({
                                        title: "Hata Oluştu",
                                        text: "Lütfen tekrar deneyiniz.",
                                        icon: "error", confirmButtonText: "Tamam"
                                    });
                                
                                }
                                
                            }
                        });

                    }

                    $(".swal2-popup .swal2-actions").removeClass("form-offer");
                    $(".swal2-popup .swal2-actions .swal2-confirm").removeClass("swal2-form-confirm");
                    $(".swal2-popup .swal2-actions .swal2-cancel").removeClass("swal2-form-cancel");

                });

            });

            $(document).on("input", ".swal2-popup .swal2-content textarea", function(){

                let thisval = $(this).val();
                if(thisval.length > 255){
    
                    $(this).on("keypress", function(e){
    
                        e.preventDefault();
                        e.stopImmediatePropagation();
    
                    });
    
                    return false;
    
                }
    
                $(this).unbind("keypress");
                $(this).parent().find("label:eq(1)").text("(" + thisval.length + "/255)");
    
            });
    
            $(document).on("keydown", ".swal2-popup .swal2-content textarea", function(e){
    
                let thisval = $(this).val();
                if(thisval.length > 255){
    
                    e.preventDefault();
                    e.stopImmediatePropagation();
    
                }
    
            });
            
            $(document).on("keyup", ".swal2-popup .swal2-content textarea", function(){
    
                let thisval = $(this).val();
                if(thisval.length > 255){
    
                    let temp = thisval.length - 255;
                    $(this).val(thisval.substring(0, thisval.length - temp));
                    $(this).trigger("input");
    
                }
    
            });

        },

        number_format : function (number, decimals, dec_point, thousands_sep) {
            // Strip all characters but numerical ones.
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },

        emailIsValid: function (email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

    }

    $(document).ready(function(){

        // if(typeof visitorInfo !== "undefined" && visitorInfo["email"] !== ""){

            // $(".product-right .product-cart-buttons .product-buttons-row div").append($(`<a href="javascript:void(0);" class="add-to-offer-button ml-2 w-50" data-context="offer">Teklif Sepetine Ekle</a>`));
            offset.init();

        // }

    });

});
