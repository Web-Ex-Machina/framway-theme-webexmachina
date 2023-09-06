require('jssocials');
require('jssocials/dist/jssocials.css');
require('jssocials/dist/jssocials-theme-flat.css');

$(function(){
	$('.mozaic__grid--2,.mod_newslist--home,.portfolio--home').each(function(){
		var $mozaic = $(this);
		$(window).resize(function(){orderMozaic($mozaic);});
		orderMozaic($mozaic);
		$mozaic.find('.mozaic__item--2').each(function(k,item){
			setTimeout(function(){
				$(item).addClass('active');
			},150*(k+1));
		})
	});

	$('body').on('click','.mod_wem_portfolio_list .filters .filter',function(){
	    // this.parentElement.scrollIntoView({behavior: "smooth",block:"start",inline:"nearest"}); 
		// $(window).resize();
	});

	$('body').on('click', 'a[portfolio-url]', function(e) {
		e.preventDefault();
		window.location.href=this.getAttribute('portfolio-url');
	});


	$(".jssocials").jsSocials({
		shares: [
			{share: "email", },
			{share: "twitter", logo: 'fab fa-twitter'},
			{share: "facebook", logo: 'fab fa-facebook'},
			// {share: "googleplus", logo: 'fab fa-google-plus-g'},
			{share: "linkedin", logo: 'fab fa-linkedin'},
			// {share: "pinterest", logo: 'fab fa-pinterest'},
			{share: "whatsapp", logo: 'fab fa-whatsapp'},
		],
		showLabel : false,
        showCount: false,
	});

	$('.mod_newsreader .layout_full table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');
	$('.mod_newsreader .layout_full .ce_image a').on('click',function(e){
		e.preventDefault();
		var modalName = 'modal_'+utils.normalize($(this).attr('title')?$(this).attr('title'):utils.uniqid());
		if(!$('.modalFW[data-name="'+modalName+'"]').length){
			new app.ModalFW({
	    	  name : modalName,
	    	  url: $(this).attr('href'),
	    	  blnOpen: true,
	    	});
		} else
			$('.modalFW[data-name="'+modalName+'"]').modalFW('get').open();
	});
	
	$('.home .heroFW .cta--container .btn').attr('data-goto',$('.home .heroFW .cta--container').closest('.mod_article').next('.mod_article').attr('id')).goto();

	$('.heroFW--punchline').each(function(){
		var $items = $(this).children('div');
		var $itemsAnimated = $items.children('div.play');
		var delayActive = 1000;
      	var delayAnim = 1000; // delay between each animation
		$items.each(function(k,item){
			setTimeout(function(){
				$(item).addClass('active');
			},delayActive*(k+1));
		});

		var cpt = 0; // used to know which element is in queue for next animation

		/**
		* manage which element is next to appears
		* @param  {[type]} item [description]
		* @return {[type]}      [description]
		*/
		function nextItem(item) {
			var $current = $(item).find('p.is-visible').length ? $(item).find('p.is-visible') : $(item).find('p').first();
			var $next = $current.next('p').length ? $current.next('p') : $(item).find('p').first();
			$current.removeClass('is-visible').addClass('is-hidden');
			$next.removeClass('is-hidden').addClass('is-visible');
			cpt++;
			if (cpt >= $items.length) cpt = 0;
			setTimeout(function () {
				nextItem($items.get(cpt));
			}, delayAnim);
		}

		setTimeout(function () {
			nextItem($itemsAnimated.get(cpt));
		}, delayActive*$items.length);
	});

	$(window).resize(function(){
		$('.typeform-widget').css('height',utils.getViewportHeight() - ($('#footer').outerHeight() || 0)  - ($('.title--contact').outerHeight() || 0));
	});


	// GOOGLE TRACKING
	$('.headerFW a').not('#logo').on('click',function(){
		gtag('event', 'click', {
	       'event_category': 'MENU',
	       'event_label': $(this).text(),
      	});
	});
	$('.cta--container .btn').on('click',function(){
		gtag('event', 'click', {
	       'event_category': 'CTA',
	       'event_label': $(this).text(),
      	});
	});

	var timerHoverNews;
	$('.mod_newslist .layout_latest').on('mouseenter',function(){
		timerHoverNews = setTimeout(function(){
			gtag('event', 'hover', {
		       'event_category': 'NEWS',
		       'event_label': $(this).find('a').attr('title'),
    	  	});
		},1000);
	}).on('mouseleave',function(){
		clearTimeout(timerHoverNews);
	}).on('click',function(){
		gtag('event', 'click', {
	       'event_category': 'NEWS',
	       'event_label': $(this).find('a').attr('title'),
	  	});
	});

	$('.mod_newslist .mozaic__more').on('click',function(){
		gtag('event', 'click', {
	       'event_category': 'NEWS',
	       'event_label': 'see more',
	  	});
	});
	$('.mod_newslist').prev('.filters').find('a').on('click',function(e){
		// e.preventDefault();
		gtag('event', 'click filter', {
	       'event_category': 'NEWS',
	       'event_label': $(this).attr('title'),
	  	});
	});
});

var orderMozaic = function($mozaic){
	var $items = $items = $mozaic.find('.mozaic__item--2').not('.hidden');
	$items.removeClass('cols-span-2 r_2-1').addClass('r_1-1');
	if(viewport.width > parseInt(app.styles.breakpoints.md.replace('px',''))){ // 4 cols
		var cpt = 0;
		for (var i = 0; i < $items.length; i++) {
			if((cpt+1)%4==1)
				$($items[i]).addClass('cols-span-2 r_2-1').removeClass('r_1-1');
			if (cpt==8) cpt=0; else cpt++;
		}
	} else if(viewport.width > parseInt(app.styles.breakpoints.sm.replace('px',''))){ // 3 cols
		var cpt = 0;
		for (var i = 0; i < $items.length; i++) {
			if((cpt+1)%3==1)
				$($items[i]).addClass('cols-span-2 r_2-1').removeClass('r_1-1');
			if (cpt==3) cpt=0; else cpt++;
		}
	} else if(viewport.width > parseInt(app.styles.breakpoints.xs.replace('px',''))){ // 2 cols
		var cpt = 0;
		for (var i = 0; i < $items.length; i++) {
			if((cpt+1)%3==1)
				$($items[i]).addClass('cols-span-2 r_2-1').removeClass('r_1-1');
			if (cpt==2) cpt=0; else cpt++;
		}
	} else { // 1 cols
		$items.addClass('cols-span-2 r_2-1').removeClass('r_1-1');
	}
}