var notificationLink = document.getElementById('notificationLink');
notificationLink.onclick = function() {
    $.ajax({
        url: '/handle-notification',
        type: 'post',
        data: {companyId: notificationLink.getAttribute('value')}
    }).then(function(data) {
        document.getElementById('notification_count').innerHTML = 0;
        document.getElementById('notification_count').style.display = 'none';
    })
}