var companyId = document.getElementById('realtime').getAttribute('value');

Pusher.logToConsole = true;
var pusher = new Pusher('9a681ec33ff0af53eae3', {
    cluster: 'ap1',
    forceTLS: true
});
var channel = pusher.subscribe('NotifyCompany'+companyId);
channel.bind('my-event', function(data) {
    var count = parseInt(document.getElementById('notification_count').innerHTML) + 1;
    if (count == 1) {
        document.getElementById('notification_count').style.display = 'inline';
    }
    document.getElementById('notification_count').innerHTML = count;

    var node = document.createElement("div");
    var tagB = document.createElement("b");           
    var textnode = document.createTextNode(data.notification);         
    tagB.appendChild(textnode);
    node.appendChild(tagB);              
    document.getElementById("notificationsBody").appendChild(node);
});