// Event handlers
$(document).ready(function(){
    app_onestic.showFilterMobile();
    app_onestic.hideFilterMobile();
    app_onestic.clickOnFilter();
    app_onestic.resetFilter();
    app_onestic.menuPush();
});

var app_onestic = (function($,window,document){

    var colors_select = [];
    var sizes_select = [];

    //Show filter in mobile
    function showFilterMobile() {
        $( ".button_show_filters" ).click(function() {
            $( ".button_show_filters" ).fadeOut(500,function() {
                $( ".button_hide_filters" ).fadeIn(500,function(){
                    $( ".filters" ).fadeIn(500);
                });
            });
        });
    }

    //Hide filter in mobile
    function hideFilterMobile(){
        $( ".button_hide_filters" ).click(function() {
            $( ".button_hide_filters" ).fadeOut(500,function() {
                $( ".filters" ).fadeOut(500,function(){
                    $( ".button_show_filters" ).fadeIn(500);
                });
            });
        });
    }

    // Select filter
    function clickOnFilter(){
        $( ".box_filter" ).click(function() {
            $( ".reset" ).fadeIn(500);
            $( ".filters .container" ).css('height','110px');
            if($( this ).hasClass( "fc" )!=false){
                var color = $(this).attr('class').split('filtercolor_')[1];
                $(this).css('border','1px solid orange');
                colors_select.push(".color_"+color);
            }
            if($( this ).hasClass( "fs" )!=false){
                var size = $(this).attr('class').split('filtersize_')[1];
                $(this).css('border','1px solid orange');
                sizes_select.push(".size_"+size);
            }
            $( ".products .list .box").fadeOut(100,function(){
                fLen = colors_select.length;
                fLenS = sizes_select.length;
                if(fLen>0 && fLenS>0 ){ // Select color and sizes
                    for (i = 0; i < fLen; i++) {
                        for (j = 0; j < fLenS; j++) {
                            $(".box"+colors_select[i]+sizes_select[j] ).fadeIn(100);
                        }
                    }    
                }else if(fLen>0){ // Only select colors
                    for (i = 0; i < fLen; i++) {
                        $( colors_select[i] ).fadeIn(100);
                    }    
                }else if(fLenS>0){ // Only select sizes
                    for (i = 0; i < fLenS; i++) {
                        $( sizes_select[i] ).fadeIn(100);
                    }    
                }
            });
        });
    }

    //Reset filter
    function resetFilter(){
        $( ".reset" ).click(function() {
            colors_select = [];
            sizes_select = [];
            $( ".box_filter" ).css('border','1px solid #000');
            $( ".products .list .box").fadeIn(100);
            $( ".reset" ).fadeOut(500);
            $( ".filters .container" ).css('height','100%');
        });
    }
    
    //Menu 
    function menuPush(){
        $menuLeft = $('.pushmenu-left');
        $nav_list = $('#nav_list');       
        $nav_list.click(function() {
            $(this).toggleClass('active');
            $('.pushmenu-push').toggleClass('pushmenu-push-toright');
            $menuLeft.toggleClass('pushmenu-open');
        });   
    }

    return {
        showFilterMobile: showFilterMobile,
        hideFilterMobile: hideFilterMobile,
        clickOnFilter: clickOnFilter,
        resetFilter: resetFilter,
        menuPush: menuPush,
    };
}($,window,document));