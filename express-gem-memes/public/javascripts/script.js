$(document).ready(function(){
	var idNumber = $('img:last')[0].id;
	$.ajax({
		url: 'comments'
	}).done(function(prevComments){
		console.log(prevComments);
		prevComments.forEach(function(elem){
			console.log(elem.imageId)
			var a = elem.imageId;
			var b = elem.message;
			var $message = $('<p>');
			$message.append(b);
			$('#'+a).parent().append($message);
		});
	});
	$('.newGif').on('submit',function(event){
		event.preventDefault();
		idNumber = $('img:last')[0].id;
		idNumber++

		var newGif = $(this).serializeArray();
		imageId = idNumber;
		newGif[1] = {};
		newGif[1].name = 'imageId';
		newGif[1].value = imageId.toString();
		console.log(newGif);
		$.ajax({
			url: 'memes',
			type: 'post',
			data: newGif
		}).done(function(dis){});
		var $newDiv = $('<div>');
		var $newImg = $('<img>');
		var $commentForm = $('<form>');
		var $commentBox = $('<input>');
		var $commentPost = $('<input>');

		$newImg.attr('src', newGif[0].value).attr('id', idNumber );
		$commentBox.attr('type','text').attr('placeholder','Write a Comment');
		$commentPost.attr('type','submit').attr('value','Post Comment');
		$commentForm.append($commentBox).append($commentPost);
		$commentForm.addClass('comment');
		$newDiv.append($newImg).append($commentForm);

		$newDiv.addClass('perGif')
		
		$('#memes').append($newDiv);
	})

	$('.comment').on('submit',function(event){
		event.preventDefault();
		var newComment = $(this).serializeArray();
		newComment[1] = {};
		newComment[1].name = 'imageId';
		newComment[1].value = $(this).parent().find('img')[0].id;
		console.log(newComment);
		$.ajax({
			url: 'comments',
			type: 'post',
			data: newComment
		}).done(function(dis){});
		var $newComment = $('<p>');
		$newComment.html(newComment[0].value);
		$(this).parent().append($newComment);
	})
})
