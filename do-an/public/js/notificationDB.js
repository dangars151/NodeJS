var notificationsAjax = document.getElementById('notificationsAjax');
var notificationCount = document.getElementById('notification_count');
var notificationsBody = document.getElementById('notificationsBody');
$(document).ready(function(){
    $.ajax({
        url: '/get-notifications-company',
        type: 'get',
        data: {companyId: notificationsAjax.getAttribute('value')}
    }).then(function(data) {
        var notifyIsNotRead = 0;
        for (let i = 0; i < data.length; i++) {
            var node = document.createElement("div");
            var textnode = document.createTextNode(data[i].title);
            if (data[i].is_read == 0) {
                notifyIsNotRead++;
                var tagB = document.createElement("b");
                tagB.appendChild(textnode);
                node.appendChild(tagB);
            } else {
                node.appendChild(textnode);
            }
            notificationsBody.appendChild(node);
        }
        if (notifyIsNotRead > 0) {
            notificationCount.innerHTML = notifyIsNotRead;
            notificationCount.style.display = 'inline';
        }
    })
});