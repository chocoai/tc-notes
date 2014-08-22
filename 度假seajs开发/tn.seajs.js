//seajs例子  摘自途牛详情页
seajs.config({
    base: "/site/js/sea-modules/",
    alias: {
        "zepto": "zepto/zepto.js",
        "manager": "manager/manager.js",
        "cookie": "cookie/cookie.js",
        "dialog": "dialog/dialog.js",
        "base-info": "base-info/base-info.js",
        "search-bar": "search-bar/search-bar.js",
        "tooltip": "tooltip/tooltip.js",
        "spinner": "spinner/spinner.js",
        "moment": "moment/moment.js",
        "calendar": "calendar/calendar.js",
        "input-focus": "input-focus/input-focus.js",
        "wx-share": "wx-share/wx-share.js",
        "download-open": "download-open/download-open.js",
        "map": "map/map.js",
        "template": "template/template.js",
        "do-error-action": "/site/js/business-modules/grab-cruise/do-error-action.js",
        "verify-set": 'set/verify-set.js'
    }
});;
seajs.use(['zepto', 'base-info', 'tooltip', 'spinner', 'dialog', 'calendar'], function($, BaseInfo, Tooltip, Spinner, Dialog, Calendar) {
    $(function($) {
        var productId = $('#productId').val();
        var isAjaxUrl = $('#isAjax').val();
        var rmAjaxUrl = $('#rmAjax').val();
        var addAjaxUrl = $('#addAjax').val();
        var collectIconEl = $('#collectIcon');
        var totalPrice = $('#totalPrice');
        var averagePrice = $('#averagePrice');
        var adultPrice = $('#adultPrice');
        var childPrice = $('#childPrice');
        var supplement = $('#supplement');
        var subAdultNum = $("#subAdultNum");
        var subChildNum = $("#subChildNum");
        var selectedDate = $("#selectedDate");
        var adultNumObj, childNumObj;
        var info = new BaseInfo();
        var selectedDeparts = undefined;
        var canBookDemosticOnline = 0;
        var businessType = window.businessType || "";
        if (routePlanDates && departDatesInfo) {
            var calendar = new Calendar($('#calendar'), {
                mode: "display",
                currentDate: routePlanDates[0],
                minDate: routePlanDates[0],
                maxDate: routePlanDates[routePlanDates.length - 1],
                departDatesInfo: departDatesInfo,
                dateFmt: "",
                dispalyMonthes: 1,
                afterPickedDate: function(o) {
                    getSelDate(o);
                }
            });
        } else {}

        function getPeopleNum() {
            return {
                adult: adultNumObj.getNum() || 0,
                child: childNumObj.getNum() || 0
            }
        }

        function calculate() {
            var peopleNum = getPeopleNum();
            if (averagePrice.length) {
                if (peopleNum.child > 0) {
                    $('#diyTip').removeClass('hide');
                } else {
                    $('#diyTip').addClass('hide');
                }
                totalPrice.html((parseInt(peopleNum.adult, 10) + parseInt(peopleNum.child, 10)) * parseInt(averagePrice.html(), 10));
            } else if (businessType == 'domestic') {} else {
                if (peopleNum.adult % 2 == 1) {
                    supplement.removeClass('hide');
                } else {
                    supplement.addClass('hide');
                }
            }
        }

        function slideCalendar(flag) {
            if ($('#showDate').hasClass('no-date')) return;
            var container = $('#orderTime');
            var header = $('#dataHeader');
            container.css('height', $('body').height() + 'px');
            container.toggleClass('hide', !flag);
            header.css('position', 'fixed');
            var isOpera = !! window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            var isChrome = !! window.chrome && !isOpera;
            if (!isChrome && !isOpera) {
                header.css('left', '0');
            }
            window.scrollTo(0, 0);
        }
        info.updateViewCookie(productId);
        info.isCollect(isAjaxUrl, productId, function(data) {
            if (data === 1) {
                collectIconEl.addClass('on').attr('collection', data);
            } else if (data === 2) {
                collectIconEl.removeClass('on').attr('collection', data);
            } else {
                collectIconEl.removeClass('on').removeAttr('collection');
            }
        });
        collectIconEl.on('click', function() {
            if ($(this).attr('collection') == 1) {
                info.collect(rmAjaxUrl, productId, function(data) {
                    if (data) {
                        collectIconEl.removeClass('on').attr('collection', 2);
                        Dialog({
                            type: 'info',
                            message: '已取消收藏！'
                        });
                    } else {
                        Dialog({
                            type: 'info',
                            message: '取消收藏失败！'
                        });
                    }
                });
            } else if ($(this).attr('collection') == 2) {
                info.collect(addAjaxUrl, productId, function(data) {
                    if (data) {
                        collectIconEl.addClass('on').attr('collection', 1);
                        Dialog({
                            type: 'info',
                            message: '已加入收藏！'
                        });
                    } else {
                        Dialog({
                            type: 'info',
                            message: '加入收藏失败！'
                        });
                    }
                });
            } else {
                location.href = $('#loginUrl').val();
            }
        });
        $('.qa-tips').on('click', function() {
            if ($('#qaTipsContent').length) {
                $('#qaTipsContent').remove();
            } else {
                var tips = $('<tr id="qaTipsContent"><td colspan="4"><div class="tooltip"><div class="arrow"></div><div class="content-box"><p class="tips-content"></p></div></div></td></tr>');
                var tipText = $('.qa-tips .tip-text').attr('title');
                $('.tips-content', tips).html(tipText.replace(/\\n/g, '<br>'));
                $('.arrow', tips).css('left', $('.icon-question', this).position().left - 10);
                $(this).after(tips);
            }
        });
        $('.qa-tips-sec').on('click', function() {
            if ($('#qaTipsContentSec', this).length) {
                $('#qaTipsContentSec').remove();
            } else {
                var tips = $('<div id="qaTipsContentSec" class="qa-sec"><div class="tooltip"><div class="arrow"></div><div class="content-box"><p class="tips-content"></p></div></div></div>');
                var tipText = $(this).attr('title');
                $('.tips-content', tips).html(tipText.replace(/\\n/g, '<br>'));
                $('.arrow', tips).css('left', $('.icon-question', this).position().left - 10);
                $(this).append(tips);
            }
        });
        $('#dpf').on('click', function(e) {
            $('#qaTipsContent2').toggle();
        });
        $('#goPickDate').on('click', function() {
            if (!$(this).hasClass('active') || t > new Date().getTime() || hot_down == 2)
                return;
            location.href = $('#dotAjax').val() + '/productId/' + $('#productId').val() + '/productType/' + $('#productType').val();
        });
        $('#showDate').on('click', function() {
            if ($('#goToOrder').length) {
                slideCalendar(true);
            }
        });
        $('#dateBack').on('click', function() {
            slideCalendar();
        });
        $('#goToOrder').on('click', function() {
            var subOrderData = $("#subOrderData");
            if (selectedDate.val() && subAdultNum && subAdultNum.val()) {
                var personNum = getPeopleNum();
                subAdultNum.val(personNum.adult);
                subChildNum.val(personNum.child);
                try {
                    $.ajax({
                        url: $('#dotAjax').val() + '?data={"type": 2, "book_type": 2, "submit_type": 0, "page_type": 0}',
                        dataType: 'json',
                        complete: function(data) {
                            var maxLimit = parseInt($('#maxLimit').val(), 10) ? parseInt($('#maxLimit').val(), 10) : Number.POSITIVE_INFINITY;
                            var minLimit = parseInt($('#minLimit').val(), 10) ? parseInt($('#minLimit').val(), 10) : 0;
                            var orderNum = parseInt(personNum.adult, 10) + parseInt(personNum.child, 10);
                            var flag = (orderNum <= maxLimit) && (orderNum >= minLimit);
                            if (canBookDemosticOnline && flag) {
                                subOrderData.attr('action', subOrderData.attr('data-domestic'));
                            }
                            subOrderData.submit();
                        }
                    });
                } catch (e) {
                    if (canBookDemosticOnline) {
                        subOrderData.attr('action', subOrderData.attr('data-domestic'));
                    }
                    subOrderData.submit();
                }
            } else {
                try {
                    $.ajax({
                        url: $('#dotAjax').val() + '?data={"type": 2, "book_type": 1, "submit_type": 0, "page_type": 0}',
                        dataType: 'json',
                        complete: function(data) {}
                    });
                } catch (e) {}
                slideCalendar(true);
                Dialog({
                    type: 'info',
                    message: '请选择出游日期！'
                });
            }
        });

        function getTelConsult() {
            var getTelConsultAjax = $('#getTelConsultAjax').val();
            var telConsultEl = $('#telConsult');
            if (telConsultEl) {
                $.ajax({
                    url: getTelConsultAjax,
                    dataType: 'json',
                    success: function(JSON) {
                        if (JSON.success === true && JSON.data && telConsultEl) {
                            telConsultEl.attr('href', 'tel:' + (JSON.data.telConsult || ''));
                        }
                    }
                });
                telConsultEl.on('click', function() {
                    try {
                        $.ajax({
                            url: $('#dotAjax').val() + '?data={"type": 1, "book_type": 0, "submit_type": 0, "page_type": 1}',
                            dataType: 'json',
                            complete: function(data) {
                                window.location = telConsultEl.attr('href');
                            }
                        });
                        return false;
                    } catch (e) {
                        window.location = telConsultEl.attr('href');
                    }
                });
            }
        }
        setTimeout(function() {
            getTelConsult();
        }, 10);
        window.getSelDate = function(o) {
            if (typeof businessType !== undefined && businessType == "domestic") {
                $.each(routePlansV2, function(i, n) {
                    if (n.departDate == o.getSelectedDay()) {
                        selectedDeparts = n;
                    }
                });
                var personNum = getPeopleNum();
                selectedDate.val(o.getSelectedDay());
                if (selectedDeparts) {
                    var strategyType = parseInt(selectedDeparts.strategyType, 10);
                    if (strategyType === 0) {} else if (strategyType == 1) {
                        $('#cxCount').text(selectedDeparts.startPrice);
                        $('.tnNum').text(selectedDeparts.tuniuPrice);
                        $('#yhNum').text(selectedDeparts.discount);
                        $('#cuxiao').show();
                        $('#youhui').hide();
                    } else if (strategyType == 2) {
                        $('#yhCount').text(selectedDeparts.startPrice);
                        $('.tnNum').text(selectedDeparts.tuniuPrice);
                        $('#dyqNum').text(selectedDeparts.discount);
                        $('#youhui').show();
                        $('#cuxiao').hide();
                    }
                    $('#adultPrice').text(selectedDeparts.tuniuPrice);
                    $('#childPrice').text(parseInt(selectedDeparts.childPrice, 10) ? selectedDeparts.childPrice : '-');
                    canBookDemosticOnline = selectedDeparts.canBookOnline;
                    $('#dateDetail').removeClass('hide');
                } else {
                    $('#dateDetail').addClass('hide');
                }
            } else {
                var valueArr = [];
                var selectedDateTemp = $("#selectedDate_" + o.getSelectedDay());
                selectedDate.val(o.getSelectedDay());
                var personNum = getPeopleNum();
                if (selectedDateTemp) {
                    if (selectedDateTemp.val()) {
                        if (averagePrice.length) {
                            averagePrice.html(selectedDateTemp.val());
                            totalPrice.html(selectedDateTemp.val() * (parseInt(personNum.adult, 10) + parseInt(personNum.child, 10)));
                        } else {
                            adultPrice.html(selectedDateTemp.val());
                            if (selectedDateTemp.attr('data')) {
                                childPrice.html(selectedDateTemp.attr('data'));
                            }
                            var dfNum = $("#dfNum");
                            dfNum.html(selectedDateTemp.attr('dfdata'));
                        }
                    } else {
                        valueArr.push(0);
                    }
                    $('#dateDetail').removeClass('hide');
                    return valueArr;
                } else {
                    $('#dateDetail').addClass('hide');
                }
            }
        };
        window.addDateSelColor = function() {};
        adultNumObj = new Spinner($('#adultNumObj'), {
            minNum: 1,
            minusCallback: function() {
                calculate();
            },
            plusCallback: function() {
                calculate();
            }
        });
        adultNumObj.init();
        childNumObj = new Spinner($('#childNumObj'), {
            minNum: 0,
            defaultNum: '0',
            minusCallback: function() {
                calculate();
            },
            plusCallback: function() {
                calculate();
            }
        });
        childNumObj.init();
    });
});
