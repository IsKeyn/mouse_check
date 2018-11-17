$(document)
	.on('mousedown', '.click_box', function(element) { click_log(element); })
	.on('change', 'input[name=time]', function(element) { check_ms(this); })

function check_ms(element) {
	if ($(element).val() > 999) 
	{
		alert('Значение миллисекунд не может быть больше 999');
		$(element).val(999);
	}
}

function click_log(element) {

	// KeynTR: Получаем указанное время двойного клика
	double_click_button = $('input[name=time]').val();

	// KeynTR: Получаем время текущего клика
	date = new Date();
	ahtung = '';

	hour = date.getHours();
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	millisecond = date.getMilliseconds();

	switch (element.button) {
		case 0:
			button_name = 'левой кнопкой мыши';
			button_data = 0;
			break;

		case 1:
			button_name = 'центральной кнопкой мыши';
			button_data = 1;
			break;

		case 2:
			button_name = 'правой кнопкой мыши';
			button_data = 2;
			break;
	}

	if ($('.log_box span.log_line').length > 0 
		&& $('.log_box span.log_line').data('button') == element.button)
	{	
		last_hour = Number($('.log_box span.hour:eq(0)').text());
		last_minutes = Number($('.log_box span.minutes:eq(0)').text());
		last_seconds = Number($('.log_box span.seconds:eq(0)').text());
		last_millisecond = Number($('.log_box span.milliseconds:eq(0)').text());

		if (last_hour == hour 
			&& last_minutes == minutes 
				&& last_seconds == seconds
					&& double_click_button >= (millisecond - last_millisecond))
		{
	  		$('.log_box span.log_line:eq(0)').css('background', '#ff0000');
	  		ahtung = 'ahtung';
		}

		one_more_second = seconds;

		if (last_hour == hour 
			&& last_minutes == minutes 
				&& last_seconds == one_more_second++
					&& double_click_button >= (1000 - last_millisecond + millisecond))
		{
	  		$('.log_box span.log_line:eq(0)').css('background', '#ff0000');
	  		ahtung = 'ahtung';
		}

		if (ahtung == 'ahtung')
		{
			$('.warning_box').prepend('<span class="log_line">Двойной клик ' + button_name + ' (' + last_hour + '.' +  last_minutes + '.' + last_seconds + ':' + last_millisecond + ' - ' + hour + '.' +  minutes + '.' + seconds + ':' + millisecond + ')');
		}
	}

	$('.log_box').prepend('<span class="log_line ' + ahtung + '" data-button="' + button_data + '"><span class="hour">' + hour + '</span>.<span class="minutes">' +  minutes + '</span>.<span class="seconds">' + seconds + '</span>:<span class="milliseconds">' + millisecond + '</span> Клик ' + button_name + '</span>');

}