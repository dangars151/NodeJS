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
            var tagA = document.createElement("a");
            tagA.style.color = 'black';
            if (data[i].type == 4) tagA.setAttribute('href', '/events/' + data[i].event_id);
            if (data[i].type == 5) tagA.setAttribute('href', '/job-detail/' + data[i].job_id);
            if (data[i].is_read == 0) {
                notifyIsNotRead++;
                var tagB = document.createElement("b");
                tagB.appendChild(textnode);
                tagA.appendChild(tagB);
                node.appendChild(tagA);
            } else {
                tagA.appendChild(textnode);
                node.appendChild(tagA);
            }
            notificationsBody.appendChild(node);
        }
        if (notifyIsNotRead > 0) {
            notificationCount.innerHTML = notifyIsNotRead;
            notificationCount.style.display = 'inline';
        }
    })
});